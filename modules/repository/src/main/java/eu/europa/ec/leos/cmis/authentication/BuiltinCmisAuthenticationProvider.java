package eu.europa.ec.leos.cmis.authentication;

import java.security.Principal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import eu.europa.ec.leos.cmis.authentication.LeosCmisAuthenticationProvider;
public class BuiltinCmisAuthenticationProvider extends LeosCmisAuthenticationProvider {

    private static final long serialVersionUID = 1L;
    public BuiltinCmisAuthenticationProvider() {
        super();
    }

    @Override
    protected String getUser() {
        Principal principal = getPrincipal();
        if (principal != null && principal.getName() != null && !principal.getName().isEmpty()) {
            String name = principal.getName();
            return "builtin/"+name;
        } else {
            return getTechnicalUserName();
        }
    }
}
