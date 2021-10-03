/*import * as Location from "expo-location";

import {Alert, Button, Image, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";

import {COLORS} from "../constants";
import MapPreview from "./MapPreview";

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesita dar permisos de la cámara para usar la aplicación',
        [{ text: 'Ok' }],
      )

      return false;
    }

    return true;
  }

const handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;

    const location = await Location.getCurrentPositionAsync({
        timeout: 5000
    })

   // console.log(location);

    setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    });
}

const handlerPickOnMap = () => props.navigation.push("Map")

return (
    <View style={styles.locationPicker}>
    <View style={styles.mapPreview} >
    {!pickedLocation
    ? <Text>Location en proceso</Text>
    : <MapPreview style={styles.mapPreview} location={pickedLocation} /> }
    </View>
    <Button title="Obtener Location" color={COLORS.PEACH_PUFF}
    onPress={handleGetLocation} />
    <Button title="Elige en el Mapa" color={COLORS.PEACH_PUFF}
    onPress={handlerPickOnMap} />
    </View>
    )
    }



const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default LocationPicker;*/

import * as Location from 'expo-location';

import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {COLORS} from "../constants";
import MapPreview from './MapPreview'

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState();
  const picked = props.route.params?.picked || null

  const {onLocationPicked} = props

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
            'Permisos insuficientes',
            'Necesita dar permisos de localizacion para la app',
            [{ text: 'Okay' }]
          );
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if(picked) {
      setPickedLocation(picked)
      onLocationPicked(picked)
    }
  }, [picked, onLocationPicked])
  
  const getLocationHandler = async () => {

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });

      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
      setPickedLocation(data)
      onLocationPicked(data)

    } catch (err) {
      Alert.alert(
        'No se pudo obtener la localizacion',
        'Por favor intente nuevamente.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const handlerPickOnMap = () => props.navigation.push('Map')

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={handlerPickOnMap}>
        {isFetching ? (
          <ActivityIndicator size="large" color={COLORS.LIGTH_PINK} />
        ) : (
          <Text>Location en proceso...</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Obtener Location"
          color={COLORS.PEACH_PUFF}
          onPress={getLocationHandler}
        />
        <Button
          title="Elegir del Mapa"
          color={COLORS.BLUSH}
          onPress={handlerPickOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});

export default LocationPicker;
