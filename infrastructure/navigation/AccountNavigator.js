import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Account } from '../screens/Account';
import { ListingsScreens } from '../screens/ListingsScreens';
import { Messages } from '../screens/Messages';
import { MyListings } from '../screens/MyListings';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Accounts' component={Account}/>
            <Stack.Screen name='ListingsScreen' component={ListingsScreens}/>
            <Stack.Screen name='Messages' component={Messages}/>
            <Stack.Screen name='MyListings' component={MyListings}/>
        </Stack.Navigator>
    )
}

export default AccountNavigator