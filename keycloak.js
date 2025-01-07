"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const KeycloakContext = createContext();

const keycloak_url = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
const keycloak_realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
const keycloak_cliendid = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

console.log(`Keycloak url: ${keycloak_url}`);
console.log(`Keycloak realm: ${keycloak_realm}`);
console.log(`keycloak_cliendid: ${keycloak_cliendid}`);
const keycloak = typeof window !== "undefined"
    ? new Keycloak({
        url: keycloak_url,
        realm: keycloak_realm,
        clientId: keycloak_cliendid,
    })
    : null;

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
