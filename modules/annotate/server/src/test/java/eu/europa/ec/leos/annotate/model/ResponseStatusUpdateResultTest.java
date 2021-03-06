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
package eu.europa.ec.leos.annotate.model;

import org.junit.Assert;
import org.junit.Test;

/**
 * simple tests for methods of the ResponseStatusUpdateResultTest class
 */
public class ResponseStatusUpdateResultTest {

    // check that fields are initialised (preventing NullPointerExceptions)
    @Test
    public void testFieldsNotNullDefaultConstrtuctor() {

        final ResponseStatusUpdateResult rsue = new ResponseStatusUpdateResult();
        Assert.assertNotNull(rsue.getUpdatedAnnotIds());
        Assert.assertNotNull(rsue.getDeletedAnnotIds());
    }

    // check that fields are initialised (preventing NullPointerExceptions)
    @Test
    public void testFieldsNotNullOtherConstrtuctor() {

        final ResponseStatusUpdateResult rsue = new ResponseStatusUpdateResult(null, null);
        Assert.assertNotNull(rsue.getUpdatedAnnotIds());
        Assert.assertNotNull(rsue.getDeletedAnnotIds());
    }
}
