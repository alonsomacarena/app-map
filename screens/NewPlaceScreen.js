/*import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { COLORS } from '../constants'
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';
import { addPlace } from '../store/places.actions';
import { useDispatch } from 'react-redux';

const NewPlaceScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [image, setImage] = useState();

    const handleTitleChange = text => setTitle(text);

    const handleSave = () => {
        dispatch(addPlace(title, image));
        navigation.navigate('Direcciones');
    }

    const handlePickImage = (uri) => {
        setImage(uri);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={handleTitleChange}
                />

                <ImageSelector onImage={handlePickImage} />
                <LocationPicker navigation={navigation} />
                <Button
                    title="Grabar Dirección"
                    color={COLORS.MAROON}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
})

export default NewPlaceScreen*/

import * as placesActions from '../store/places.actions'

import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'

import { COLORS } from '../constants'
import ImageSelector from '../components/ImageSelector'
import LocationPicker from '../components/LocationPicker'
import { useDispatch } from 'react-redux'

const NewPlaceScreen = ({navigation, route}) => {
    const dispatch = useDispatch()
    const [text, onChangeText] = useState('')
    const [selectImage, setSelectImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()


    const onHandlerSave = () => {
        dispatch(placesActions.addPlace(text, selectImage, selectedLocation ))
        navigation.goBack()
    }

    const onHandlerImageTaken = path => setSelectImage(path)

    const onHandlerLocationPicked = useCallback(location => {
        setSelectedLocation(location)
    }, [setSelectedLocation])
  
    return (
        <ScrollView>
            <View style={styles.container}> 
                <Text style={styles.label}>Titulo</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    />
                <ImageSelector onImage={onHandlerImageTaken}/>
                <LocationPicker navigation={navigation} route={route} onLocationPicked={onHandlerLocationPicked}/>
                <View style={styles.footer}>
                    <Button title="Grabar Direccion" color={COLORS.MAROON} onPress={onHandlerSave} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 16
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4
    },
    footer: {
        marginTop: 42
    }
})

export default NewPlaceScreen

