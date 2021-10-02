import * as Location from "expo-location";

import {Alert, Button, Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";

import {COLORS} from "../constants";
import MapPreview from "./MapPreview";

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const { status } = await location.requestForegroundPermissionsAsync();

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

    console.log(location);

    setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    });
}

return (
<View style={styles.locationPicker}>
<View style={styles.mapPreview} >
{!pickedLocation
? <Text>Location en proceso</Text>
: <Text>Latitud: {pickedLocation.lat} - Longitud: {pickedLocation.lng}</Text>}
</View>
<Button title="Obtener Location" color={COLORS.PEACH_PUFF}
onPress={handleGetLocation} />
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

export default LocationPicker;