import { combineReducers } from 'redux';

import { locationMonitoringReducer } from './locationMonitoringReducer';

export default combineReducers({
  locationMonitoring: locationMonitoringReducer
})
