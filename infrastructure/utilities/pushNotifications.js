import { Expo } from 'expo-server-sdk';

const sendPushNotification = async(targetExpoPushToken, message) => {
    const expo = new Expo();
    const chunks = expo.chunkPushNotifications([
        {to:targetExpoPushToken, sound:'default', body:message}
    ]);

    // const sendChunks = async() => {
    //     chunks.
    // }
}

