import { map } from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

function Map({ observedUserLocation, markers }) {
    return (
        <MapView
            style={styles.map}
            region={observedUserLocation}
            showsUserLocation={true}>
              {map(markers, ({ latitude, longitude }) => (
                  <Marker key={Math.random()}
                      title={`${Math.random()}`}
                      coordinate={{ latitude, longitude }} />)
              )}
    </MapView>
    )
}

export default Map;
