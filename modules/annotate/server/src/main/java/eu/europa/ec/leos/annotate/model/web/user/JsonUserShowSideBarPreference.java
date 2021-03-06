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
package eu.europa.ec.leos.annotate.model.web.user;

import eu.europa.ec.leos.annotate.Generated;

import java.util.Objects;

/**
 * Class representing the user preferences that can be updated/retrieved
 * Note: this is not documented, it was only discovered by capturing network traffic; 
 *       therefore there might be more preferences that be changed...  
 */
public class JsonUserShowSideBarPreference {

    // simple property that states whether the sidebar tutorial is still to be shown
    private boolean show_sidebar_tutorial;

    // -----------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------
    public JsonUserShowSideBarPreference() {
        // default constructor required by JSON deserialisation
    }

    public JsonUserShowSideBarPreference(final boolean show) {
        this.show_sidebar_tutorial = show;
    }

    // -----------------------------------------------------------
    // Getters & setters
    // -----------------------------------------------------------

    @Generated
    public boolean isShow_sidebar_tutorial() {
        return show_sidebar_tutorial;
    }

    @Generated
    public void setShow_sidebar_tutorial(final boolean show_sidebar_tutorial) {
        this.show_sidebar_tutorial = show_sidebar_tutorial;
    }

    // -------------------------------------
    // equals and hashCode
    // -------------------------------------

    @Generated
    @Override
    public int hashCode() {
        return Objects.hash(show_sidebar_tutorial);
    }

    @Generated
    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final JsonUserShowSideBarPreference other = (JsonUserShowSideBarPreference) obj;
        return Objects.equals(this.show_sidebar_tutorial, other.show_sidebar_tutorial);
    }
}
