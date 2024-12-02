import { urls } from '../../constants/urls';

const { SUBSCRIPTION } = urls;
const url = SUBSCRIPTION;

const eventNames = {
    SELECTEDPLAN: 'Clicked select plan',
    UPGRADENOW: 'Clicked upgrade now plan',
    PLANBUYSUCCESS: 'Plan buy success',
    PLANBUYFAIL: 'Plan buy fail',
};

const { SELECTEDPLAN, UPGRADENOW, PLANBUYSUCCESS, PLANBUYFAIL } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const selectedPlanClicked = (plan: string): EventFunction => ({
    eventName: SELECTEDPLAN,
    payload: {
        url,
        plan,
    },
});
export const upgradeNowClicked = (plan: string, duration: string): EventFunction => ({
    eventName: UPGRADENOW,
    payload: {
        url,
        plan,
        duration,
    },
});
export const planBuySuccess = (plan: string, duration: string, amount: string): EventFunction => ({
    eventName: PLANBUYSUCCESS,
    payload: {
        url,
        plan,
        duration,
        amount,
    },
});
export const planBuyFail = (plan: string, duration: string, reason: string): EventFunction => ({
    eventName: PLANBUYFAIL,
    payload: {
        url,
        plan,
        duration,
        reason,
    },
});