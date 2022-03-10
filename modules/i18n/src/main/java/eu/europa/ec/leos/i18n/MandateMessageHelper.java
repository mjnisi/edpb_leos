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
package eu.europa.ec.leos.i18n;

import eu.europa.ec.leos.domain.common.InstanceType;
import eu.europa.ec.leos.instance.Instance;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Scope("singleton")
@Component
@Instance(InstanceType.COUNCIL)
public class MandateMessageHelper extends MessageHelper{

    private static final String MANDATE_PREFIX = "mandate.";
    
    /**
     * ATTENTION: Explicit constructor used only for tests.
     */
    public MandateMessageHelper(MessageSource messageSource){
        super.messageSource = messageSource;
    }
    
    @Override
    public String getPrefix(){
        return MANDATE_PREFIX;
    }

}