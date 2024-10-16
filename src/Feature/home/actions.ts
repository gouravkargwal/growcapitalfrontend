import { SET_VIEW } from './actionTypes';

export const setView = (view: string) => ({
  type: SET_VIEW,
  payload: view,
});