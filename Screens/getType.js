
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
    View,
  } from 'react-native';
import styles from './MainCss';
const GetType = () =>{
    const [type , setType] = useState('')
    const [option , setOption] = useState(false)
    const checkMemory = async (name)=>{
    try {
      const jsonValue = await AsyncStorage.getItem(name)
      jsonValue != null ? JSON.parse(jsonValue) : null; 
      return jsonValue.substring(1,jsonValue.length-1)
    } catch(e) {
   console.log(e)
    }
  } 
    checkMemory('@type')
    .then(data=>{
        setType(data);
    })
    .catch(e=>console.log(e))
}
export default GetType