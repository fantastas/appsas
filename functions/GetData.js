import React, { useState } from "react";
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

export function GetData(name = '*', obj = false) {
  const [item, setItem] = useState('')
  if (item == '')
    checkMemory(name, obj)
      .then(data => {
        if (data != '' && data != null) {
          setItem(data)
          return data
        }
        else {
          return 'no-user'
        }
      })
      .catch(error => console.log(error))
  return item
}

