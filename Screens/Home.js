
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Platform
  } from 'react-native';

const tokenUrl = 'http://job-nestjs.herokuapp.com/users/access-user'

  const Home = ({navigator})=>{
      const [access_token , setAccess_token] = useState('')

      
    const checkMemory = async () =>{
        try {
          const jsonValue = await AsyncStorage.getItem('@access_token')
          jsonValue != null ? JSON.parse(jsonValue) : null; 
          setAccess_token(jsonValue.substring(1,jsonValue.length-1))
          return jsonValue
        } catch(e) {
        return false
        }
      } 
      checkMemory()



const requestOptions = {
    method: 'GET',
};
const letsLogIn = ()=>{ 
    fetch(`${tokenUrl}/${access_token}`, requestOptions)
    .then(async response => {
      response.json().then(data => {
        // storeData(data.access_token)
        console.log(data);
       }).catch(e =>{console.log(e)})
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}
letsLogIn()
    return(
        <View>
            <Text>{access_token}</Text>
        </View>
    )
  }

  export default Home