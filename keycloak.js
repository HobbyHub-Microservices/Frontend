// import Keycloak from "keycloak-js";
//
//
// // Initialize Keycloak instance
// const keycloak = new Keycloak({
//     url: "http://hobbyhub.com:8080",
//     realm: "HobbyHub",
//     clientId: "frontend-public-client",
// });
//
// // Function to initialize Keycloak
// export const initializeKeycloak = async () => {
//     if (!keycloak.didInitialize) {
//         try {
//             const authenticated = await keycloak.init({ onLoad: "login-required" });
//             if (authenticated) {
//                 keycloak.didInitialize = true; // Set a flag to indicate initialization is complete
//             } else {
//                 console.error("User not authenticated");
//             }
//             return authenticated;
//         } catch (err) {
//             console.error("Error initializing Keycloak:", err);
//             throw err;
//         }
//     } else {
//         console.warn("Keycloak is already initialized.");
//     }
// };
//
// // Export Keycloak instance
// export default keycloak;

// import React, { createContext, useContext, useEffect, useState } from "react";
// import Keycloak from "keycloak-js";
//
// // Initialize Keycloak instance
// const keycloak = new Keycloak({
//     url: "http://hobbyhub.com:8080",
//     realm: "HobbyHub",
//     clientId: "frontend-public-client",
// });
//
// // Create context
// const KeycloakContext = createContext();
//
// // Provider component
// export const KeycloakProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const initKeycloak = async () => {
//             try {
//                 console.log("Initializing Keycloak...");
//                 const authenticated = await keycloak.init({ onLoad: "login-required" });
//                 if (authenticated) {
//                     setIsAuthenticated(true);
//                     setUser(keycloak.tokenParsed); // Set user info
//                     console.log("Authenticated:", authenticated);
//                 } else {
//                     console.error("User not authenticated");
//                 }
//             } catch (err) {
//                 console.error("Error initializing Keycloak:", err);
//             } finally {
//                 setLoading(false); // Stop loading once Keycloak initializes
//             }
//         };
//
//         initKeycloak();
//     }, []);
//
//     return (
//         <KeycloakContext.Provider value={{ isAuthenticated, user, keycloak }}>
//             {!loading ? children : <div>Loading...</div>}
//         </KeycloakContext.Provider>
//     );
// };
//
// // Custom hook to use Keycloak context
// export const useKeycloak = () => {
//     return useContext(KeycloakContext);
// };
//
// export default keycloak;
"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

// Initialize Keycloak instance
const keycloak = new Keycloak({
    url: "http://hobbyhub.com:8080",
    realm: "HobbyHub",
    clientId: "frontend-public-client",
});

// Create context
const KeycloakContext = createContext();

// Provider component
export const KeycloakProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false); // Prevent multiple initializations

    useEffect(() => {
        if (!initialized) {
            setInitialized(true); // Ensure this runs only once
            const initKeycloak = async () => {
                try {
                    console.log("Initializing Keycloak...");
                    const authenticated = await keycloak.init({ onLoad: "login-required" });
                    if (authenticated) {
                        setIsAuthenticated(true);
                        setUser(keycloak.tokenParsed); // Set user info
                        console.log("Authenticated:", authenticated);
                    } else {
                        console.error("User not authenticated");
                    }
                } catch (err) {
                    console.error("Error initializing Keycloak:", err);
                } finally {
                    setLoading(false); // Stop loading once Keycloak initializes
                }
            };

            initKeycloak();
        }
    }, [initialized]);

    return (
        <KeycloakContext.Provider value={{ isAuthenticated, user, keycloak }}>
            {!loading ? children : <div>Loading...</div>}
        </KeycloakContext.Provider>
    );
};

// Custom hook to use Keycloak context
export const useKeycloak = () => {
    return useContext(KeycloakContext);
};

export default keycloak;


