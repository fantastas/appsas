import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Text
} from 'react-native-paper';
import styles from '../Screens/MainCss'
import { useTranslation, Trans } from "react-i18next";
import Picker from '../functions/selectPickerLanguage';
import Background from "../assets/background.js";
import Logo from '../assets/logo';
const Start = ({ navigation }) => {

  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  var languagesFull = t("languages_full")
  var languages = t("languages")
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', }}><Background /></View>
      <View style={[styles.middleContainer, { paddingTop: 40 }]}><Logo height={180} width={180} /></View>
      <View style={styles.container} >
        <View style={[styles.middleContainer]}>
          <Picker data={languages} name={languagesFull} />
        </View>
      </View>
      <View >
        <Button  mode="contained" style={[styles.btn, styles.background]} uppercase={false} onPress={() => { navigation.pop() }}> <Text style={[styles.textCM]}>{t('issaugoti')} </Text></Button>
      </View>
    </View>
  )

}


export default Start