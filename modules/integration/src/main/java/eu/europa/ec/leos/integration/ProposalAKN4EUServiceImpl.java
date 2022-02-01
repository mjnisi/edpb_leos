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
package eu.europa.ec.leos.integration;

import eu.europa.ec.leos.domain.common.InstanceType;
import eu.europa.ec.leos.instance.Instance;
import eu.europa.ec.leos.model.user.User;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@Instance(InstanceType.COMMISSION)
public class ProposalAKN4EUServiceImpl implements AKN4EUService {

    private static final Logger LOG = LoggerFactory.getLogger(ProposalLegisWriteServiceImpl.class);

    @Autowired
    private RestTemplate restTemplate;

    @Value("#{integrationProperties['leos.akn4eu.url']}")
    private String akn4euUrl;

    @Value("#{integrationProperties['leos.akn4eu.convert.uri']}")
    private String convertUri;

    @Override
    public void convert(File legFile, User user, String outputDescriptor) throws Exception {
        Validate.notNull(legFile, "legFile must not be null!");
        try {
            String uri = akn4euUrl + convertUri;

            MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
            map.add("inputFile", new FileSystemResource(legFile));
            map.add("outputDescriptor", outputDescriptor);
            map.add("emailAddress", user.getEmail());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(uri, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return;
            }

            LOG.error("Not successfull conversion using the external service Akn4EU");
            throw new IllegalStateException("Not successfull conversion using the external service Akn4EU");

        } catch(Exception e){
            LOG.error("Exception while calling external service Akn4EU", e);
            throw e;
        }
    }
}
