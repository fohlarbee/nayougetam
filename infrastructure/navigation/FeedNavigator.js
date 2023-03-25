import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListingsScreens } from '../screens/ListingsScreens';
import { ListingDetailsScreen } from '../screens/ListingDetailsScreen';

const Feed = createNativeStackNavigator();

const FeedNavigator = () => {
    return (
        <Feed.Navigator mode='modal' screenOptions={{headerShown:false}}>
            <Feed.Screen name='ListingsScreens' component={ListingsScreens}/>
            <Feed.Screen name='ListingDetails' component={ListingDetailsScreen}/>
        </Feed.Navigator>
    )
}

export default FeedNavigator;