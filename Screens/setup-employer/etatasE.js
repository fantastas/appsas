import React , {useContext, useEffect, useState} from "react";
import {View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import CheckBoxList from "../../functions/checkBoxList.js";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import { TaskContext } from "../../AppState/AppContextState.js";

const EtatasE = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const {disabled} = useContext(TaskContext)

    const GoTo = ()=>{
    navigation.navigate("kalbosE")
}
const top = t('darbdavio_top_Etatas')
useEffect(() => {
    console.log('etatas',disabled)
  }, [disabled])
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
        </View>
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
            <View style={[styles.background,styles.flex,styles.middleContainer]}>
                {t('etatas').map((item)=>(
                    <CheckBoxList key={item} elements={item}/>
                ))}
            </View>
            <View >
                <Button disabled={disabled} mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default EtatasE

