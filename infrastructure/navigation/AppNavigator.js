import React, { useEffect,useContext } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {MaterialCommunityIcons} from '@expo/vector-icons';

import { ListingEditScreen } from "../screens/ListingEditScreen";
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import { Theme } from '../Theme';
import { TabButton } from './TabButton';
import * as Notifications from 'expo-notifications'
import { doc, updateDoc } from 'firebase/firestore';
import { authentication, db } from '../firebase/firebaseConfig';


const Tab = createBottomTabNavigator();
const AppNavigator = () => {
    const user = authentication?.currentUser?.uid


    useEffect(() => {
        registerPushNoft();
    },[])
    const registerPushNoft = async () =>{
        try {
            const permission = await Notifications.getPermissionsAsync();
            if(!permission.granted) return;
            const token = await Notifications.getExpoPushTokenAsync();
            if(!token) return;
            updateDoc(doc(db, 'users', user),{
                expoPushToken:token
            });
        } catch (error) {
            console.log(error.message);
        }
        
    }
    return (
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen 
            name="Feed" 
            component={FeedNavigator}
            options={{
                // headerShown:true,
                
                    tabBarIcon:({size, color}) => 
                    <MaterialCommunityIcons name='home' size={size} color={Theme.colors.appBlue}/>
                
            }}
            />
            <Tab.Screen 
            name="New Listing" 
            component={ListingEditScreen}
            options={ ({navigation}) => ({
                headerShown:true,
                tabBarButton:() => <TabButton onPress={() => navigation.navigate('New Listing')}/>,
                
                tabBarIcon:({size, color}) => 
                <MaterialCommunityIcons name='plus-circle' size={size} color={Theme.colors.appBlue}/>
            
        })}
            />
            <Tab.Screen 
            name="AccountNav" 
            component={AccountNavigator}
            options={{
                
                tabBarIcon:({size, color}) => 
                <MaterialCommunityIcons name='account' size={size} color={Theme.colors.appBlue}/>
            
        }}
            />
        </Tab.Navigator>
    )
}
export default AppNavigator;
