import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeData (value,name){
    try {
      const jsonValue = JSON.stringify(value)
      await  AsyncStorage.setItem(name, jsonValue)
      // console.log('storedata', name , ':', jsonValue)
      return true
    } catch (e) {
      console.log(e);
      return false
    }
  }