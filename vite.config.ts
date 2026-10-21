import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svg from "vite-plugin-svgr"
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const baseUrl = (env.VITE_BASE_URL || "") + "/";
    const scope = env.VITE_BASE_URL || "";
    const baseClean = baseUrl.replace(/^\/|\/$/g, '');
    const baseRegex = new RegExp(`^\\/${baseClean}\\/`);
    const allowList = env.VITE_BASE_URL ? [baseRegex] : [];

    return {
        base: baseUrl,
        plugins: [
            tsconfigPaths(),
            svg({include: '**/*.svg'}),
            react(
                {
                    babel: {
                        plugins: [
                            [
                                'babel-plugin-styled-components',
                                {
                                    // Enables more readable class names with the component’s displayName.
                                    displayName: true,
                                    // Optionally, you can disable fileName to only show the component name:
                                    fileName: false,
                                },
                            ],
                        ],
                    },
                }
            ),
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['robots.txt'],
                manifest: {
                    name: 'Scoundrel',
                    short_name: 'Scoundrel',
                    start_url: baseUrl,
                    scope: scope,
                    display: 'standalone',
                    background_color: '#000000',
                    theme_color: '#000000',
                    icons: [
                        {
                            src: `${scope}/icons/web-app-manifest-192x192.png`,
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: `${scope}/icons/web-app-manifest-512x512.png`,
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                },
                workbox: {
                    navigateFallback: `${scope}/index.html`,
                    navigateFallbackAllowlist: allowList,
                    globPatterns: [
                        '**/*.{js,css,html,ico,png,ttf,mp3,json}',
                    ],
                    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
                },
            }),
        ],
    }
})
