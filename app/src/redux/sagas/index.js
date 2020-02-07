import { all, fork } from 'redux-saga/effects';

import watchLocationDetectionSaga from './locationDetectionSaga/locationDetectionSaga';

export default function* rootSaga() {
    yield all([fork(watchLocationDetectionSaga)])
}
