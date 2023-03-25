import * as SecureStore from 'expo-secure-store';

const key = 'authToken';

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(authToken))
        
    } catch (error) {
        console.log('Error while storing AuthToken', error)
    }
}

const getToken = async() => {
    try {
        return await SecureStore.getItemAsync(key);

    } catch (error) {
        console.log('Error getting AuthToken', error);
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error while removing authToken');
    }
}

export default {getToken, storeToken, removeToken}