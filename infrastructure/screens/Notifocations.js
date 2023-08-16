import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React from 'react'
import Screen from '../components/Screen';
import { ListItem } from '../components/ListItem';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { ListItemDeleteAction } from '../components/ListItemDeleteAction';
import FakeNotificationData from '../components/FakeNotificationData';

export default function Notifocations() {
  return (
    <Screen>
      <ScrollView>
        <Text style={{fontSize:18, fontWeight:'500'}}>Recent</Text>
       {FakeNotificationData.map((e, index) => (
        <ListItem key={index}
            subTitle={e.time}
            title={e.title}
            icon={true}
            iconName={e.iconName}
            iconColor={e.iconColor}
            renderRightActions={ListItemDeleteAction}
            backgroundColor={e.iconColor}
            image={e.image}
            
            // iconSize={{}}
        />
       ))}
      </ScrollView>
    </Screen>
   
  )
}

const styles = StyleSheet.create({})