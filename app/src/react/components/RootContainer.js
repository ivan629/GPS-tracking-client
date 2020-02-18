import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Button from 'react-native-flat-button'

import { firebaseService } from '../../redux/services/firebaseService';
import { getMarkers, getObservedUserLocation } from '../../redux/selectors/map.selectors';
import { toggleLocationMonitoring, switchObservedUser } from '../../redux/actions/locationDetectionActions'

import Map from './Map/Map';


function RootContainer(props) {
const {
    markers,
    changeObservedUser,
    observedUserLocation,
    isLocationMonitoring,
    toggleLocationMonitor
} = props;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        height: 50,
        bottom: 0,
        borderRadius: 0
    }
});

    return (
        <View style={{flex: 1}}>
            <Map markers={markers} observedUserLocation={observedUserLocation} />
                 <View style={{position: 'absolute', flex:2, flexDirection:'row', bottom: 0}}>
                    <Button
                        type='primary'
                        onPress={() => toggleLocationMonitor(!isLocationMonitoring)}
                        containerStyle={styles.buttonContainer}
                    >
                        {isLocationMonitoring ? 'Stop detection' : 'Start detection'}
                    </Button>
                    <Button
                        type='positive'
                        onPress={() => changeObservedUser()}
                        containerStyle={styles.buttonContainer}
                    >
                        Switch Focus
                    </Button>
                </View>
        </View>
    )
}


RootContainer.propTypes = {};

const mapStateToProps = state => ({
    isLocationMonitoring: state.locationMonitoring.isLocationMonitoring,
    observedUserLocation: getObservedUserLocation(state),
    markers: getMarkers(state)
});

export default connect(mapStateToProps, {
    changeObservedUser: switchObservedUser,
    toggleLocationMonitor: toggleLocationMonitoring
})(RootContainer);

