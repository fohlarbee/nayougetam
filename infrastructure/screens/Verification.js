import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Text} from '@rneui/themed';
import { Screen } from '../components/Screen';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons'
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPInputView from '../components/OTPInputView';
import { SubmitButton } from '../components/SubmitButton';

import BottomCoponent from './BottomCoponent';
import { Theme } from '../Theme';


export default function Verification() {
    const [otpcode, setOtpCode] = useState([]);
    const[error, setError] = useState(false);

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const digits = '1234'

    const toggleBottomSheet = () => {
      setBottomSheetVisible(!isBottomSheetVisible);
    };
    const onClose = () => {
        setBottomSheetVisible(false);
    }
   
    
  return (
    <Screen>
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? '' : ''}

        >
            
            <Text h4 style={{marginTop:20, fontWeight:'bold', color:'rgba(44,2,4,1)'}}>Verification</Text>
            <View style={styles.wrapper}>
                <Icon name='message-text-lock' size={40} color='#fff' style={{fontWeight:'700'}}/>
            </View>
            <View style={{alignSelf:'center'}}>
                    <Text h4 style={{fontWeight:'bold',textAlign:'center'}}>Verification Code</Text>
                    <Text small style={{marginTop:5, textAlign:'center'}}>We have sent a 4 digit code verification to</Text>
                    <Text small style={{marginTop:5, textAlign:'center'}}>081********630</Text>

            </View>
            
            <View  style={{width:'80%', height:100, paddingHorizontal:32}}>
                <OTPInputView pinCount={4}

                onCodeChanged={(code) => {
                    otpcode.push(code)
                    if (otpcode.length > 1) {
                        setError(true)
                    }
                    if(otpcode.length === 4){
                        setError(false);
                    }else setError(false);
                }}
        
                autoFocusOnLoad={true}
                codeInputFieldStyle={{
                     width:50,
                     height:50,
                     color:'green',
                     borderWidth:2
                }}
                codeInputHighlightStyle={{
                    borderColor:'#8062D6',
                }}
                onCodeFilled={(code) =>{
                    if(code === digits){
                        toggleBottomSheet();
                    }if( code !== digits){
                        Alert.alert('Error', 'Verification failed, ask for a code resend')
                    };
                }}
                   
                />
             {error && 
             <Text style={{textAlign:'center', color:'red'}}>
                OTP must be a 4 digit number</Text>}
            
            </View>
            <SubmitButton
            onPress={() => {
                
            }}
             actionText='Verify' 
             color='#8062D6' 
             textColor='#fff'
             styling={{marginHorizontal:30, marginVertical:30}}
             />
                <Text onPress={()=> Alert.alert('Code sent')} small style={{color:Theme.colors.appBlue}}>Resend code</Text>
            
        </KeyboardAvoidingView>
        <BottomCoponent isBottomSheetVisible={isBottomSheetVisible} onClose={onClose}/>
       
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    wrapper :{
        padding:40,
        backgroundColor:'#8062D6',
        borderRadius:100,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOpacity:0.5,
        // elevation:'rgba(0,0,0,0.2)',
        shadowOffset:{ width:30},
        shadowRadius:1,
        marginVertical:40
        

    },
   
   
})