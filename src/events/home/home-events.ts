import { urls } from '../../constants/urls';

const { HOME } = urls;
const url = HOME;

const eventNames = {
    GETSTARTED: 'Clicked get started',
    SIGNIN: 'Clicked sign in',
    JOINBOT: "Clicked join the bot",
    FREETRIAL: "Clicked claim trial",
    CONTACTUS: "Clicked contact us",
    FAQS: "Opened Faq"
};

const { GETSTARTED, SIGNIN, JOINBOT, FREETRIAL, CONTACTUS, FAQS } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const getStartedClicked = (location: string): EventFunction => ({
    eventName: GETSTARTED,
    payload: {
        url,
        location,
    },
});

export const signInClicked = (location: string): EventFunction => ({
    eventName: SIGNIN,
    payload: {
        url,
        location,
    },
});

export const joinBotClicked = (): EventFunction => ({
    eventName: JOINBOT,
    payload: {
        url,
    },
});

export const claimTrialClicked = (): EventFunction => ({
    eventName: FREETRIAL,
    payload: {
        url,
    },
});

export const contactUsClicked = (): EventFunction => ({
    eventName: CONTACTUS,
    payload: {
        url,
        location,
    },
});
export const faqReadClicked = (title: string, opened: boolean): EventFunction => ({
    eventName: FAQS,
    payload: {
        url,
        title,
        opened,
    },
});

