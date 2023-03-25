import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../screens/Welcome";
import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";


const Stack = createNativeStackNavigator();


export const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="welcome" screenOptions={{headerShown:false}}>
            <Stack.Screen name="welcome" component={Welcome}/>
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="Login" component={Login}/>

        </Stack.Navigator>
    )
}