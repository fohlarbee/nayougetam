import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Octicons} from '@expo/vector-icons'
import * as Yup from'yup';
import AppForm from './AppForm';
import { AppFormField } from './AppFormField';
import { SubmitButton } from './SubmitButton';
import { Theme } from '../Theme';
import { KeyboardAvoidingView } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import gestureHandlerRootHOC from 'react-native-gesture-handler';

export default function ForgetPassBottomSheet({isBottomSheetVisible, onClose}) {
  const validationSchema = () => Yup.object().shape({
    number: Yup.number().required().label("Phone Number"),
  })
  return (
    <NativeViewGestureHandler>
      <KeyboardAvoidingView focusable enabled >
         <SafeAreaProvider>
        <BottomSheet isVisible={isBottomSheetVisible} containerStyle={{height:'100%'}}
          
         
        >
            <ScrollView style={styles.contentHolder}>
              <View style={{flexDirection:'row', justifyContent:'center', flex:1}}>
                <Octicons name='dash' color='rgba(0,0,0,0.5)' size={55} style={{alignSelf:'center'}}/>
                <Octicons name='x' color='rgba(0,0,0,0.2)' onPress={onClose} size={30} style={{left:150, marginVertical:12 }}/>
              </View>
              
              <View style={{marginHorizontal:15}}>
                <Text h4 style={{fontWeight:"500", color:'#404040'}}>Create new password</Text>
                <Text style={{fontWeight:"300", fontSize:10}}>Enter verification code and new password</Text>
                <Text h5 style={{fontWeight:"500", marginTop:25, marginHorizontal:5, color:'#404040'}}>Confirm Mobile mumber</Text>
              </View>
                <AppForm
                  validationSchema={validationSchema}
                  initialValues={{number:'', code:'', newPassword:''}}
                >
                    <AppFormField 
                    name='number' 
                    placeholder='Mobile number'
                    maxLength={11}
                    keyboardType='numeric'
                    icon='phone-outline'
                    />
                    <TouchableOpacity onPress={() => Alert.alert('Verification code sent to 081*****630')}>
                      <Text style={{
                        textAlign:"right", 
                        marginRight:30, 
                        color:Theme.colors.appBlueV2,
                        fontSize:12
                        }}>Send code
                      </Text>
                  </TouchableOpacity>
                  <Text h5 style={{fontWeight:"500", marginHorizontal:25, color:'#404040'}}>Enter code</Text>

                    <AppFormField 
                    name='number' 
                    placeholder='Enter 4 digit code'
                    keyboardType='numeric'
                    icon='message-text-lock-outline'
                    />
                   
                     
                    <Text h5 style={{fontWeight:"500", marginLeft:25, color:'#404040'}}>New password</Text>

                     <AppFormField 
                    name='new password' 
                    placeholder='Create new passoword'
                    icon='lock-outline'
                    secureTextEntry
                    />

                    <SubmitButton 
                    onPress={() => 
                      {
                        try {
                          Alert.alert('Passward has been reset, continue to login')

                        } catch (error) {
                          Alert('Error while  creating new password', error)
                        }finally{
                          onClose()
                        }
                        
                      }}
                    actionText='Create Password'
                    color={Theme.colors.appBlue}
                    textColor='#fff'
                    styling={{marginVertical:25}}
                  

                    />
            
                </AppForm>
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
})