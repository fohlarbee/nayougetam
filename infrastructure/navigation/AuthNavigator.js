import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  Login  from "../screens/Login";
import SignUp from '../screens/Signup'
import Verification from '../screens/Verification'


const Stack = createNativeStackNavigator();


export const AuthNavigator = () => (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen  name='Verification' component={Verification} />

        </Stack.Navigator>
    )
