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
import Notifocations from '../screens/Notifocations';
import Marketplace from '../screens/Marketplace';

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
                headerShown:true,
                headerTitle:'Feed',
                headerShown:true,
                headerStyle:{},
                headerTitleContainerStyle:{jsutifyContent:'center', alignSelf:'center'},
                
                    tabBarIcon:({size, color}) => 
                    <MaterialCommunityIcons name='home' size={size} color={color}/>
                
            }}
            />
            <Tab.Screen name='Market place' 
            component={Marketplace} 
            options={{
                headerShown:true,
                tabBarIcon:({size, color}) => <MaterialCommunityIcons name='salesforce' size={size} color={color}/>,
            }}
            />

            <Tab.Screen 
            name="Notification" 
            component={Notifocations}
            options={ ({navigation}) => ({
                headerShown:true,

                // tabBarButton:() => <TabButton onPress={() => navigation.navigate('New Listing')}/>,
                
                tabBarIcon:({size, color}) => 
                <MaterialCommunityIcons name='bell-badge' size={size} color={color}/>
            
        })}
            />

            <Tab.Screen 
            name="Accounts" 
            component={AccountNavigator}
            options={{
                headerShown:false,
                tabBarIcon:({size, color}) => 
                <MaterialCommunityIcons name='account' size={size} color={color}/>
            
        }}
            />
        </Tab.Navigator>
    )
}
export default AppNavigator;
