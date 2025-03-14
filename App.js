import { NavigationContainer } from '@react-navigation/native';
import {  StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';


import navigationTheme from './infrastructure/navigation/navigationTheme';
import AppContext from './infrastructure/Globals/AppContext';
import {AuthContextProvider} from './infrastructure/Globals/AuthContext'
import AppNavigator from './infrastructure/navigation/AppNavigator';
import Onboarding  from './infrastructure/screens/Onboarding';
import OfflineNotice from './infrastructure/components/OfflineNotice';
import storage from './infrastructure/auth/storage';
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigator } from './infrastructure/navigation/AuthNavigator';


// SplashScreen.preventAutoHideAsync();



export default function App() {

  const Loading = () => {
    return <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
      <ActivityIndicator size='large' style={{alignSelf:'center'}}/>
    </View>
  }

  const checkOnboarding = async() => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if(value !== null)
        setViewedOnboarding(true);
    } catch (error) {
          console.log('Error @getiewedOnboarding', error)
      
    }finally{
      setLoading(false);
    }
  }
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isReady,setIsReady] = useState(false);
  
  
  const restoreToken = async () => {
    const token = await storage.getToken();
    if(!token) return;
    setUser(token);
    setUserLoggedIn(true);
  }
  useEffect(() => {
    checkOnboarding();
  },[])

  
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Pre-load fonts, make any API calls you need to do here
  //       // await Font.loadAsync(Entypo.font);
  //       await restoreToken();
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setIsReady(true);
  //      SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
    
  // }, [restoreToken]);

  return (
    <AuthContextProvider>
       <AppContext.Provider value={{setViewedOnboarding, user, setUser, setUserLoggedIn}}>
          <NavigationContainer theme={navigationTheme}>
            {/* <AuthNavigator/> */}
              {/* {loading ? <Loading/> : viewedOnboarding ? <AuthNavigator/> : user ? <AppNavigator/> : <Onboarding/>} */}
              {/* {user ? <AppNavigator/> : null} */}
              {user ? <AppNavigator/> : viewedOnboarding ? <AuthNavigator/>  : loading ? <Loading/> : <Onboarding/>}
         </NavigationContainer>

       </AppContext.Provider>
    </AuthContextProvider>
    
   
   
    
    // <>
    //   <OfflineNotice/>

    //   <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, user, setUser}}>
    //     <NavigationContainer theme={navigationTheme}>
    //       {loading ? <Loading/> : viewedOnboarding ? <AppNavigator/> : <Onboarding/>}
        // </NavigationContainer>
    //   </AuthContext.Provider>
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    padding:20,
    paddingTop:70
  },
  temp:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
