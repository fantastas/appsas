

import React ,{useState }  from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text,View } from 'react-native';
const checkMemory = async ( name, obj = false) =>{
    try {
      const jsonValue = await AsyncStorage.getItem(name)
      if (obj == true ){
        // console.log(jsonValue);
        return  jsonValue != null ?  JSON.parse(jsonValue) : null;
         }
         else{
      jsonValue != null ? JSON.parse(jsonValue) : null; 
      return jsonValue.substring(1,jsonValue.length-1)
       }
    } catch(e) { 
    return false
    }
}
const CheckState = ()=>{   
const [check,setCheck] = useState(0)
const [user,setUser]= useState('')


if(check==0){
  setCheck(1)
  setUser(checkMemory('@user',true))
}
console.log(user)
       
        return (
            <View> <Text>{user}what</Text></View>
       
        )
}


export default CheckState