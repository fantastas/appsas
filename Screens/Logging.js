import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { TaskContext } from '../AppState/AppContextState';
import { GetData } from '../functions/GetData';
import Login from '../functions/Log-in';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../assets/background';

const Logging = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  getPromiseValue().then(data => {
    setTasks(data)
    console.log('logging:',data)
  })

  return (
    <View> 
      <View style={{ position: 'absolute', }}><Background /></View>
    </View>  
  )
}
export default Logging

const getPromiseValue = async () => {
  // const { tasks  , setTasks } = useContext(TaskContext);
  let result = await Login()
   return   result
}