import React, {useContext, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "./StoreData";

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import styles from './functionStyles';
import { TaskContext } from '../AppState/AppContextState';

const Picker = (props)=>{
 
 const [selectedItemIndex,setSelectedItemIndex] = useState(0)
const [index,setIndex]=useState(0)
const [option,setOption]=useState('')
const {disabled,setDisabled}= useContext(TaskContext)

const theJson = []
const windowWidth = Dimensions.get('window').width*0.7;
theJson.push(props.data.map((s,index) => ({value:s,label:s})))
var font = 20;
const name = props.saveTo.replace(/\s/g, '')
  const saveData = (item)=>{
  setOption(item.value);
  AsyncStorage.removeItem(name); 
    storeData(option, name)
    console.log(disabled)
    setDisabled(false)
  }
  {props.font != null? font = props.font: font =20}
    return (
        <DynamicallySelectedPicker
          items={theJson[0]}
         fontSize= {font}
          onScroll={({index, item}) => { saveData(item)}}
          width={windowWidth}
          height={300}
          initialSelectedIndex={2}
          allItemsColor="#000000"
          topGradientColors={["#FFFFFF","#FFFFFF90"]}
          bottomGradientColors={["#FFFFFF90","#FFFFFF"]}
        />
    );
}
export default Picker