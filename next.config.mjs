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
        NEXT_PUBLIC_KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
        NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        NEXT_PUBLIC_KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
        NEXT_PUBLIC_HOBBY_API_URL: process.env.NEXT_PUBLIC_HOBBY_API_URL,
        NEXT_PUBLIC_USER_API_URL: process.env.NEXT_PUBLIC_USER_API_URL,
        NEXT_PUBLIC_POSTQUERY_API_URL: process.env.NEXT_PUBLIC_POSTQUERY_API_URL,
        NEXT_PUBLIC_POSTCOMMAND_API_URL: process.env.NEXT_PUBLIC_POSTCOMMAND_API_URL,
    },
}

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