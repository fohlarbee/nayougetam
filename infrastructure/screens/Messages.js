import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
import {ListItemDeleteAction} from '../components/ListItemDeleteAction';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Theme } from '../Theme';

const initialMessages = [
    {
        id:1,
        title:"Samuel Folaranmi",
        description:"Is the product still avialable?",
        image:require("../../assets/profile.jpeg")
    },
    {
        id:2,
        title:"Samuel Folaranmi",
        description:"Is the product still avialable?",
        image:require("../../assets/profile.jpeg")
    }
    
]

export function Messages() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);
    const handleDelete = (message) => {
        const newMessages = messages.filter(m => m.id !== message.id);
        setMessages(newMessages);

    }
  return (
    <Screen style={styles.messages}>
        {/* <View style={{backgroundColor:'#fff', flex:1, marginHorizontal:10}}> */}

            <FlatList
                data={messages}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => <ListItem
                    renderRightActions={() => 
                    <ListItemDeleteAction
                    onPress={() => handleDelete(item)}
                    />
                    }
                    onPress={() => console.log(item)}
                    title={item.title}
                    subTitle={item.description}
                    // image={item.image}
                    ImageComponent={<Icon name='message' backgroundColor={Theme.colors.appBlue}/> }
                    
                    
                /> }
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id:2,
                            title:"Samuel Folaranmi",
                            description:"Is the product still avialable?",
                            image:require("../../assets/profile.jpeg")
                        }
                    
                    ])
                }}
            />
        {/* </View> */}

        {/* <ListItem title="I just dey" ImageComponent={<Icon name="trash-can"/>}/> */}
        {/* <Icon name="message" /> */}
    </Screen>

    // <SafeAreaView style={styles.areaView}>
       
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    messages:{
        backgroundColor:'rgba(0,0,0,0.01)',
        marginHorizontal:10,
    }
})