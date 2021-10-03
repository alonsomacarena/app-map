/*import * as FileSystem from 'expo-file-system';

import { fetchAddresses, insertAddress } from '../db';

import {MAP} from "../constants";

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACES = 'LOAD_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${MAP.API_KEY}
        `)
        
        if(!response.ok) throw new Error("[RESPONSE] Algo malo ha sucedido")

        const resData = await response.json()
        if(!resData.results) throw new Error("[GEOCODE] Algo malo ha sucedido ")

        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName;

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path,
            })

            const result = await insertAddress(
                title,
                Path,
                address,
                location.lat,
                location.lng
            );

                console.log(result)

            dispatch({
                type: ADD_PLACE,
                payload: {
                    id: result.insertId,
                    title,
                    image: Path,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log(err.message);
            throw err;
        }

        
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await fetchAddresses();
            console.log(result)
            dispatch({ type: LOAD_PLACES, places: result.rows._array })
        } catch (error) {
            throw error;
        }
    }
}*/

import * as FileSystem from 'expo-file-system'

import { fetchAddress, insertAddress } from '../db'

import { MAP } from '../constants'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'


export const addPlace = (title, image, location) => {
    return async dispatch => {
        const response = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`)

        if(!response.ok) throw new Error('[RESPONSE] Algo malo ha sucedido')
        
        const resData = await response.json()
        if(!resData.results) throw new Error('[GEOCODE] Algo malo ha sucedido')

        const address = resData.results[0].formatted_address
        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path
            })

            const result = await insertAddress(
                title, 
                Path, 
                address, 
                location.lat, 
                location.lng )
            
                console.log(result)
            dispatch({ type: ADD_PLACE, payload: {
                    id: result.insertId, 
                    title, 
                    image: Path, 
                    address: address, 
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }}})
        } catch (err) {
            console.log(err.message)
            throw err
        }   
    }
}

export const loadAddres = () => {
    return async dispatch => {
        try {
            const result = await fetchAddress()
            dispatch({ type: LOAD_PLACES, places: result.rows._array})
        } catch (error) {
            throw error
        }
    }
}