import React , {useContext, useEffect, useState} from "react";
import {View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import {storeData} from '../../functions/StoreData';
import { TaskContext } from "../../AppState/AppContextState";

const Pareigos = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const [pareigos,setPareigos] = useState('')
    const {disabled, setDisabled}= useContext(TaskContext)

    const GoTo = ()=>{
        setDisabled(true)
        AsyncStorage.removeItem('pareigos'); 
        storeData(pareigos, 'pareigos')
        navigation.navigate("darboPozicijaE")
    }
const top = t('darbdavio_top_steps')
console.log(top)
useEffect(() => {
    if(pareigos !=''){
        setDisabled(false)
    }
    else{ setDisabled(true)}
  }, [pareigos])
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            </View> 
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
            <View style={styles.container}>
            <TextInput 
                style={[styles.inputTexts, { position: 'relative' }]}
                activeOutlineColor="black"
                activeUnderlineColor='white'
                selectionColor="#1C2F5D"
                mode="none"
                placeholder={t('darbo_pareigos')}
                value={pareigos}
                onChangeText={setPareigos}
                multiline = {false}
                outlineColor="#1C2F5D"
                activeOutlineColor="#1C2F5D"
                />
            </View>
            <View >
                <Button disabled={disabled}  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default Pareigos

