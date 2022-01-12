import React , {useContext, useEffect, useState} from "react";
import {View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import Picker from "../../functions/selectPicker.js";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import { TaskContext } from "../../AppState/AppContextState.js";

const DarboSritisE = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const {disabled, setDisabled}= useContext(TaskContext)
    const GoTo = ()=>{
        setDisabled(true)
        navigation.navigate("pareigosE")
}
useEffect(() => {
    console.log('darbo sritis', disabled)
  }, [disabled])
const top = t('darbdavio_top_steps')
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            </View> 
            <View style={styles.topText}>
                <StepsRender items={top} step ={0}/>
            </View>
            <View style={[styles.background,styles.flex,styles.middleContainer]}>
                <Text style={styles.picker}>
                <Picker  saveTo="darboSritis" data={t('darbo_sritis')} font={16}/>  
                </Text>
            </View>
            <View >
                <Button disabled={disabled}  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default DarboSritisE

