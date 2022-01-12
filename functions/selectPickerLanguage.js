import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "./StoreData";

import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import styles from './functionStyles';
import { useTranslation, Trans } from "react-i18next";

const Picker = (props)=>{
 
const { t, i18n } = useTranslation();
const theJson = []
const changeLanguage = (lng) => { i18n.changeLanguage(lng)};
const windowWidth = Dimensions.get('window').width*0.7;
theJson.push(props.data.map((s,index) => ({value:s,label:props.name[index]})))
    return (
        <DynamicallySelectedPicker
          items={theJson[0]}
          onScroll={({index, item}) => {
            changeLanguage(item.value)
          }}
          height={300}
          width={windowWidth}
          initialSelectedIndex={1}
          allItemsColor="#fff"
          topGradientColors={["#1C2F5D00","#1C2F5D00"]}
          bottomGradientColors={["#1C2F5D00","#1C2F5D00"]}
        />
    );
}
export default Picker