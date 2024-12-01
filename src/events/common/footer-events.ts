import { getPathFromUrl } from '../../constants/urls';

const eventNames = {
    EMAIL: "Clicked email",
    X: 'Clicked x',
    FACEBOOK: 'Clicked facebook',
    LINKEDIN: "Clicked linkedin",
    YOUTUBE: "Clicked youtube",
    ABOUTUS: "Clicked aboutus",
    TNC: "Clicked tnc",
    PRIVACY: "Clicked privacy",
    DISCLAIMER: "Clicked disclaimer",
    FAQS: "Clicked faqs",
    PRICING: "Clicked pricing",
};

const { EMAIL, X, FACEBOOK, LINKEDIN, YOUTUBE, ABOUTUS, TNC, PRIVACY, DISCLAIMER, FAQS, PRICING } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const emailClicked = (): EventFunction => ({
    eventName: EMAIL,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const xClicked = (): EventFunction => ({
    eventName: X,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const facebookClicked = (): EventFunction => ({
    eventName: FACEBOOK,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const linkedinClicked = (): EventFunction => ({
    eventName: LINKEDIN,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const youtubeClicked = (): EventFunction => ({
    eventName: YOUTUBE,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const aboutusClicked = (): EventFunction => ({
    eventName: ABOUTUS,
    payload: {
        url: getPathFromUrl(null),
    },
});

export const tncClicked = (): EventFunction => ({
    eventName: TNC,
    payload: {
        url: getPathFromUrl(null),
    },
});
export const privacyClicked = (): EventFunction => ({
    eventName: PRIVACY,
    payload: {
        url: getPathFromUrl(null),
    },
});
export const disclaimerClicked = (): EventFunction => ({
    eventName: DISCLAIMER,
    payload: {
        url: getPathFromUrl(null),
    },
});
export const faqsClicked = (): EventFunction => ({
    eventName: FAQS,
    payload: {
        url: getPathFromUrl(null),
    },
});
export const pricingClicked = (): EventFunction => ({
    eventName: PRICING,
    payload: {
        url: getPathFromUrl(null),
    },
});