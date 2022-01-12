import React , { useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskContext} from '../AppState/AppContextState';

const LogOut = ()=>{ 
    AsyncStorage.removeItem('@access_token'); 
    return true
      }  

      export default LogOut