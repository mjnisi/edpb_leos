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
package eu.europa.ec.leos.annotate.repository;

import eu.europa.ec.leos.annotate.model.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * the repository for all {@link User} objects denoting annotate users
 */
public interface UserRepository extends CrudRepository<User, Long> {

    /**
     * search for a user given its login
     * 
     * @param login the user's login
     * @param context the user's context
     * @return the found {@link User} object, or {@literal null}
     */
    User findByLoginAndContext(String login, String context);
    
    /**
     * search for a user given its ID
     * 
     * @param userId internal database ID assigned to the user
     * @return the found {@link User} object, or {@literal null}
     */
    User findById(long userId);
}
