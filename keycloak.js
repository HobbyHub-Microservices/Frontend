import Keycloak from "keycloak-js";



// Initialize Keycloak instance
const keycloak = new Keycloak({
    url: "http://hobbyhub.com:8080",
    realm: "HobbyHub",
    clientId: "frontend-app",
});

export default keycloak;
