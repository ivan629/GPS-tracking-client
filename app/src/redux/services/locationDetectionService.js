import { isEqual } from 'lodash';
import React from 'react';
import {
    PermissionsAndroid,
    Platform,
    ToastAndroid,
} from 'react-native';
import store from '../store';
import Geolocation from 'react-native-geolocation-service';

import { firebaseService } from './firebaseService'

class LocationDetectionService {
    constructor() {
        this.watchId = null;
        this.loading = false;
        this.location = {};
        this.updatesEnabled = false;
    }

    async hasLocationPermission() {
        if (
            Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)
        ) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    }

    async getLocation() {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.loading = true;
        Geolocation.getCurrentPosition(
            position => {
                this.location = position;
            },
            error => {
                this.location = error;
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 50,
                forceRequestLocation: true,
            }
        );
        this.loading = false;
    }

    async startLocationDetection() {
        const hasLocationPermission = this.hasLocationPermission();

        if (!hasLocationPermission) {
            return;
        }
        this.updatesEnabled = true;

        let count = 1;

        this.watchId = Geolocation.watchPosition((position) => {
                this.location = position;
                const newPosition = {
                    latitude: position.coords.latitude + (count / 100),
                    longitude: position.coords.longitude
                };

                count += 1;

                const oldPosition = store.getState().locationMonitoring.currentUserLocation;

                if (!isEqual(oldPosition, newPosition)) {
                  firebaseService.handlePositionSet(newPosition);
                }
            },
            (error) => {
                this.location = error;
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000
            }
        );
    };

    async stopLocationDetection() {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.updatesEnabled = false;
            firebaseService.clearCurrentUserPositionHistory();
        }
    }
}

export default LocationDetectionService;
