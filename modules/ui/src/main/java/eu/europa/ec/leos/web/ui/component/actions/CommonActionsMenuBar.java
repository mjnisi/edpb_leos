/*
 * Copyright 2021 European Commission
 *
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *     https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */
package eu.europa.ec.leos.web.ui.component.actions;

import com.vaadin.server.StreamResource;
import eu.europa.ec.leos.ui.event.DownloadActualVersionRequestEvent;
import eu.europa.ec.leos.ui.event.ExportToDocuWriteCleanVersion;
import eu.europa.ec.leos.web.event.view.document.ShowIntermediateVersionWindowEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import com.vaadin.ui.MenuBar;

import eu.europa.ec.leos.i18n.MessageHelper;
import eu.europa.ec.leos.ui.component.AccordionPane;
import eu.europa.ec.leos.web.event.component.LayoutChangeRequestEvent;
import eu.europa.ec.leos.web.event.view.PaneAddEvent;
import eu.europa.ec.leos.web.event.view.PaneEnableEvent;
import eu.europa.ec.leos.web.event.view.document.ShowImportWindowEvent;
import eu.europa.ec.leos.web.event.view.document.UserGuidanceRequest;
import eu.europa.ec.leos.web.event.window.ShowTimeLineWindowEvent;
import eu.europa.ec.leos.web.ui.screen.document.ColumnPosition;
import eu.europa.ec.leos.web.ui.themes.LeosTheme;
import org.vaadin.simplefiledownloader.SimpleFileDownloader;

public abstract class CommonActionsMenuBar extends ActionsMenuBarComponent{

    private static final long serialVersionUID = 1L;
    private static final Logger LOG = LoggerFactory.getLogger(CommonActionsMenuBar.class);

    private MenuItem saveVersionItem;
    private MenuItem downloadVersionItem;
    private MenuItem downloadVersionWithAnnotationsItem;
    private MenuItem downloadCleanVersionItem;
    protected MenuItem tocOffItem;
    private SimpleFileDownloader fileDownloader;
    private Class childClass;

    public CommonActionsMenuBar(MessageHelper messageHelper, EventBus eventBus) {
        super(messageHelper, eventBus, LeosTheme.LEOS_HAMBURGUER_16);
        initDownloader();
    }
    
    private void initDownloader() {
        fileDownloader = new SimpleFileDownloader();
        addExtension(fileDownloader);
    }
    
    public void setDownloadStreamResource(StreamResource downloadResource) {
        fileDownloader.setFileDownloadResource(downloadResource);
        fileDownloader.download();
    }
    
    public void setDownloadVersionVisible(boolean visible) {
        downloadVersionItem.setVisible(visible);
    }


    public void setDownloadVersionWithAnnotationsVisible(boolean visible) {
        downloadVersionWithAnnotationsItem.setVisible(visible);
    }

    protected void buildVersionActions() {
        LOG.debug("Building Versions actions group...");
        addCustomSeparator(messageHelper.getMessage("menu.actions.separator.versions"));

        //Major version
        saveVersionItem = createMenuItem(messageHelper.getMessage("menu.actions.intermediate.version"),
                new SaveVersionCommand());
        downloadVersionItem = createMenuItem(messageHelper.getMessage("menu.actions.download.version"),
                selectedItem -> downloadActualVersion());
        downloadVersionWithAnnotationsItem = createMenuItem(messageHelper.getMessage("menu.actions.download.version.with.annotations"),
                selectedItem -> downloadActualVersionWithAnnotations());
        downloadCleanVersionItem = createMenuItem(messageHelper.getMessage("menu.actions.download.version.clean"),
                selectedItem -> downloadCleanVersion());
    }
    
    private void downloadActualVersion() {
        eventBus.post(new DownloadActualVersionRequestEvent());
    }

    private void downloadActualVersionWithAnnotations() {
        eventBus.post(new DownloadActualVersionRequestEvent(true));
    }

    private void downloadCleanVersion() {
        eventBus.post(new ExportToDocuWriteCleanVersion());
    }

    protected void buildViewActions() {
        LOG.debug("Building View actions group...");
        addCustomSeparator(messageHelper.getMessage("menu.actions.separator.view"));

        //User Guidance
        createCheckMenuItem(messageHelper.getMessage("menu.actions.see.guidance"),
                new UserGuidanceCommand());
    }
    
    @Subscribe
    public void addItemsToViewActionsMenu(PaneAddEvent event) {
        if (event.getPaneClass() == AccordionPane.class) {
            tocOffItem = createCheckMenuItem(messageHelper.getMessage("menu.actions.see.toc"),
                    new MenuItemCommand(ColumnPosition.OFF, event));
        }
    }
    
    @Subscribe
    void changePaneStatus(PaneEnableEvent event) {
        LOG.debug("Changing pane status in Actions Menu Bar ({})...", event.getPaneClass().getTypeName());
        if (event.getPaneClass() == AccordionPane.class) {
            tocOffItem.setChecked(event.isEnabled());
        }
    }

    public void setSaveVersionVisible(boolean visible) {
        saveVersionItem.setVisible(visible);
    }
    
    public void setSaveVersionEnabled(boolean enable) {
        saveVersionItem.setEnabled(enable);
    }

    public void setDownloadCleanVersionVisible(boolean visible) {
        downloadCleanVersionItem.setVisible(visible);
    }

    public void setChildComponentClass(Class clazz) {
        this.childClass = clazz;
    }
    
    public Class getChildComponentClass() {
        return childClass;
    }
    
    protected class TimeLineCommand implements Command {
        private static final long serialVersionUID = 1L;

        @Override
        public void menuSelected(MenuItem selectedItem) {
            LOG.debug("Time line Button clicked...");
            eventBus.post(new ShowTimeLineWindowEvent());
        }
    }

    protected class SaveVersionCommand implements Command {
        private static final long serialVersionUID = 1L;

        @Override
        public void menuSelected(MenuItem selectedItem) {
            LOG.debug("Intermediate version menu item clicked...");
            eventBus.post(new ShowIntermediateVersionWindowEvent());
        }
    }

    protected class ImporterCommand implements Command {
        private static final long serialVersionUID = 1L;

        @Override
        public void menuSelected(MenuItem selectedItem) {
            LOG.debug("Importer menu item clicked...");
            eventBus.post(new ShowImportWindowEvent());
        }
    }

    protected class UserGuidanceCommand implements Command {
        private static final long serialVersionUID = 1L;

        @Override
        public void menuSelected(MenuItem selectedItem) {
            LOG.debug("User Guidance menu item clicked...");
            eventBus.post(new UserGuidanceRequest(selectedItem.isChecked()));
        }
    }

    // Create Layout for selected menu command on panel add event
    class MenuItemCommand implements MenuBar.Command {
        private static final long serialVersionUID = -4455740778411909392L;

        private ColumnPosition position;
        private PaneAddEvent paneAddEvent;

        public MenuItemCommand(ColumnPosition position, PaneAddEvent paneAddEvent) {
            this.position = position;
            this.paneAddEvent = paneAddEvent;
        }

        @Override
        public void menuSelected(MenuBar.MenuItem menuItem) {
            LOG.debug("Layout menu item clicked ({}:{})...", position, menuItem.isChecked());
            if (menuItem.isEnabled() && menuItem.isCheckable()) {
                position = menuItem.isChecked() ? ColumnPosition.DEFAULT : ColumnPosition.OFF;
                LOG.debug("Changing layout settings (MenuItem={})...", position);
                eventBus.post(new LayoutChangeRequestEvent(position, paneAddEvent.getPaneClass()));
            }
        }
    }

}
