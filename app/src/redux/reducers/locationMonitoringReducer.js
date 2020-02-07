import { find } from 'lodash';
import {
  LOCATION_DATA_SET,
  USER_OBSERVED_CHANGE,
  LOCATION_MONITORING_TOGGLE
} from '../actions/locationDetectionActions';

const DEFAULT_OTHER_USERS_LOCATIONS = [{
  id: 2,
  latitude: 48.461255,
  longitude: 26.185371
}];

const DEFAULT_OBSERVED_USER_ID = 1;

const initialState = {
  observedUserId: DEFAULT_OBSERVED_USER_ID,
  currentUserLocation: null,
  isLocationMonitoring: false,
  otherUsersLocations: DEFAULT_OTHER_USERS_LOCATIONS
};

export const locationMonitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_MONITORING_TOGGLE:
      return {
        ...state,
        isLocationMonitoring: action.payload
      };

    case LOCATION_DATA_SET:
      return {
        ...state,
        currentUserLocation: action.payload
      };

    case USER_OBSERVED_CHANGE:
      console.log('test', state.otherUsersLocations);
      return {
        ...state,
        observedUserId: find(state.otherUsersLocations, { id: state.observedUserId + 1 }) || 1
      };

    default:
      return {
        ...state
      }
  }
};
