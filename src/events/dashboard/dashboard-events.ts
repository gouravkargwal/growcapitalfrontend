import { urls } from '../../constants/urls';

const { DASHBOARD } = urls;
const url = DASHBOARD;

const eventNames = {
    OPENSOURCES: 'Clicked notification sources',
    SOURCECLICKED: 'Clicked source',
    SOURCEUPDATED: 'Notification source updated',
    SOURCEUPDATEFAILED: 'Notification source update failed',
    REFER: 'Clicked refer',
    LANGUAGECHANGED: 'Clicked language change',
    LANGUAGEUPDATED: 'Language updated',
    LANGUAGEUPDATEFAILED: 'Language update failed',
    CHANNELCLICKED: 'Clicked communication channel',
    CHANNELSETUP: 'Communication channel setup',
    CHANNELEDIT: 'Communication channel edit',
    EDITSTOCKTRACKED: 'Clicked edit stocks',
    DONESTOCKTRACKED: 'Clicked done stocks',
    STOCKSUPDATESUCCESS: 'Stocks updated success',
    STOCKSUPDATEFAILED: 'Stocks updated failed',
    ACCOUNTOVERVIEW: 'Account overview',
};

const { OPENSOURCES, SOURCECLICKED, SOURCEUPDATED,
    SOURCEUPDATEFAILED, REFER, LANGUAGECHANGED,
    LANGUAGEUPDATED, LANGUAGEUPDATEFAILED, CHANNELCLICKED,
    CHANNELSETUP, CHANNELEDIT, EDITSTOCKTRACKED,
    DONESTOCKTRACKED, STOCKSUPDATESUCCESS, STOCKSUPDATEFAILED,
    ACCOUNTOVERVIEW } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const openSourcesClicked = (): EventFunction => ({
    eventName: OPENSOURCES,
    payload: {
        url,
    },
});
export const sourcesClicked = (source: string): EventFunction => ({
    eventName: SOURCECLICKED,
    payload: {
        url,
        source,
    },
});
export const sourceUpdated = (source: string): EventFunction => ({
    eventName: SOURCEUPDATED,
    payload: {
        url,
        source,
    },
});
export const sourceUpdateFailed = (source: string): EventFunction => ({
    eventName: SOURCEUPDATEFAILED,
    payload: {
        url,
        source,
    },
});
export const referClicked = (): EventFunction => ({
    eventName: REFER,
    payload: {
        url,
    },
});
export const languageClicked = (language: string): EventFunction => ({
    eventName: LANGUAGECHANGED,
    payload: {
        url,
        language,
    },
});
export const languageUpdated = (language: string): EventFunction => ({
    eventName: LANGUAGEUPDATED,
    payload: {
        url,
        language,
    },
});
export const languageUpdateFailed = (language: string): EventFunction => ({
    eventName: LANGUAGEUPDATEFAILED,
    payload: {
        url,
        language,
    },
});
export const channelClicked = (channel: string): EventFunction => ({
    eventName: CHANNELCLICKED,
    payload: {
        url,
        channel,
    },
});
export const channelSetupClicked = (channel: string): EventFunction => ({
    eventName: CHANNELSETUP,
    payload: {
        url,
        channel,
    },
});
export const channelEditClicked = (channel: string): EventFunction => ({
    eventName: CHANNELEDIT,
    payload: {
        url,
        channel,
    },
});
export const seeDetailsClicked = (name: string, value: string): EventFunction => ({
    eventName: ACCOUNTOVERVIEW,
    payload: {
        url,
        name,
        value,
    },
});
export const editStocks = (): EventFunction => ({
    eventName: EDITSTOCKTRACKED,
    payload: {
        url,
    },
});
export const doneEditStocks = (): EventFunction => ({
    eventName: DONESTOCKTRACKED,
    payload: {
        url,
    },
});
export const editStocksSuccess = (): EventFunction => ({
    eventName: STOCKSUPDATESUCCESS,
    payload: {
        url,
    },
});
export const editStocksFailed = (reason: string): EventFunction => ({
    eventName: STOCKSUPDATEFAILED,
    payload: {
        url,
        reason,
    },
});