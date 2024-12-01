export const urls: Record<string, string> = {
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signun",
    FORGOTPASSWORD: "/forgotpassword",
    DASHBOARD: "/dashboard",
    REFERANDEARN: "/referAndEarn",
    YOURTIMELINE: "/yourtimeline",
    PROFILE: "/profileSettings",
    NEWSDETAILS: "/news/[id]",
    SUBSCRIPTION: "/subscriptions",
};

// Check if the URL is a landing page
export const isLandingPage = (url: string): boolean =>
    url === urls.HOME;

// Extract path from URL
export const getPathFromUrl = (url: string | null): string => {
    const currentUrl = window.location.href;
    const urlObj = new URL(url || currentUrl);
    return urlObj.pathname;
};

// Get page name by URL
export const getPageName = (url: string): string => {
    const path = getPathFromUrl(url);
    return Object.keys(urls).reduce((pageName, key) => {
        const pattern = urls[key].replace(/\[.*?\]/g, ".*?");
        const regex = new RegExp(`^${pattern}$`);
        if (regex.test(path)) {
            pageName = key;
        }
        return pageName;
    }, "");
};