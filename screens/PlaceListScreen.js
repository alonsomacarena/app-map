/*import { FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/places.actions';

const PlaceListScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Nueva" 
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={() => navigation.push('Nuevo')}/>
                </HeaderButtons>
            )
        })
    }, [navigation])

    useEffect(() => {
        dispatch(loadPlaces());
    }, []);

    return (
       <FlatList 
            data={places}
            keyExtract={item => item.id}
            renderItem={itemData => (
                <PlaceItem 
                    image={itemData.item.image}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() =>{ navigation.navigate('Detalle', { 
                        placeTitle: itemData.item.title,
                        placeID: itemData.item.id
                    })}}
                />
            )}
       />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen*/

import * as addressAction from '../store/places.actions'

import { FlatList, Platform, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Nueva" 
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={() => navigation.push('Nuevo')}/>
                </HeaderButtons>
            )
        })
    }, [navigation])

    useEffect(() => {
        dispatch(addressAction.loadAddres())
    }, [])

    return (
       <FlatList 
            data={places}
            keyExtract={item => item.id}
            renderItem={itemData => (
                <PlaceItem 
                    image={itemData.item.image}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() =>{ navigation.navigate('Detalle', { 
                        placeTitle: itemData.item.title,
                        placeID: itemData.item.id
                    })}}
                />
            )}
       />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen

