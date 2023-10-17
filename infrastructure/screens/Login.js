import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {  useState } from 'react'
import * as Yup from "yup";
import { Formik } from 'formik';


import { Theme } from '../Theme';
import { Text } from '@rneui/themed';

import ForgetPassBottomSheet from '../components/ForgetPassBottomSheet';
import Screen from '../components/Screen';
import { CustomButton } from '../components/CustomButton';
import { useLogin } from '../hooks/useLogin';
import { AppTextComponents } from '../components/AppTextComponents';
import { ErrorMessage } from '../components/ErrorMessage';







const validationSchema = () => Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  // number: Yup.number().required().label("PhoneNumber"),
  password: Yup.string().required().min(6).label("Password")
})

export default function Login({navigation}) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {login, error, isLoading} = useLogin()

  const handleLogin = async(values) => {
    await login(values.email, values.password);
  }

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
          <Formik
            initialValues={{email:'', password:''}}
            validationSchema={validationSchema}
            onSubmit={async(values) => await handleLogin(values)}

            >
              {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                <>

                <AppTextComponents
                placeholder='Email address'
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange("email")}
                icon='email-outline'
                textContentType='emailAddress'
                />
              <ErrorMessage style={styles.errorMessageStyle} error={errors.email} visible={touched.email} />


                <AppTextComponents
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange("password")}
                icon='lock-outline'
                textContentType='password'
                secureTextEntry
                />
              <ErrorMessage style={styles.errorMessageStyle} error={errors.password} visible={touched.password}
                />
                {error && <Text style={styles.errorMessageStyle}>{error}</Text>}



                <CustomButton 
                actionText='Login' 
                color={Theme.colors.appPurple} 
                textColor='#fff'
                onPress={handleSubmit}
                disabled={isLoading}
                />

                </>
              )}
            </Formik>
            
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
      marginTop:'15%'
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
    },
    errorMessageStyle:{
      color:Theme.colors.danger,
      fontSize:12,
      marginHorizontal:30
  
  }
  });