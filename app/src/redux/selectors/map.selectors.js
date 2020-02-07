import { find, map, isNil } from 'lodash';
import { createSelector } from 'reselect';

const DEFAULT_OBSERVED_USER_LOCATION_OPTIONS = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const DEFAULT_CURRENT_USER_LOCATION = {
    latitude: 48.461255,
    longitude: 26.185371
};

const DEFAULT_LOCATION_COORDS = {
    latitude: 37.461255,
    longitude: -222.185371
};

export const getMarkers = createSelector(
    [
        state => state.locationMonitoring.currentUserLocation,
        state => state.locationMonitoring.otherUsersLocations
    ],
    (currentUserLocation, otherUsersLocations) => {
        let count = 0;
        currentUserLocation = isNil(currentUserLocation) ? DEFAULT_LOCATION_COORDS : currentUserLocation;

        return map([currentUserLocation, ...otherUsersLocations], (user) => {
            count += 1;

            return { id: count, ...user}
        });
    }
);

export const getObservedUserLocation = createSelector(
    [
        state => state.locationMonitoring.observedUserId,
        state => getMarkers(state)
    ],
    (observedUserId, allUserLocations) => {
        const observedUserData = find(allUserLocations, { id: observedUserId });
        console.log('currentUserLocation', allUserLocations);

        const newObservedUserData = isNil(observedUserData) ? DEFAULT_CURRENT_USER_LOCATION : observedUserData;

        return {
            ...newObservedUserData,
            ...DEFAULT_OBSERVED_USER_LOCATION_OPTIONS
        }
    }
);
