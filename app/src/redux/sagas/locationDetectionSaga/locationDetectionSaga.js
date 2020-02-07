import { takeLatest } from 'redux-saga/effects';

import LocationDetectionService from '../../services/locationDetectionService';

import { LOCATION_MONITORING_TOGGLE } from '../../actions/locationDetectionActions'

const LocationService = new LocationDetectionService();


function* handleLocationDetectionToggle({ payload }) {
    if (payload) {
        yield LocationService.startLocationDetection();
    } else {
        yield LocationService.stopLocationDetection();
    }
}

export default function* watchLocationDetectionSaga() {
    yield takeLatest(LOCATION_MONITORING_TOGGLE, handleLocationDetectionToggle);
}
