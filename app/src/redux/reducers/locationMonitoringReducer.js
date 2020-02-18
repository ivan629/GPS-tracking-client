import { isNil } from 'lodash';
import {
  USERS_DATA_SET,
  USER_OBSERVED_CHANGE,
  LOCATION_MONITORING_TOGGLE, UNIQUE_USER_ID_SET
} from '../actions/locationDetectionActions';

const DEFAULT_OTHER_USERS_LOCATIONS = [{
  latitude: 48.461255,
  longitude: 26.185371
}];

const DEFAULT_OBSERVED_USER_ID = 1;

const initialState = {
  uniqueUserId: null,
  observedUserIndex: DEFAULT_OBSERVED_USER_ID,
  currentUserLocation: null,
  isLocationMonitoring: false,
  usersLocations: DEFAULT_OTHER_USERS_LOCATIONS
};

export const locationMonitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_MONITORING_TOGGLE:
      return {
        ...state,
        isLocationMonitoring: action.payload
      };

    case USERS_DATA_SET:
      return {
        ...state,
        usersLocations: [...DEFAULT_OTHER_USERS_LOCATIONS, ...action.payload]
      };

    case UNIQUE_USER_ID_SET:
      return {
        ...state,
        uniqueUserId: action.payload
      };

    case USER_OBSERVED_CHANGE:
      const observedUserIndex = !isNil(state.usersLocations[state.observedUserIndex + 1])
      ? state.usersLocations.indexOf(state.usersLocations[state.observedUserIndex + 1])
      : 0;

      return {
        ...state,
        observedUserIndex
      };

    default:
      return {
        ...state
      }
  }
};
