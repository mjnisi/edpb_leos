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
package eu.europa.ec.leos.services.numbering.config;

public class NumberingConfigProcessorSymbol extends NumberingConfigProcessorAbstract implements NumberingConfigProcessor {

    public NumberingConfigProcessorSymbol(String symbol, String prefix, String suffix) {
        this.numberToShow = symbol;
        this.prefix = prefix;
        this.suffix = suffix;
    }

    public NumberingConfigProcessorSymbol() {
        this("-", "", "");
    }

    @Override
    public String getActualNumberToShow() {
        return numberToShow;
    }

    @Override
    protected String getImplName() {
        return this.getClass().getSimpleName();
    }
}
