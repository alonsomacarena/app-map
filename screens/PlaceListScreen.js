import React, { useLayoutEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = ({ navigation }) => {
    const places = useSelector(state => state.places.places);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                   <Item
                        title="Nueva"
                        iconName="md-add"
                        onPress={() => navigation.navigate('Nuevo')}
                   />
               </HeaderButtons> 
            )
        })
    }, [navigation]);

    const renderItem = (data) => (
        <PlaceItem
            title={data.item.title}
            image={data.item.image}
            address="123 Street, City, Country"
            onSelect={() => navigation.navigate('Detalle')}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    )
}

export default PlaceListScreen
