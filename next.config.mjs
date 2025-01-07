let userConfig = undefined
try {
    userConfig = await import('./v0-user-next.config')
} catch (e) {
    // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
        parallelServerCompiles: true,
    },
    env: {
        KEYCLOAK_URL: process.env.KEYCLOAK_URL,
        KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
        KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
        HOBBY_API_URL: process.env.HOBBY_API_URL,
        USER_API_URL: process.env.USER_API_URL,
        POSTQUERY_API_URL: process.env.POSTQUERY_API_URL,
        POSTCOMMAND_API_URL: process.env.POSTCOMMAND_API_URL,
    },
}
console.log('Environment Variables:');
console.log('KEYCLOAK_URL:', process.env.KEYCLOAK_URL);
console.log('KEYCLOAK_CLIENT_ID:', process.env.KEYCLOAK_CLIENT_ID);
console.log('KEYCLOAK_REALM:', process.env.KEYCLOAK_REALM);
console.log('HOBBY_API_URL:', process.env.HOBBY_API_URL);
console.log('USER_API_URL:', process.env.USER_API_URL);
console.log('POSTQUERY_API_URL:', process.env.POSTQUERY_API_URL);
console.log('POSTCOMMAND_API_URL:', process.env.POSTCOMMAND_API_URL);

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
    if (!userConfig) {
        return
    }

    for (const key in userConfig) {
        if (
            typeof nextConfig[key] === 'object' &&
            !Array.isArray(nextConfig[key])
        ) {
            nextConfig[key] = {
                ...nextConfig[key],
                ...userConfig[key],
            }
        } else {
            nextConfig[key] = userConfig[key]
        }
    }
}

export default nextConfig