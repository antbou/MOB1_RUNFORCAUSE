import * as SecureStore from 'expo-secure-store';

export default class StoreHelper {
    static async save(key: string, value: any) {
        await SecureStore.setItemAsync(key, value);
    }

    static async get(key: string) {
        return await SecureStore.getItemAsync(key);
    }

    static async remove(key: string) {
        return await SecureStore.deleteItemAsync(key);
    }
}