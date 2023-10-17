import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Account } from '../screens/Account';
import { ListingsScreens } from '../screens/ListingsScreens';
import { Messages } from '../screens/Messages';
import { MyListings } from '../screens/MyListings';
import ChangePassword from '../screens/ChangePassword';
import Security from '../screens/Security';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false, contentStyle:{borderTopWidth:0.7, borderColor:'lightgrey'}}}>
            <Stack.Screen name='Account' component={Account} options={{headerShown:true}}/>
            <Stack.Screen name='ListingsScreen' component={ListingsScreens}/>
            <Stack.Screen name='Messages' component={Messages}/>
            <Stack.Screen name='MyListings' component={MyListings}/>
            {/* <Stack.Screen name='ChangePass' component={ChangePassword}/> */}
            <Stack.Screen name='Security' component={Security} options={{headerShown:true}}/>
        </Stack.Navigator>
    )
}

export default AccountNavigator