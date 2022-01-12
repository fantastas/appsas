import React, { useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkMemory = async (name, obj = false) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name)
    if (obj == true) {
      jsonValue != null ? JSON.parse(jsonValue) : null;
      return JSON.parse(jsonValue)
    }
    else {
      jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue.substring(1, jsonValue.length - 1)
    }
  } catch (e) {
    return false
  }
}
import { TaskContext } from '../AppState/AppContextState';



export  function GetUser() {
  // const { user } = useContext(TaskContext);
  // var naudotojas = JSON.parse(user)

  // return naudotojas
  const [user, setUser] = useState('')
  if (user == '')
    checkMemory('@user', true)
      .then(data => {
        if (data != '' && data != null) {
          console.log(user)
          setUser(data)
        return user

        }
        else {
          console.log('empty data')
          return 'no-user'
        }
      })
      .catch(error => console.log(error))
}