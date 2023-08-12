import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AppFormField } from '../components/AppFormField';
import  Screen  from '../components/Screen';
import AppForm from '../components/AppForm';
import * as Yup from "yup";
import { SubmitButton } from '../components/SubmitButton';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { Theme } from '../Theme';
import { Text } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { CustomButton } from '../components/CustomButton';

const validationSchema = Yup.object().shape({
  username:Yup.string().required().min(5).label("Username"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.number().required().label("PhoneNumber"),
  password: Yup.string().required().min(6).label("Password")

})

export default function SignUp({navigation}) {
  
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
        <View style={{marginHorizontal:20, marginVertical:5}}>
          <Text h3 style={{fontWeight:'500', marginBottom:5, color:'#404040'}}>Register Account</Text>
          <Text style={{color:'rgba(0,0,0,0.3)', fontSize:10}}>Please register an account</Text>
        </View>
        <View>
          <AppForm 
          initialValues={{username:'', password:'', number:''}}
          validationSchema={validationSchema}

          >
            <Text h5 style={{ marginHorizontal:25, fontWeight:'300'}}>Username</Text>
            <AppFormField
            name='username'
            maxLength={20}
              placeholder='Create a username'
              icon='account-outline'
            />
            <Text h5 style={{ marginHorizontal:25, fontWeight:'300'}}>Mobile number</Text>

            <AppFormField
            keyboardType='numeric'
            maxLength={11}
            name='number'
            placeholder='Enter your number'
            icon='phone-outline'
            />
            <Text h5 style={{ marginHorizontal:25, fontWeight:'300'}}>Password</Text>
            <AppFormField
              name='password'
              maxLength={20}
              placeholder='Login with password'
              icon='lock-outline'
              secureTextEntry
              
            />
           
            <CustomButton 
            actionText='Sign Up' 
            textColor='#fff' 
            color={Theme.colors.appPurple} styling={{marginTop:20}}
            onPress={() => navigation.navigate('Verification')}
            />


          </AppForm>
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
  },
  
  alreadyHave:{
    textAlign:"center",
    marginTop:3,
    fontSize:12,
    color:Theme.colors.appPurple,
    marginHorizontal:7
  
  },
  
})