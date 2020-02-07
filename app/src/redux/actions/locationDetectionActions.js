import { createAction } from 'redux-actions';

export const LOCATION_DATA_SET = 'LOCATION_DATA_SET';
export const USER_OBSERVED_CHANGE = 'USER_OBSERVED_CHANGE';
export const LOCATION_MONITORING_TOGGLE = 'LOCATION_MONITORING_TOGGLE';

export const setLocationData = createAction(LOCATION_DATA_SET);
export const switchObservedUser = createAction(USER_OBSERVED_CHANGE);
export const toggleLocationMonitoring = createAction(LOCATION_MONITORING_TOGGLE);
