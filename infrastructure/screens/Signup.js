import { Alert, Dimensions, ScrollView, StyleSheet, Text } from 'react-native'
import React, { useState, useContext } from 'react'
import { AppFormField } from '../components/AppFormField';
import { Screen } from '../components/Screen';
import AppForm from '../components/AppForm';
import * as Yup from "yup";
import { SubmitButton } from '../components/SubmitButton';
import { SignUpSuccesful } from '../components/SignUpSuccesful';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import ActivityIndicator from '../components/ActivityIndicator';






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
      setVisible(true);
      const userDetails = {
        email: values.email,
        expoPushToken:'',
        password:values.password,
        avatar:'',
        username:values.username,
        number:values.number,

      }
      try {
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
            navigation.goBack('welcome')
        }, 4000);
      })
      } catch (error) {
        setVisible(false);
        console.log(error);
        Alert.alert('Error', error.message)
      }
      
   }

   
    

  return (
    <Screen>
      <ActivityIndicator visible={visible}/>
      <ScrollView>
         <Text style={styles.headerText}>Create an account</Text>
         <Text style={styles.headerLilText}>Sell and buy Products anywhere around Jos</Text>


         <AppForm

            initialValues={{
              username:"",
              email:"",
              number:"",
              password:""
            }}
            onSubmit={(values) => {
              // setUserDocs(values)
              setTimeout(() => {
                registerUser(values)
              }, 3000);

          }
            }
            validationSchema={validationSchema}
            >
              <AppFormField maxLength={255} name="username" placeholder="Username" icon="account-plus"/>
              <AppFormField
                  keyboardType="email"
                  name="email"
                  placeholder="Email"
                  icon="email"
              />
              <AppFormField name="number" icon="phone" maxLength={11} keyboardType="numeric" placeholder="Phone number"/>
              <AppFormField name="password" maxLength={15} placeholder="Password" secureTextEntry/>
              <SubmitButton actionText="Sign Up"/>
              <Text style={styles.alreadyHave}>Already have an account? <Text onPress={() => navigation.navigate("Login")}>Sign In</Text></Text>


            </AppForm>
            <SignUpSuccesful successfulSwitch={successfulSwitch}/>
            </ScrollView>
    </Screen>
   
  )
}
const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  areaView:{
    flex:1,
  },
  container:{
    flex:1,
    backgroundColor:"#fff",
    height:height
  },
  headerText:{
    fontSize:30,
    alignSelf:"center",
    marginTop:40,
    fontWeight:"bold",
    letterSpacing:6,
  },
  headerLilText:{
    alignSelf:"center",
    marginTop:1,
    fontStyle:"Poppins",
  },
  alreadyHave:{
    textAlign:"center",
    marginTop:15,
    fontSize:20,
    marginBottom:15,
    color:"#160062"
  
  },
  alreadyHave:{
    textAlign:"center",
    marginTop:15,
    fontSize:20,
    marginBottom:15,
    color:"#160062"
  
  }
})