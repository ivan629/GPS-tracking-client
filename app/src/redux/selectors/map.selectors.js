import { map, isNil } from 'lodash';
import { createSelector } from 'reselect';

const DEFAULT_OBSERVED_USER_LOCATION_OPTIONS = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const DEFAULT_CURRENT_USER_LOCATION = {
    latitude: 48.461255,
    longitude: 26.185371
};

export const getMarkers = createSelector(
    [
        state => state.locationMonitoring.usersLocations
    ],
    (otherUsersLocations) => otherUsersLocations
);

export const getObservedUserLocation = createSelector(
    [
        state => state.locationMonitoring.observedUserIndex,
        state => getMarkers(state)
    ],
    (observedUserIndex, allUserLocations) => {
        const observedUserData = allUserLocations[observedUserIndex];

        const newObservedUserData = isNil(observedUserData) ? DEFAULT_CURRENT_USER_LOCATION : observedUserData;

        return {
            ...newObservedUserData,
            ...DEFAULT_OBSERVED_USER_LOCATION_OPTIONS
        }
    }
);
