import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Theme } from '../Theme';
import { Platform } from 'react-native';
import { AppText } from './AppText';
import { Screen } from './Screen';
import { PickerItem } from './PickerItem';

const categories = [
    {label:"Funiture", value:1},
    {label:"Clothings", value:2},
    {label:"Bicycles", value:3},
]
export function AppPicker({icon, numberOfColumns = 1, PickerItemComponent = PickerItem, width = "100%", placeholder, item, items, selectedItem, onSelectItem}) {
    const [modalVisivle, setModalVisible] = useState(false);
  return (
    <>
    <View>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={[styles.container, {width}]}>
                {icon && <MaterialCommunityIcons name={icon} size={20} color={Theme.colors.appDull} style={styles.icon}/> }
                {selectedItem ? <AppText placeholder={selectedItem.label} stylesLing={[styles.textInput, styles.text]} /> 
                : <AppText placeholder={placeholder} stylesLing={[styles.textInput, styles.placeholder]}/>}
                <MaterialCommunityIcons name="chevron-down" size={20} color={Theme.colors.appDull} />
            </View>
        </TouchableWithoutFeedback>
        <Screen>

            <Modal visible={modalVisivle} animationType="slide">
                <MaterialCommunityIcons name='close' size={20} color={Theme.colors.dark} style={styles.modalIcon} onPress={() => setModalVisible(false)}/>
                <FlatList
                    data={items}
                    keyExtractor={item => item.value.toString()}
                    numColumns={numberOfColumns}
                    renderItem={({item}) => 
                    <PickerItemComponent item={item} label={item.label} onPress={() => {
                        setModalVisible(false);
                        onSelectItem(item);
                    }}/>
                }
                />
            </Modal>

        </Screen>
    </View>
    

   
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.colors.light,
        borderRadius:5,
        // width:"100%",
        flexDirection:"row",
        padding:15,
        // marginVertical:5,
        borderWidth:0.5,
        borderColor:Theme.colors.appBlue
    },
    textInput:{
        fontSize:25,
        fontFamily:Platform.OS === "andriod" ? "Lato" : "Roboto",
        width:"100%",
        color:Theme.colors.dark

    },
    icon:{
        marginRight:10,
        marginTop:3
    },
    placeholder:{
        color:Theme.colors.appLameS
    },
    text:{
        flex:1
    },
    modalIcon:{
        alignSelf:"center",
        margin:20
    }
    
})