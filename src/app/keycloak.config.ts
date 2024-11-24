import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:3002',
  realm: 'recruitme',
  clientId: 'recruitme',
};

export default keycloakConfig;