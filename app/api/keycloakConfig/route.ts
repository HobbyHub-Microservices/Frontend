import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        realm: process.env.KEYCLOAK_REALM,
        authServerUrl: process.env.KEYCLOAK_URL,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        sslRequired: 'external',
        publicClient: true,
        confidentialPort: 0,
    });
}
