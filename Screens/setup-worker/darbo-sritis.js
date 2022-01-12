import React , {useState} from "react";
import {View,  StyleSheet,} from  'react-native';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import { useTranslation, Trans } from "react-i18next";
import Picker from '../../functions/selectPicker'
import styles from "../MainCss";
import StepsRender from "../../functions/steps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarboSritis = ({navigation})=>{
    const { t, i18n } = useTranslation();
const GoTo = ()=>{
    navigation.navigate("patirtis")
}
const GoToSkip = ()=>{
    AsyncStorage.removeItem("@darboSritis")
    navigation.navigate("patirtis")
}
 
const top = t('darbuotojo_options_top').slice(1,4)
const middle = t('darbo_sritis')

    return(
    <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{GoToSkip()}}>{t('praleisti')}</Text>
            </View> 
        <View style={styles.topText}>
            <StepsRender items={top} step ={1}/>
            </View>
        <View style={styles.centerContainer}>
            <Picker  saveTo="@darboSritis" data={middle} font={17}/> 
            </View>
        <View style={{alignContent:'flex-end'}} >
            <Button uppercase={false}  mode="contained" style={styles.btnSetup}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
    </View>
    )
}
export default DarboSritis

