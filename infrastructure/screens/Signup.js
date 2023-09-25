import { Dimensions, ScrollView, StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import  Screen  from '../components/Screen';
import * as Yup from "yup";
import { ErrorMessage } from '../components/ErrorMessage';
import { AppTextComponents } from '../components/AppTextComponents';
import { SubmitButton } from '../components/SubmitButton';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { Theme } from '../Theme';
import { Text } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { Formik, useFormikContext } from 'formik';
import { useSignup } from '../hooks/useSignup';



const validationSchema = Yup.object().shape({
  username:Yup.string().required().min(5).label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password")

})

export default function SignUp({navigation}) {
  
    const [successfulSwitch, setSuccessfulSwitch] = useState(false);
    const [visible, setVisible] = useState(false);
    const {signup, isLoading, error} = useSignup()

   

    const handleSignup = async(values) => {
      try {
         await signup(values.username, values.email, values.password) 
      } catch (error) {
        throw Error(error.message)
      }
      
    }

  

  return (
    <Screen style={styles.areaView}>
      <ScrollView>
        <View style={{marginHorizontal:20, marginVertical:5}}>
          <Text h3 style={{fontWeight:'500', marginBottom:5, color:'#404040'}}>Register Account</Text>
          <Text style={{color:'rgba(0,0,0,0.3)', fontSize:10}}>Please register an account</Text>
        </View>
        <View>
          <Formik
          initialValues={{username:'', email:'', password:''}}
          validationSchema={validationSchema}
          onSubmit={async(values) => await handleSignup(values)}

          >
            {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
              <>
              <AppTextComponents
              placeholder='Create a username'
              autoCapitalize='none'
              autoCorrect={false}
              onBlur={() => setFieldTouched('username')}
              onChangeText={handleChange("username")}
              icon='account-outline'
              // value={values[name]}
              // width={width}
              />
             <ErrorMessage style={styles.errorMessageStyle} error={errors.username}  visible={touched.username}/>

              <AppTextComponents
              placeholder=' Enter your email address'
              autoCapitalize='none'
              autoCorrect={false}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange("email")}
              icon='email-outline'
              textContentType='emailAddress'

              // value={values[name]}
              // width={width}
              />
             <ErrorMessage style={styles.errorMessageStyle} error={errors.email} visible={touched.email} />


              <AppTextComponents
              placeholder='Create password'
              autoCapitalize='none'
              autoCorrect={false}
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange("password")}
              icon='lock-outline'
              textContentType='password'
              secureTextEntry
              // value={values[name]}
              // width={width}
              />
             <ErrorMessage style={styles.errorMessageStyle} error={errors.password} visible={touched.password}
              />
              {error && <Text style={{fontSize:9, textAlign:'center', color:Theme.colors.danger, marginBottom:6}}>{error}</Text>}



              <CustomButton 
              actionText='Sign up' 
              color={Theme.colors.appPurple} 
              textColor='#fff'
              onPress={handleSubmit}
              disabled={isLoading}
              />

              </>
            )}
          </Formik>
          {/* <AppForm 
          initialValues={{username:'', email:'', password:''}}
          validationSchema={validationSchema}
          onSubmit={ (values) => {
          // handleSubmit()
            Alert.alert(values)}

          }

          >
            <AppFormField
            name='username'
            maxLength={20}
              placeholder='Create a username'
              icon='account-outline'
            />

            <AppFormField
            keyboardType='email-address'
            // maxLength={11}
            name='email'
            placeholder='Enter your email address'
            icon='email-outline'
            />
            <AppFormField
              name='password'
              maxLength={20}
              placeholder='Create password'
              icon='lock-outline'
              secureTextEntry
              
            />
            {error && <Text>{error}</Text>}
           
            <SubmitButton
            actionText='Sign Up' 
            textColor='#fff' 
            color={Theme.colors.appPurple} styling={{marginTop:20}}
            // onPress={() => navigation.navigate('Verification')}
            // onPress={handleSubmit}
            disabled={isLoading}
            
            />


          </AppForm> */}
        </View>
        <Text h6 style={{fontWeight:'300', color:'rgba(0,0,0,0.3)', textAlign:'center', lineHeight:20, marginVertical:5}}>Or using other method</Text>
        <CustomButton  name='google' size={40} textColor='#404040' actionText='Sign in with Google' color='rgba(0,0,0,0.07)' styling={{marginBottom:10}}/>
        <View style={{flexDirection:'row', alignSelf:'center'}}>
          <Text >Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.alreadyHave}>Sign In</Text>
              </TouchableOpacity>
        </View>
          

      </ScrollView>
     
    </Screen>
   
  )
}
const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  areaView:{
    flex:1,
    backgroundColor:'#fff',
    marginTop:"15%"
  },
  
  alreadyHave:{
    textAlign:"center",
    marginTop:3,
    fontSize:12,
    color:Theme.colors.appPurple,
    marginHorizontal:7
  
  },
  errorMessageStyle:{
    color:Theme.colors.danger,
    fontSize:8,
    marginHorizontal:30

}
  
})