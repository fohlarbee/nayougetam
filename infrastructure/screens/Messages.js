import { FlatList, StyleSheet } from 'react-native'
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

    </Screen>
  )
}

const styles = StyleSheet.create({
    messages:{
        backgroundColor:'rgba(0,0,0,0.01)',
        marginHorizontal:10,
    }
})