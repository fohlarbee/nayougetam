import { NavigationContainer } from '@react-navigation/native';
import {  StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { AuthNavigator } from './infrastructure/navigation/AuthNavigator';
import navigationTheme from './infrastructure/navigation/navigationTheme';
import AuthContext from './infrastructure/Globals/AppContext';
import AppNavigator from './infrastructure/navigation/AppNavigator';
import OfflineNotice from './infrastructure/components/OfflineNotice';
import storage from './infrastructure/auth/storage';
import * as SplashScreen from 'expo-splash-screen'




SplashScreen.preventAutoHideAsync();



export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [user, setUser] = useState(null);
  const [isReady,setIsReady] = useState(false);
  
  



  const restoreToken = async () => {
    const token = await storage.getToken();
    // if(token) console.log('This is token', token)
    if(!token) return;
    setUser(token);
    setUserLoggedIn(true);
  }

  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        await restoreToken();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
       SplashScreen.hideAsync();
      }
    }

    prepare();
    
  }, [restoreToken]);

  return (
   
    <>
      <OfflineNotice/>

      <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, user, setUser}}>
        <NavigationContainer theme={navigationTheme}>
            {/* <AppNavigator/> */}
          {user && userLoggedIn === true ? <AppNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    padding:20,
    paddingTop:70
  },
});
