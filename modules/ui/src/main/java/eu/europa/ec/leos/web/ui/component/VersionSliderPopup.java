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
package eu.europa.ec.leos.web.ui.component;

import com.vaadin.ui.HorizontalLayout;
import eu.europa.ec.leos.ui.component.RangeSliderStepVO;

import java.util.List;
import java.util.Set;

public interface VersionSliderPopup<T> {

    Set<String> getVersionLabels(List<T> displayedVersions);
    
    void updateMinimizedRepresentation();
    
    HorizontalLayout populateItemDetails(HorizontalLayout horizontalLayout, T documentVersion);
    
    void selectionChanged();
    
    Set<RangeSliderStepVO> getVersionSteps(Set<String> displayedVersions);
    
    boolean isDisableInitialVersion();
    
    String getPopupCaption();
}
