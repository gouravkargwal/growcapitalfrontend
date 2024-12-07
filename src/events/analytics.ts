import { getPageName } from "../constants/urls";
import axios from "axios";
import { localStore } from "../utils/storageFactory";
import mixpanel from 'mixpanel-browser';
import ReactGA from 'react-ga4';

// Type for the analytics providers
interface AnalyticsProvider {
    init: (tokenOrId: string) => void;
    track: (eventName: string, payload?: Record<string, any>) => void;
    login?: (userId: string, userInfo: Record<string, any>) => void;
    logout?: () => void;
}

// Initialize analytics providers
const analyticsProviders: Record<string, AnalyticsProvider> = {
    mixpanel: {
        init: (token: string) => mixpanel.init(token, {
            debug: false,
            track_pageview: false,
            persistence: "localStorage",
        }),
        track: (eventName: string, payload?: Record<string, any>) => mixpanel.track(eventName, payload || {}),
        login: (userId: string, userInfo: Record<string, any>) => {
            if (mixpanel) {
                mixpanel.identify(userId);
                mixpanel.people.set({
                    ...userInfo,
                    $name: userInfo.firstName + ' ' + userInfo.lastName,
                    $email: userInfo.email,
                    $last_login: new Date().toISOString(),
                });
            } else {
                console.error('Mixpanel is not initialized. Call init() first.');
            }
        },
        logout: () => {
            if (mixpanel) {
                mixpanel.reset();
            }
        },
    },
    googleAnalytics: {
        init: (id: string) => ReactGA.initialize(id),
        track: (eventName: string, payload?: Record<string, any>) => ReactGA.event({ category: 'Event', action: eventName, ...payload }),
    },
};

// Initialize providers
export const initProviders = (): void => {
    if (process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN) {
        analyticsProviders.mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN);
    }
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        analyticsProviders.googleAnalytics.init(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
};

// Define secured keys
const securedKeys: string[] = [
    "cookie",
    "currentHashedRefreshToken",
    "password",
    "stripeCustomerId",
    "token",
    "twoFactorAuthenticationSecret",
];

// Push event function
function pushEvent(eventName: string, payload?: Record<string, any>): void {
    let isWindowRuntime = typeof window !== "undefined";
    if (isWindowRuntime) {
        Object.values(analyticsProviders).forEach(provider => {
            if (provider.track) {
                provider.track(eventName, payload || {});
            }
        });
    }
}

// Remove secured keys function
function removeSecuredKeys(profileParams: Record<string, any>): Record<string, any> {
    const data = Object.keys(profileParams).reduce((acc: Record<string, any>, cur: string) => {
        if (!securedKeys.includes(cur)) {
            acc[cur] = profileParams[cur];
        }
        return acc;
    }, {});
    data.identity = data.id;  // Ensure identity is not a secured key
    return data;
}

// Set user profile function (previously loginUser)
export const setUserProfile = async (payload: {
    userId: string;
    userInfo: Record<string, any>;
}) => {
    const { userId, userInfo } = payload;
    const sanitizedUserInfo = userInfo ? removeSecuredKeys(userInfo) : {};

    Object.values(analyticsProviders).forEach((provider) => {
        if (provider.login) {
            provider.login(userId, sanitizedUserInfo)
        }
    });
};

// Login function (tracks login event)
export const login = async (payload: {
    userId: string;
    userInfo: Record<string, any>;
}) => {
    await setUserProfile(payload);
};

export const logout = () => {
    Object.values(analyticsProviders).forEach((provider) => {
        if (provider.logout) {
            provider.logout();
        }
    });
};

// Log page view function
export const logPageView = async (): Promise<void> => {
    const currentUrl: string = window.location.href;
    const ip: string | null = await getIp();
    pushEvent("Page Viewed", {
        currentUrl,
        ip,
        pageName: getPageName(currentUrl),
    });
};

// Log event function
export const logEvent = async (payload: { eventName: string; payload?: Record<string, any> }): Promise<void> => {
    const currentUrl: string = window.location.href;
    const ip: string | null = await getIp();
    const pageName: string = getPageName(currentUrl);

    if (payload?.payload) {
        payload.payload.currentUrl = currentUrl;
        payload.payload.ip = ip;
        payload.payload.pageName = pageName;
    } else {
        payload.payload = {
            currentUrl,
            ip,
            pageName,
        };
    }
    pushEvent(payload.eventName, payload.payload);
};

// Get IP function
const getIp = async (): Promise<string | null> => {
    let ip: string | null;
    if (localStore.getItem("userIp")) {
        ip = localStore.getItem("userIp");
    } else {
        ip = await fetchIp();
    }
    return ip;
};

// Fetch IP function from a free source
const fetchIp = async (): Promise<string> => {
    try {
        const res = await axios.get<{ ip: string }>('https://api.ipify.org?format=json');
        localStore.setItem("userIp", res.data?.ip || "");
        return res.data?.ip || "";
    } catch (err) {
        console.error(err);
        return "";
    }
};