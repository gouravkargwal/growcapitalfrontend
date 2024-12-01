import { urls } from '../../constants/urls';

const { REFERANDEARN } = urls;
const url = REFERANDEARN;

const eventNames = {
    COPY: 'Clicked copy refer',
    X: 'Clicked x refer',
    FACEBOOK: "Clicked facebook refer",
    LINKEDIN: "Clicked linkedin refer",
    INSTAGRAM: "Clicked instagram refer",
    CLAIM: "Clicked claim refer",
    CLAIMSUCCESS: "Claim success",
    CLAIMFAILED: "Claim failed"
};

const { COPY, X, FACEBOOK, LINKEDIN, INSTAGRAM, CLAIM, CLAIMSUCCESS, CLAIMFAILED } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const copyClicked = (): EventFunction => ({
    eventName: COPY,
    payload: {
        url,
    },
});
export const xClicked = (): EventFunction => ({
    eventName: X,
    payload: {
        url,
    },
});
export const facebookClicked = (): EventFunction => ({
    eventName: FACEBOOK,
    payload: {
        url,
    },
});
export const linkedinClicked = (): EventFunction => ({
    eventName: LINKEDIN,
    payload: {
        url,
    },
});
export const instaClicked = (): EventFunction => ({
    eventName: INSTAGRAM,
    payload: {
        url,
    },
});
export const claimClicked = (reward: string, referred: string): EventFunction => ({
    eventName: CLAIM,
    payload: {
        url,
        reward,
        referred,
    },
});
export const claimSuccess = (): EventFunction => ({
    eventName: CLAIMSUCCESS,
    payload: {
        url,
    },
});
export const claimFailed = (): EventFunction => ({
    eventName: CLAIMFAILED,
    payload: {
        url,
    },
});