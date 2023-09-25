import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, {useState} from 'react'
import Screen from '../components/Screen';
import { ListItem } from '../components/ListItem';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { ListItemDeleteAction } from '../components/ListItemDeleteAction';
import FakeNotificationData from '../components/FakeNotificationData';

export default function Notifocations() {
  const [notification, setNotification] = useState(FakeNotificationData);

  const handleDelete = (notfs) => {
    const newNotification = notification.filter(m => m.id !== notfs.id);
    setNotification(newNotification);

}
  return (
    <Screen>
      <ScrollView>
        <Text style={{fontSize:18, fontWeight:'300', marginLeft:20}}>Recent</Text>
       {notification.map((e, index) => (
        <ListItem key={index}
            subTitle={e.time}
            title={e.title}
            icon={true}
            iconName={e.iconName}
            iconColor={e.iconColor}
            renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(e)}/>}
            backgroundColor={e.iconColor}
            image={e.image}
            styling={{marginVertical:5}}
            
            // iconSize={{}}
        />
       ))}
      </ScrollView>
    </Screen>
   
  )
}

const styles = StyleSheet.create({})