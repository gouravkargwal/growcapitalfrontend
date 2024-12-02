import { urls } from '../../constants/urls';

const { NEWSDETAILS } = urls;
const url = NEWSDETAILS;

const eventNames = {
    SHARE: 'Clicked share news details',
    FACEBOOK: 'Clicked facebook news details',
    TWITTER: 'Clicked twitter news details',
    LINKEDIN: 'Clicked linkedin news details',
    EXCHANGFILING: 'Clicked exchange filing',
    RELATEDARTICLES: 'Clicked related articles',
};

const { SHARE, FACEBOOK, TWITTER, LINKEDIN, EXCHANGFILING, RELATEDARTICLES } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const shareClicked = (newsId: string): EventFunction => ({
    eventName: SHARE,
    payload: {
        url,
        newsId,
    },
});
export const facebookClicked = (newsId: string): EventFunction => ({
    eventName: FACEBOOK,
    payload: {
        url,
        newsId,
    },
});
export const twitterClicked = (newsId: string): EventFunction => ({
    eventName: TWITTER,
    payload: {
        url,
        newsId,
    },
});
export const linkedinClicked = (newsId: string): EventFunction => ({
    eventName: LINKEDIN,
    payload: {
        url,
        newsId,
    },
});
export const filingClicked = (newsId: string): EventFunction => ({
    eventName: EXCHANGFILING,
    payload: {
        url,
        newsId,
    },
});
export const relatedClicked = (newsId: string): EventFunction => ({
    eventName: RELATEDARTICLES,
    payload: {
        url,
        newsId,
    },
});