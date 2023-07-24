import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as Yup from "yup";


import { AppText } from '../components/AppText';  
import { AppFormField } from '../components/AppFormField';
import { SubmitButton } from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import { Screen } from '../components/Screen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebaseConfig';
import AuthContext from '../Globals/AppContext';
import ActivityIndicator from '../components/ActivityIndicator';
import storage from '../auth/storage';
import { Theme } from '../Theme';
import LottieView from 'lottie-react-native';






const validationSchema = () => Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password")
})

export function Login({navigation}) {
  const {setUserLoggedIn, setUser} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const loginUser = (values) => {
    try {
      // setVisible(true);
      signInWithEmailAndPassword(authentication, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user
          setUser(user);
          setUserLoggedIn(true);
          storage.storeToken(user);
          setVisible(false);
        })      
        .catch(() => {
          Alert.alert('Invalid Credentials')
          setVisible(false);
        })
    } catch (error) {
      setVisible(false);


    }
  }


  return (
    <Screen style={styles.areaView}>
      <ActivityIndicator visible={visible}/>
        <ScrollView>
                {/* <View style={{width:121, height:121,alignSelf:"center", marginTop:70, borderRadius:20 }}
                >
                  <LottieView
                    source={require('../../assets/animation/buyit.json')}
                    loop
                    autoPlay
                    style={{width:100, height:100, alignSelf:'center'}}
                  />
                </View> */}
                <Text style={styles.subText}>Home for your needs</Text>
                <View style={styles.loginFormHolder}>
                    <View>
                      <Text style={styles.headText}>Hi, Welcome Back</Text>
                    </View>
                    <AppForm
                    initialValues={{email:"", password:""}}
                    onSubmit={(values) => {
                      setTimeout(() => {
                        loginUser(values)
                      }, 3000);
                    }}
                    validationSchema={validationSchema}
                    >
                          <View>
                                <AppFormField 
                               name="email"
                               placeholder="Email"
                               icon="email"
                                />
                                <AppFormField 
                                placeHolder="Enter Password" 
                                placeholder="Password"
                                name="password"
                                secureTextEntry
                                />
                            </View>
                            
                            <Text style={{
                              textAlign:"right", 
                              marginRight:0, 
                              color:Theme.colors.danger, 
                              marginTop:5, 
                              fontSize:15
                              }}>Forgot Password?
                              </Text>
                              <SubmitButton actionText="LOGIN" 
                              />
                              <TouchableOpacity>
                                <AppText stylesLing={styles.dontHave} style={styles.dontHave} onPress={() => navigation.navigate("Signup")} inputText="Don't have an account? Sign Up"/>
                              </TouchableOpacity>   
                    </AppForm>
                    

                </View>
                

        </ScrollView>
    </Screen>
  )
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    areaView:{
      backgroundColor:"#1877F2",

    },
    container:{
        flex:1,
    },
    loginFormHolder:{
      flex:1,
      width:width,
      bottom:0,
      backgroundColor:"#eee",
      alignSelf:"center",
      marginTop:120,
      borderTopLeftRadius:56,
      borderTopRightRadius:56
      
    },
    headText:{
      alignSelf:"center",
      marginTop:20,
      fontSize:35
    },
    dontHave:{
      textAlign:"center",
      marginTop:15,
      fontSize:20,
      marginBottom:15,
      color:"#160062"
    },
    erroMessageStyle:{
      marginLeft:50,
    },
    subText:{
      color:Theme.colors.white,
      textAlign:'center',
      top:0,
      letterSpacing:6
    }
})