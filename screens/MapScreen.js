/*import {HeaderButtons, Item} from "react-navigation-header-buttons"
import MapView, {Marker} from 'react-native-maps'
import React, {useCallback, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HeaderButton from "../components/HeaderButton";

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();
   const region = {
       latitude: 37.78,
       longitude: -122.43,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421
   }
   const {navigation} = props

   useLayoutEffect(() => {
       navigation.setOptions({
           headerRight: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                   <Item title="Grabar" iconName="save-outline" onPress={() => savePickedLocationHandler()} />
               </HeaderButtons>
           )
       })
   }, [navigation])

   const selectedLocationHandler = event => {
       setSelectedLocation({
           lat: event.nativeEvent.coordinate.latitude,
           lng: event.nativeEvent.coordinate.longitude
       });
   };

   const savePickedLocationHandler = useCallback(() => {
       if(!selectedLocation){
           return;
       }
       navigation.navigate("Nuevo", {picked: selectedLocation});
   }, [selectedLocation]);

   let markerCoordinates;

   if(selectedLocation){
       markerCoordinates = {
           latitude: selectedLocation.lat,
           longitude: selectedLocation.lng
       };
   }

   return(
       <MapView region={region} style={styles.map} onPress={selectedLocationHandler} >
   {markerCoordinates && (
       <Marker title="Ubicacion Seleccionada" coordinate={markerCoordinates} />
   )}
    </MapView>   )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreen*/

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MapView, { Marker } from 'react-native-maps';
import React, { useCallback, useLayoutEffect, useState } from 'react'

import HeaderButton from '../components/HeaderButton'
import { StyleSheet } from 'react-native'

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Grabar" 
                        onPress={() => savePickedLocationHandler()}/>
                </HeaderButtons>
            )
        })
    }, [navigation])

    const selectLocationHandler = event => {
        setSelectedLocation({
          lat: event.nativeEvent.coordinate.latitude,
          lng: event.nativeEvent.coordinate.longitude
        });
      };
    
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
          return;
        }
        navigation.navigate('Nuevo', { picked: selectedLocation });
      }, [selectedLocation]);
    
    let markerCoordinates;

    if (selectedLocation) {
    markerCoordinates = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
    };
    }

    return (
        <MapView 
            region={region} 
            style={styles.map} 
            onPress={selectLocationHandler}
        >
            {markerCoordinates && (
                <Marker title="Ubicacion Seleccionada" coordinate={markerCoordinates} />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreen
