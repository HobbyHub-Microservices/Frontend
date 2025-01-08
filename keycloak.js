import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const KeycloakContext = createContext();

console.log(`public Keycloak url: ${process.env.NEXT_PUBLIC_KEYCLOAK_URL}`);
console.log(`Keycloak url: ${process.env.KEYCLOAK_URL}`);
console.log(`Keycloak realm: ${process.env.KEYCLOAK_REALM}`);
console.log(`keycloak_cliendid: ${process.env.KEYCLOAK_CLIENT_ID}`);



if (typeof window === "undefined") {
    console.log("Keycloak.js: Running on the server side");
} else {
    console.log("Keycloak.js: Running on the client side");
}

const keycloak = typeof window !== "undefined"
    ? new Keycloak({
        url: "https://keycloak-hobbyhub.australiacentral.cloudapp.azure.com"  || "default_url",
        realm: "HobbyHub" || "default_url",
        clientId: "frontend-public-client" || "default_url",
    })
    : new Keycloak({
        url: process.env.KEYCLOAK_URL || "default_url",
        realm: process.env.KEYCLOAK_REALM || "default_url",
        clientId: process.env.KEYCLOAK_CLIENT_ID || "default_url"
    })

export const KeycloakProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (keycloak) {
            const initKeycloak = async () => {
                try {
                    console.log("Initializing Keycloak...");
                    const authenticated = await keycloak.init({ onLoad: "login-required" });
                    if (authenticated) {
                        setIsAuthenticated(true);
                        setUser(keycloak.tokenParsed);
                        console.log("Authenticated:", authenticated);

                    } else {
                        console.error("User not authenticated");
                    }
                } catch (err) {
                    console.error("Error initializing Keycloak:", err);
                } finally {
                    setLoading(false);
                }
            };
            initKeycloak();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <KeycloakContext.Provider value={{ isAuthenticated, user, keycloak }}>
            {!loading ? children : <div>Loading...</div>}
        </KeycloakContext.Provider>
    );
};

export const useKeycloak = () => useContext(KeycloakContext);

export default keycloak;
