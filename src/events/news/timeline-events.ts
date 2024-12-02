import { urls } from '../../constants/urls';

const { YOURTIMELINE } = urls;
const url = YOURTIMELINE;

const eventNames = {
    SHARE: 'Clicked share timeline',
    FULLREPORT: 'Clicked full report view',
};

const { SHARE, FULLREPORT } = eventNames;

interface EventFunction {
    eventName: string;
    payload: any;
}

export const shareClicked = (index: string, newsId: string): EventFunction => ({
    eventName: SHARE,
    payload: {
        url,
        index,
        newsId,
    },
});
export const fullReportClicked = (index: string, newsId: string): EventFunction => ({
    eventName: FULLREPORT,
    payload: {
        url,
        index,
        newsId,
    },
});