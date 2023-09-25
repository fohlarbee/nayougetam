import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Switch } from '@rneui/themed'

export default function Security() {
    const [checked, setChecked] = useState(false)
    const toggleCheck = () => {
      setChecked(!checked)
    }
    
  return (
    <View style={styles.areaView}>
        <View style={styles.wrapper}>
            <Text style={{fontSize:15, marginTop:8, marginHorizontal:15}}>Face ID</Text>
            <Switch
             style={{marginRight:20}}
              value={checked}
              onValueChange={(value) => setChecked(value)}
             />
        </View>
        <View style={styles.wrapper}>
            <Text style={{fontSize:15, marginTop:8,  marginHorizontal:15}}>Remember password</Text>
            <Switch
             style={{marginRight:20}}
              value={checked}
              onValueChange={(value) => setChecked(value)}
             />
        </View>
        <View style={styles.wrapper}>
            <Text style={{fontSize:15, marginTop:8,  marginHorizontal:15 }}>Touch ID</Text>
            <Switch
            style={{marginRight:20}}
              value={checked}
              onValueChange={(value) => setChecked(value)}
             />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flexDirection:'row',
     justifyContent:'space-between', 
     marginHorizontal:2,
     borderWidth:0.3, 
     borderColor:'lightgrey',
     borderRadius:10,
     backgroundColor:'#fff',
     height:60,
     alignItems:'center',
  }
})