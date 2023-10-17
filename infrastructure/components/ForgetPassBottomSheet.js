import {  ScrollView, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { Text, BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Octicons} from '@expo/vector-icons';

import * as Yup from'yup';
import { Formik } from 'formik';


import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useResetPassword } from '../hooks/useResetPassword';
import { useSendResetPasswordEmail } from '../hooks/useSendResetPasswordEmail';


import { CustomButton } from '../components/CustomButton'
import {AppTextComponents} from '../components/AppTextComponents';
import {ErrorMessage} from '../components/ErrorMessage'
import { Theme } from '../Theme';



const validationSchema = () => Yup.object().shape({
  // number: Yup.number().required().label("Mobile Number"),
  code: Yup.number().required().label("Code"),
  newPassword: Yup.string().required().label("Password"),
})
const validationSchema1 = () => Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
})

export default function ForgetPassBottomSheet({isBottomSheetVisible, onClose}) {
  const [email, setEmail] = useState('')
  const {resetPassword, error,isLoading} = useResetPassword()
  const {sendResetPasswordEmail, isError, isLoadingg} = useSendResetPasswordEmail()



  const handleSendResetEmail = async(values) => {
    await sendResetPasswordEmail(values.email)
    setEmail(values.email)

  }

  const handlePasswordReset = async (email, values) =>{
    await resetPassword(email, values.code, values.newPassword)
    alert(values.newPassword)
  } 
 
  return (
    <NativeViewGestureHandler>
      <KeyboardAvoidingView focusable enabled >
         <SafeAreaProvider>
        <BottomSheet isVisible={isBottomSheetVisible} containerStyle={{height:'100%'}}
        
          
         
        >
            <ScrollView style={styles.contentHolder}>
              <View style={{flexDirection:'row', justifyContent:'center', flex:1, justifyContent:'space-around'}}>
                <View/>
                <Octicons name='dash' color='rgba(0,0,0,0.5)' size={55} style={{alignSelf:'center'}}/>
                <Octicons name='x' color='rgba(0,0,0,0.2)' onPress={onClose} size={30} style={{ marginVertical:12, left:30 }}/>
              </View>
              
              <View style={{marginHorizontal:15}}>
                <Text style={{fontWeight:"300", color:'#404040', fontSize:20}}>Create new password</Text>
                <Text style={{fontWeight:"300", fontSize:8, marginVertical:5}}>Enter verification code and new password</Text>
              </View>
              <Formik
               initialValues={{email:''}}
               validationSchema={validationSchema1}
               onSubmit={async(values) => await handleSendResetEmail(values)}
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
                  {isError && <Text style={styles.errorMessageStyle}>{isError}</Text>}
                  <TouchableOpacity onPress={handleSubmit} disabled={isLoadingg}> 
                      <Text style={styles.sendCode}>Send code</Text>
                  </TouchableOpacity>

                  </>
                )}

              </Formik>
              <Formik
            initialValues={{ code: '', newPassword:''}}
            validationSchema={validationSchema}
            onSubmit={async(values) => await handlePasswordReset(email, values)}

            >
              {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                <>

                <AppTextComponents
                placeholder='4-digit code'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='numeric'
                maxLength={4}
                onBlur={() => setFieldTouched('code')}
                onChangeText={ handleChange("code") }
                icon='message-lock-outline'
                textContentType='number'
                />
              <ErrorMessage style={styles.errorMessageStyle} error={errors.code} visible={touched.code}
                />
                <AppTextComponents
                placeholder='New password'
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={() => setFieldTouched('newPassword')}
                onChangeText={handleChange("newPassword")}
                icon='lock-outline'
                textContentType='password'
                />
              <ErrorMessage style={styles.errorMessageStyle} error={errors.newPassword} visible={touched.newPassword}
                />
                {error && <Text style={styles.errorMessageStyle}>{error}</Text>}



                <CustomButton 
                actionText='Change password' 
                color={Theme.colors.appPurple} 
                textColor='#fff'
                onPress={handleSubmit}
                disabled={isLoading}
                styling={{marginVertical:20}}
                />

                </>
              )}
            </Formik>
            </ScrollView>


        </BottomSheet>
    </SafeAreaProvider>
    </KeyboardAvoidingView>

    </NativeViewGestureHandler>
    
   
    
  )
}

const styles = StyleSheet.create({
    contentHolder:{
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:'#fff',
        flex:1,
        maxHeight:'100%'
    },
    sendCode:{
      fontSize:10,
      fontWeight:'500',
      color:Theme.colors.appPurple,
      textAlign:'right',
      marginHorizontal:30
    
    },
    errorMessageStyle:{
      color:Theme.colors.danger,
      fontSize:12,
      marginHorizontal:30
  
  }
})