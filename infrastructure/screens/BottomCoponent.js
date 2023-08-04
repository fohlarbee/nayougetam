import { StyleSheet, View,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheet } from '@rneui/themed'
import {Octicons} from '@expo/vector-icons'
import { Text } from '@rneui/themed'
import { SubmitButton } from '../components/SubmitButton'
import { Theme } from '../Theme'


export default function BottomCoponent({isBottomSheetVisible, onClose}) {
  return (
    <View style={{justifyContent:'center'}}>
        <SafeAreaProvider>
            <BottomSheet
            backdropStyle={{ }}
                isVisible={isBottomSheetVisible}
                containerStyle={{ height:'100%' }}
            >
                <View style={styles.contentHolder}>
                    <Octicons name='dash' color='rgba(0,0,0,0.5)' size={55} style={{alignSelf:'center'}}/>
                
                     <View style={styles.wrapper}>
                     <Octicons name="check-circle-fill" size={50} color="#fff" style={{alignSelf:'center', marginTop:32}} />
                     </View>
                
                    
                   
                   <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text h4 style={{fontWeight:'bold'}}>Register Successful</Text>
                        <Text h6 style={{marginTop:5, color:'rgba(0,0,0,0.5)'}}>Congratulations your account already created</Text>
                        <Text h6 style={{color:'rgba(0,0,0,0.5)'}}>Please login to get amazing experience</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text>Close BottomSheet</Text>
                        </TouchableOpacity>
                   </View>
                   <SubmitButton actionText='Go to Hompage' color={Theme.colors.appBlue} textColor='#fff' styling={{marginVertical:25}}/>
                   
                </View>
            </BottomSheet>
        
        </SafeAreaProvider>
    </View>

  )
}

const styles = StyleSheet.create({
    contentHolder:{
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:'#fff',
        flex:1
    },
    wrapper :{
        backgroundColor:'#82CD47',
        borderRadius:100,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOpacity:0.5,
        elevation:'rgba(0,0,0,0.2)',
        shadowOffset:{ width:30},
        shadowRadius:1,
        marginVertical:40,
        width:120,
        height:120,
        alignSelf:'center'

    },
})