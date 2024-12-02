import { urls } from '../../constants/urls';

const { SIGNUP } = urls;
const url = SIGNUP;

const eventNames = {
    BACK: 'Clicked back auth',
    SIGNUPCONTINUE: 'Clicked sign up',
    GOOGLESIGNUP: "Clicked google sign up",
    SIGNUPSUCCESS: "Sign up success",
    SIGNUPFAILED: "Sign up failed",
    LOGIN: "Clicked login"
};

const { BACK, SIGNUPCONTINUE, GOOGLESIGNUP, SIGNUPSUCCESS, SIGNUPFAILED, LOGIN } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const backClicked = (location: string): EventFunction => ({
    eventName: BACK,
    payload: {
        url,
        location,
    },
});

export const signUpclicked = (hasReferrer: boolean): EventFunction => ({
    eventName: SIGNUPCONTINUE,
    payload: {
        url,
        hasReferrer,
    },
});
export const googleSignupClicked = (): EventFunction => ({
    eventName: GOOGLESIGNUP,
    payload: {
        url,
    },
});
export const signUpSucces = (): EventFunction => ({
    eventName: SIGNUPSUCCESS,
    payload: {
        url,
    },
});
export const signUpFail = (): EventFunction => ({
    eventName: SIGNUPFAILED,
    payload: {
        url,
    },
});
export const loginClicked = (): EventFunction => ({
    eventName: LOGIN,
    payload: {
        url,
    },
});