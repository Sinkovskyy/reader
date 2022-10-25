import AsyncStorage from '@react-native-community/async-storage'

export class Reader {
  static positionStorageKey = 'book_position'

  static setLocation(location: string) {
    AsyncStorage.setItem(this.positionStorageKey, location)
  }

  static async getLocation() {
    return AsyncStorage.getItem(this.positionStorageKey)
  }
}
