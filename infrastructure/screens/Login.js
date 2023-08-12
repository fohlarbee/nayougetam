import {  Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {  useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as Yup from "yup";


import { AppFormField } from '../components/AppFormField';
import { SubmitButton } from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import storage from '../auth/storage';
import { Theme } from '../Theme';
import { Text } from '@rneui/themed';

import ForgetPassBottomSheet from '../components/ForgetPassBottomSheet';
import Screen from '../components/Screen';
import { CustomButton } from '../components/CustomButton';






const validationSchema = () => Yup.object().shape({
  number: Yup.number().required().label("PhoneNumber"),
  code: Yup.number().required().max(4).label("Code"),
  password: Yup.string().required().min(6).label("newPassword")
})

export default function Login({navigation}) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const onClose = () => {
      setBottomSheetVisible(false);
  }
 




  return (
    <Screen style={styles.areaView}>
      <ScrollView>
        <View style={{marginHorizontal:25, marginVertical:5}}>
          <Text h3 style={{fontWeight:'bold', marginBottom:10, color:'#404040'}}>Login Account</Text>
          <Text h5 style={{color:'rgba(0,0,0,0.3)', marginBottom:15}}>Please login with registered account</Text>
        </View>
        <View>
          <AppForm 
          initialValues={{number:'', newpassword:'', code:''}}
          validationSchema={validationSchema}

          >
            <Text h5 style={{ marginHorizontal:25, fontWeight:'500'}}>Mobile number</Text>
            <AppFormField
            name='number'
            keyboardType='numeric'
            maxLength={11}
              placeholder='Enter your number'
              icon='phone-outline'
            />
            <Text h5 style={{ marginHorizontal:25, fontWeight:'500'}}>Password</Text>
            <AppFormField
              name='password'
              placeholder='Login with password'
              icon='lock-outline'
              secureTextEntry
              
            />
            <TouchableOpacity>
              <Text onPress={toggleBottomSheet} style={{
                  textAlign:"right", 
                  marginRight:30, 
                  color:Theme.colors.appPurple, 
                  marginBottom:10, 
                  fontSize:15
                  }}>Forgot Password?
              </Text>

            </TouchableOpacity>
            
            <CustomButton styling={{fontWeight:'600'}} actionText='Sign In' textColor='#fff' color={Theme.colors.appPurple}/>


          </AppForm>
        </View>
        <Text h6 style={{fontWeight:'300', color:'rgba(0,0,0,0.3)', textAlign:'center', lineHeight:20, marginVertical:5}}>Or using other method</Text>
        <CustomButton 
        name='google' size={40} actionText='Sign in with Google' 
        color='rgba(0,0,0,0.07)' textColor='#404040' 
        styling={{marginBottom:10}}/>
        <View style={styles.noAccountContainer}>
            <Text>
              Don't have an account?
            </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.noAccount}>Sign up</Text>
              </TouchableOpacity>
          </View>

      </ScrollView>
      <ForgetPassBottomSheet isBottomSheetVisible={isBottomSheetVisible} onClose={onClose}/>
    </Screen>
  )
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    areaView:{
      backgroundColor:"#fff",
      flex:1,
      // marginTop:40
    },
    erroMessageStyle:{
      marginLeft:50,
    },
    noAccount: {
      color: Theme.colors.appPurple,
      marginLeft:10,
      fontSize:12,
      marginTop:2

    },
   
    noAccountContainer: {
      flexDirection:'row',
      justifyContent: "center",
    }
  });