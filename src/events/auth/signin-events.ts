import { urls } from '../../constants/urls';

const { SIGNIN } = urls;
const url = SIGNIN;

const eventNames = {
    BACK: 'Clicked back auth',
    SIGNINCONTINUE: 'Clicked sign in',
    GOOGLESIGNIN: "Clicked google sign in",
    SIGNINSUCCESS: "Sign in success",
    SIGNINFAILED: "Sign in failed",
    FORGOTPASSWORD: "Clicked forgot password",
    REGISTER: "Clicked register"
};

const { BACK, SIGNINCONTINUE, GOOGLESIGNIN, SIGNINSUCCESS, SIGNINFAILED, FORGOTPASSWORD, REGISTER } = eventNames;

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

export const signInclicked = (): EventFunction => ({
    eventName: SIGNINCONTINUE,
    payload: {
        url,
    },
});
export const googleSigninClicked = (): EventFunction => ({
    eventName: GOOGLESIGNIN,
    payload: {
        url,
    },
});
export const signInSucces = (): EventFunction => ({
    eventName: SIGNINSUCCESS,
    payload: {
        url,
    },
});
export const signInFail = (): EventFunction => ({
    eventName: SIGNINFAILED,
    payload: {
        url,
    },
});
export const forgotClicked = (): EventFunction => ({
    eventName: FORGOTPASSWORD,
    payload: {
        url,
    },
});
export const registerClicked = (): EventFunction => ({
    eventName: REGISTER,
    payload: {
        url,
    },
});