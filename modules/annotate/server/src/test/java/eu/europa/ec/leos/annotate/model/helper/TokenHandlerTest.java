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
package eu.europa.ec.leos.annotate.model.helper;

import eu.europa.ec.leos.annotate.model.entity.Token;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;

/**
 * This class contains tests for functions operating on {@link Token} entities in {@link TokenHandler}
 */
public class TokenHandlerTest {

    // -------------------------------------
    // Tests
    // -------------------------------------

    // check that access token's expiration time is computed correctly
    @Test
    public void testAccessTokenExpirationSetCorrectly() {

        final String access = "acc";
        final int lifetime = 5;

        final Token token = new Token();
        TokenHandler.setAccessToken(token, access, lifetime); // use the "combined" function

        Assert.assertEquals(access, token.getAccessToken());
        Assert.assertEquals(lifetime, token.getAccessTokenLifetimeSeconds());

        final LocalDateTime latestExpiration = LocalDateTime.now().plusSeconds(lifetime);

        // note: as our reference date is computed after the token's date was computed, it should be (slightly) after the token's expiration or even identical
        Assert.assertTrue(token.getAccessTokenExpires().isBefore(latestExpiration) || token.getAccessTokenExpires().equals(latestExpiration));
    }

    // check that refresh token's expiration time is computed correctly
    @Test
    public void testRefreshTokenExpirationSetCorrectly() {

        final String refresh = "re";
        final int lifetime = 100;

        final Token token = new Token();
        TokenHandler.setRefreshToken(token, refresh, lifetime); // use the "combined" function

        Assert.assertEquals(refresh, token.getRefreshToken());
        Assert.assertEquals(lifetime, token.getRefreshTokenLifetimeSeconds());

        final LocalDateTime latestExpiration = LocalDateTime.now().plusSeconds(lifetime);

        // note: as our reference date is computed after the token's date was computed, it should be (slightly) after the token's expiration or even identical
        Assert.assertTrue(token.getRefreshTokenExpires().isBefore(latestExpiration) || token.getRefreshTokenExpires().equals(latestExpiration));
    }

    // check that the access token is correctly considered expired
    @Test
    public void testAccessTokenExpired() {

        final Token token = new Token();
        TokenHandler.setAccessToken(token, "access", 1);

        // now set the expiration date backwards by 2 seconds -> should then be a past date
        token.setAccessTokenExpires(LocalDateTime.now().minusSeconds(2));

        // verify: must be expired
        Assert.assertTrue(TokenHandler.isAccessTokenExpired(token));
    }

    // check that the refresh token is correctly considered expired
    @Test
    public void testRefreshTokenExpired() {

        final Token token = new Token();
        TokenHandler.setAccessToken(token, "refresh", 1);

        // now set the expiration date backwards by 2 seconds -> should then be a past date
        token.setRefreshTokenExpires(LocalDateTime.now().minusSeconds(2));

        // verify: must be expired
        Assert.assertTrue(TokenHandler.isRefreshTokenExpired(token));
    }

}
