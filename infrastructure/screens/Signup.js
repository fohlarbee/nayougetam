import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AppFormField } from '../components/AppFormField';
import { Screen } from '../components/Screen';
import AppForm from '../components/AppForm';
import * as Yup from "yup";
import { SubmitButton } from '../components/SubmitButton';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { Theme } from '../Theme';
import { Text } from '@rneui/themed';

const validationSchema = Yup.object().shape({
  username:Yup.string().required().min(5).label("Username"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.number().required().label("PhoneNumber"),
  password: Yup.string().required().min(6).label("Password")

})

export function Signup({navigation}) {
  
    const [successfulSwitch, setSuccessfulSwitch] = useState(false);
    const [visible, setVisible] = useState(false);

    const registerUser = (values) => {
     
      try {
       setVisible(true);
       const userDetails = {
        email: values.email,
        expoPushToken:'',
        password:values.password,
        avatar:'',
        username:values.username,
        number:values.number,

        }

        createUserWithEmailAndPassword(authentication, values.email, values.password)
      .then(() => {
        onAuthStateChanged(authentication, (user) => {
        let userUid = user.uid
        setDoc(doc(db,'users',userUid),userDetails)

        })
      })
      .then(() => {
        setVisible(false);
              setSuccessfulSwitch(true)
      })
      .then(() => {
        setTimeout(() => {
            navigation.goBack('Login')
        }, 4000);
      })
      } catch (error) {
        setVisible(false);
        console.log(error);
        Alert.alert('Error', error.message)
      }
      
   }

   
    

  return (
    <Screen style={styles.areaView}>
      <ScrollView>
        <View style={{marginHorizontal:25, marginVertical:5}}>
          <Text h3 style={{fontWeight:'bold', marginBottom:10}}>Register Account</Text>
          <Text h5 style={{color:'rgba(0,0,0,0.3)'}}>Please register an account</Text>
        </View>
        <View>
          <AppForm 
          initialValues={{username:'', password:'', number:''}}
          validationSchema={validationSchema}

          >
            <Text h5 style={{ marginHorizontal:25, fontWeight:'500'}}>Username</Text>
            <AppFormField
            name='username'
            maxLength={20}
              placeholder='Create a username'
              icon='account-outline'
            />
            <Text h5 style={{ marginHorizontal:25, fontWeight:'500'}}>Mobile number</Text>

            <AppFormField
            keyboardType='numeric'
            maxLength={11}
            name='number'
            placeholder='Enter your number'
            icon='phone-outline'
            />
            <Text h5 style={{ marginHorizontal:25, fontWeight:'500'}}>Password</Text>
            <AppFormField
              name='password'
              maxLength={20}
              placeholder='Login with password'
              icon='lock-outline'
              secureTextEntry
              
            />
           
            <SubmitButton actionText='Sign In' textColor='#fff' color='#0e64d2' styling={{marginTop:20}}/>


          </AppForm>
        </View>
        <Text h6 style={{fontWeight:'300', color:'rgba(0,0,0,0.3)', textAlign:'center', lineHeight:20, marginVertical:5}}>Or using other method</Text>
        <SubmitButton  name='google' size={40} actionText='Sign in with Google' color='rgba(0,0,0,0.07)' styling={{marginBottom:10}}/>
        <SubmitButton name='facebook' size={40} iconColor={Theme.colors.appBlue} actionText='Sign in with Facebook' />
        <Text style={styles.alreadyHave}>Already have an account? <Text onPress={() => navigation.navigate("Login")}>Sign In</Text></Text>

      </ScrollView>
     
    </Screen>
   
  )
}
const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  areaView:{
    flex:1,
    backgroundColor:'#fff'
  },
  
  alreadyHave:{
    textAlign:"center",
    marginTop:15,
    fontSize:8,
    marginBottom:15,
    color:"#160062"
  
  },
  
})