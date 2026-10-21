// src/types/global.d.ts

import 'csstype';

declare module 'csstype' {
    interface Properties {
        '--angle'?: string;
        '--delay'?: string;
        // add more global CSS variables here if needed
    }
}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
