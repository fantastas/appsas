import React, {useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './MainCss';
import { Button, Text } from 'react-native-paper';
import Background from '../assets/background';
import Logo from '../assets/logo';
const  ChooseType = ({ navigation })=>{
    const { t, i18n } = useTranslation();

    const storeData = async (value,name) => {
        try {
          const jsonValue = JSON.stringify(value)
          await  AsyncStorage.setItem(name, jsonValue)
        } catch (e) {
          console.log(e);
        }
      }
   const typeForward = (whatType)=>{
    storeData(whatType, '@type')
    navigation.navigate("LoginScreen")
    }
    return(
      <View style={[styles.flex]}>
            <View style={{position: 'absolute'}}><Background /></View>
            <View style={[styles.middleContainer,{paddingTop:40}]}><Logo height={180} width={180}/></View>
          <View style={[styles.flex]}><Text style={[styles.textWhite, styles.bannerText]}>{t('ar_darbdavys_darbuotojas_text')}?</Text>
          </View>
        <View>
            <Button style={[styles.btn,styles.background]} uppercase={false} onPress={()=>{typeForward(false)}}><Text style={styles.textCM}>{t('ieskau_Darbo')}</Text></Button>
            <Button style={[styles.btn,styles.background]} uppercase={false} onPress={()=>{typeForward(true)}}><Text style={styles.textCM} >{t('esu_darbdavys' )}</Text></Button>
        </View>
      </View>
    )
}
export default ChooseType 