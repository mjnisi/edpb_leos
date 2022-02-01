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
package eu.europa.ec.leos.ui.view.annex;

import java.util.List;

import javax.inject.Provider;

import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import com.vaadin.server.StreamResource;
import com.vaadin.spring.annotation.SpringComponent;
import com.vaadin.spring.annotation.ViewScope;

import eu.europa.ec.leos.domain.cmis.LeosCategory;
import eu.europa.ec.leos.domain.cmis.document.Annex;
import eu.europa.ec.leos.domain.common.InstanceType;
import eu.europa.ec.leos.domain.vo.CloneProposalMetadataVO;
import eu.europa.ec.leos.domain.vo.DocumentVO;
import eu.europa.ec.leos.i18n.MessageHelper;
import eu.europa.ec.leos.instance.Instance;
import eu.europa.ec.leos.model.annex.AnnexStructureType;
import eu.europa.ec.leos.security.LeosPermission;
import eu.europa.ec.leos.security.SecurityContext;
import eu.europa.ec.leos.services.export.ExportDW;
import eu.europa.ec.leos.services.export.ExportOptions;
import eu.europa.ec.leos.services.export.ExportVersions;
import eu.europa.ec.leos.services.store.PackageService;
import eu.europa.ec.leos.services.toc.StructureContext;
import eu.europa.ec.leos.ui.component.ComparisonComponent;
import eu.europa.ec.leos.ui.component.doubleCompare.DoubleComparisonComponent;
import eu.europa.ec.leos.ui.component.toc.TableOfContentItemConverter;
import eu.europa.ec.leos.ui.component.versions.VersionsTab;
import eu.europa.ec.leos.ui.event.view.AddStructureChangeMenuEvent;
import eu.europa.ec.leos.ui.extension.SoftActionsExtension;
import eu.europa.ec.leos.ui.window.toc.TocEditor;
import eu.europa.ec.leos.vo.toc.TableOfContentItemVO;
import eu.europa.ec.leos.web.event.component.LayoutChangeRequestEvent;
import eu.europa.ec.leos.web.event.view.document.InstanceTypeResolver;
import eu.europa.ec.leos.web.support.cfg.ConfigurationHelper;
import eu.europa.ec.leos.web.support.user.UserHelper;
import eu.europa.ec.leos.web.support.xml.DownloadStreamResource;
import eu.europa.ec.leos.web.ui.screen.document.ColumnPosition;

@SpringComponent
@ViewScope
@Instance(InstanceType.COUNCIL)
public class MandateAnnexScreenImpl extends AnnexScreenImpl {
    private static final long serialVersionUID = 934198605326069948L;

    private final DoubleComparisonComponent<Annex> doubleComparisonComponent;
    
    MandateAnnexScreenImpl(MessageHelper messageHelper, EventBus eventBus, SecurityContext securityContext, UserHelper userHelper,
                           ConfigurationHelper cfgHelper, TocEditor numberEditor, InstanceTypeResolver instanceTypeResolver,
                           VersionsTab<Annex> versionsTab, Provider<StructureContext> structureContextProvider,
                           PackageService packageService) {
        super(messageHelper, eventBus, securityContext, userHelper, cfgHelper, numberEditor, instanceTypeResolver, versionsTab, structureContextProvider, packageService);
        ExportOptions exportOptions = new ExportDW(ExportOptions.Output.WORD, Annex.class, false);
        doubleComparisonComponent = new DoubleComparisonComponent<>(exportOptions, eventBus, messageHelper, securityContext);
    }

    @Override
    public void init() {
        super.init();
        actionsMenuBar.setChildComponentClass(DoubleComparisonComponent.class);
        screenLayoutHelper.addPane(comparisonComponent, 2, false);
        screenLayoutHelper.layoutComponents();
        new SoftActionsExtension<>(annexContent);
    }

    @Subscribe
    void changePosition(LayoutChangeRequestEvent event) {
        changeLayout(event, doubleComparisonComponent);
    }

    @Override
    public void populateComparisonContent(String comparedContent, String comparedInfo, Annex original, Annex current) {
        ExportVersions<Annex> exportVersions = new ExportVersions<>(original, current);
        doubleComparisonComponent.populateMarkedContent(comparedContent, LeosCategory.ANNEX, comparedInfo, exportVersions);
        doubleComparisonComponent.setSimpleComparison();
    }
    
    @Override
    public void populateDoubleComparisonContent(String comparedContent, String comparedInfo, Annex original, Annex intermediate, Annex current) {
        ExportVersions<Annex> exportVersions = new ExportVersions<>(original, intermediate, current);
        doubleComparisonComponent.populateDoubleComparisonContent(comparedContent, LeosCategory.ANNEX, comparedInfo, exportVersions);
        doubleComparisonComponent.setDoubleComparison();
    }
    
    @Override
    public void showVersion(String content, String versionInfo) {
        changePosition(new LayoutChangeRequestEvent(ColumnPosition.DEFAULT, ComparisonComponent.class));
        doubleComparisonComponent.populateDoubleComparisonContent(content.replaceAll("(?i) id=\"", " id=\"doubleCompare-"), LeosCategory.ANNEX, versionInfo, null);
        doubleComparisonComponent.removeComparison();
    }
    
    @Override
    public void cleanComparedContent() {
        final String versionInfo = messageHelper.getMessage("document.compare.version.caption.double");
        doubleComparisonComponent.populateDoubleComparisonContent("", LeosCategory.ANNEX, versionInfo, null);
        doubleComparisonComponent.removeComparison();
    }

    @Override
    public void setDownloadStreamResourceForExport(StreamResource streamResource) {
        doubleComparisonComponent.setDownloadStreamResourceForExport(streamResource);
    }
    
    @Override
    public void setDownloadStreamResourceForMenu(DownloadStreamResource streamResource){
        actionsMenuBar.setDownloadStreamResource(streamResource);
    }
    
    @Override
    public void setDownloadStreamResourceForXmlFiles(StreamResource streamResource) {
        doubleComparisonComponent.setDownloadStreamResourceForXmlFiles(streamResource);
    }
    
    @Override
    public void enableTocEdition(List<TableOfContentItemVO> tableOfContent) {
        tableOfContentComponent.handleEditTocRequest(tocEditor);
        tableOfContentComponent.setTableOfContent(TableOfContentItemConverter.buildTocData(tableOfContent));
    }
    
    @Override
    public void setStructureChangeMenuItem() {
        AnnexStructureType structureType = getStructureType();
        eventBus.post(new AddStructureChangeMenuEvent(structureType));
    }

    @Override
    public boolean isComparisonComponentVisible() {
        return comparisonComponent != null && comparisonComponent.getParent() != null;
    }

    @Override
    public void setPermissions(DocumentVO annex, boolean isClonedProposal) {
        super.setPermissions(annex, isClonedProposal);
        boolean enableExportPackage = securityContext.hasPermission(annex, LeosPermission.CAN_WORK_WITH_EXPORT_PACKAGE);
        actionsMenuBar.setExportPackageVisible(enableExportPackage);
        doubleComparisonComponent.enableExportPackage(enableExportPackage);
        actionsMenuBar.setDownloadVersionVisible(true);
        actionsMenuBar.setDownloadVersionWithAnnotationsVisible(true);
    }

    @Override
    public void populateCloneProposalMetadataVO(CloneProposalMetadataVO cloneProposalMetadataVO) {
    }
}
