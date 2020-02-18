import { createAction } from 'redux-actions';

export const USERS_DATA_SET = 'USERS_DATA_SET';
export const UNIQUE_USER_ID_SET = 'UNIQUE_USER_ID_SET';
export const USER_OBSERVED_CHANGE = 'USER_OBSERVED_CHANGE';
export const LOCATION_MONITORING_TOGGLE = 'LOCATION_MONITORING_TOGGLE';

export const switchObservedUser = createAction(USER_OBSERVED_CHANGE);
export const toggleLocationMonitoring = createAction(LOCATION_MONITORING_TOGGLE);
