import { getPathFromUrl } from '../../constants/urls';

const eventNames = {
    HOME: 'Clicked home',
    TIMELINE: 'Clicked timeline',
    REFER: "Clicked refer",
    SUBSCRIPTION: "Clicked subscription",
    PROFILE: "Clicked profile",
    HELPCENTER: "Clicked help center",
    LOGOUT: "Clicked logout"
};

const { HOME, TIMELINE, REFER, SUBSCRIPTION, PROFILE, HELPCENTER, LOGOUT } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const homeClicked = (): EventFunction => ({
    eventName: HOME,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const timelineClicked = (): EventFunction => ({
    eventName: TIMELINE,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const referClicked = (): EventFunction => ({
    eventName: REFER,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const subscriptionClicked = (): EventFunction => ({
    eventName: SUBSCRIPTION,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const profileClicked = (): EventFunction => ({
    eventName: PROFILE,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const helpCenterClicked = (): EventFunction => ({
    eventName: HELPCENTER,
    payload: {
        url: getPathFromUrl(null),
    },
});
export const logoutClicked = (): EventFunction => ({
    eventName: LOGOUT,
    payload: {
        url: getPathFromUrl(null),
    },
});