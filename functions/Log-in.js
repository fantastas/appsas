import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View} from 'react-native';
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
  if (tasks == 'logout' ){ 
    setTasks('login')
    return 'login'
    }
    
     if (access != '0' && access != access_token)
     {  access_token= access}

    if (access_token!=''){
    try {
      const response = await fetch(`${tokenUrl}/${access_token}`, requestOptions)
      const json = await  response.json(); 
      await storeData(json,'@user')
      setUser(JSON.stringify(json))
      if (json.employer == false && json.finished_registration == false){ return 'setup-worker' }
      else if (json.employer == false && json.finished_registration == true){ return 'loged-worker' }
      else if (json.employer == true && json.finished_registration == true){ return 'loged-employer' }
      else if (json.employer == true && json.finished_registration == false){ return 'setup-employer' }
      else {
        return 'login' 
      }
    } catch (error) {
      console.log('error')
      return 'login'
    }}
    else {return 'login'}
  }
  export default Login
  

