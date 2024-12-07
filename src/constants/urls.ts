export const urls: Record<string, string> = {
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    FORGOTPASSWORD: "/forgotpassword",
    DASHBOARD: "/dashboard",
    REFERANDEARN: "/referAndEarn",
    YOURTIMELINE: "/timeline",
    PROFILE: "/profileSettings",
    NEWSDETAILS: "/news/[id]",
    SUBSCRIPTION: "/subscriptions",
    ABOUT: "/about",
    DISCLAIMER: "/disclaimer",
    PRIVACY: "/privacy-policy",
    TNC: "/terms-and-conditions",
    FAQS: "/faqs",
};

// Check if the URL is a landing page
export const isLandingPage = (url: string): boolean =>
    url === urls.HOME;

export const getPathFromUrl = (url: string | null): string => {
    if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        const urlObj = new URL(url || currentUrl);
        return urlObj.pathname;
    }
    return '';
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