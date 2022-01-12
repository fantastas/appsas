import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, Text,View} from 'react-native';
import {TaskContext} from '../AppState/AppContextState';
import { storeData } from './StoreData';
import { GetData } from './GetData';
import { GetUser } from './GetUser';

const tokenUrl = 'http://job-nestjs.herokuapp.com/users/access-user';
const requestOptions = {
    method: 'GET',
}; 
const setLogin = ()=>{return 'login';}
// const access_token = ()=>{  GetData('@access_token')}

const  Login = async ()=>{
  const { user, setUser, access ,setAccess} = useContext(TaskContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const { main } = useContext(TaskContext);
  var access_token =  GetData('@access_token')
  const fire_token = GetData('fire_token', true)
  
  if (tasks == 'logout' ){ 
    setTasks('login')
    return 'login'
    }
    
     if (access != '' && access != access_token)
     {  access_token = access
      AsyncStorage.removeItem('@access_token')
      storeData(access, '@access_token')
    }

   
    if (access_token!=''){
    try {
      const response = await fetch(`${tokenUrl}/${access_token}`, requestOptions)
      const json = await  response.json(); 
      await storeData(json,'@user')
      setUser(JSON.stringify(json))
      let check = json
        addFMC(check,fire_token)
      if (json.employer == false && json.finished_registration == false){ return 'setup-worker' }
      else if (json.employer == false && json.finished_registration == true){ return 'loged-worker' }
      else if (json.employer == true && json.finished_registration == true){ return 'loged-employer' }
      else if (json.employer == true && json.finished_registration == false){ return 'setup-employer' }
      else {
        return 'login' 
      }

     

    } catch (error) {
      console.log(error)
      return 'login'
    }}
    else {return 'login'}
    
  }
  export default Login
  
  const addFMC =  async (user,fire_token) =>{

    try {
      const token = fire_token.token
      const fcmOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        device_token_fcm:fire_token.token
        })
    }
      const response = await fetch(`http://job-nestjs.herokuapp.com/users/writeFcm/`+user._id, fcmOptions)
      const json = await  response.json(); 
    }
    catch(e){console.log(e)}
  }
