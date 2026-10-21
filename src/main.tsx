import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {HelmetProvider} from "react-helmet-async";
import "utils/console.ts";
import "utils/pwaInstall.ts";
import CloseWatcher from "utils/CloseWatcher";
import PostHogAppProvider from "components/PostHogAppProvider";
// import {registerSW} from "virtual:pwa-register";
import {store, persistor} from "store";

import Index from "./index.tsx";
import {NOT_PERSIST} from "./constants.ts";

// const updateSW = registerSW({
//     onNeedRefresh() {
//         if (confirm("New content available. Refresh?")) {
//             updateSW(true);
//         }
//     },
//     onOfflineReady() {
//         console.log("App is ready to work offline.");
//     },
// });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogAppProvider>
            <Provider store={store}>
                {NOT_PERSIST || !persistor ? (
                    <HelmetProvider>
                        <Index/>
                    </HelmetProvider>
                ) : (
                    <PersistGate loading={null} persistor={persistor}>
                        <CloseWatcher />
                        <HelmetProvider>
                            <Index/>
                        </HelmetProvider>
                    </PersistGate>
                )}
            </Provider>
        </PostHogAppProvider>
    </StrictMode>
)
