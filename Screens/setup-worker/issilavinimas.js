import React , {useState} from "react";
import {View,  StyleSheet,} from  'react-native';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import { useTranslation, Trans } from "react-i18next";
import Picker from '../../functions/selectPicker'
import styles from "../MainCss";
import StepsRender from "../../functions/steps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Issilavinimas = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const top = t('darbuotojo_options_top').slice(0,3)
    const middle = t('issilavinimas')
    const GoTo = ()=>{
        navigation.navigate("sritis")
    }
    const GoToSkip = ()=>{
        AsyncStorage.removeItem('@issilavinimas')
        navigation.navigate("sritis")
    }
    
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
            <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{GoToSkip()}}>{t('praleisti')}</Text>
        </View> 
            <View style={styles.topText}>
                <StepsRender items={top} step ={0} noStart={true}/>
            </View>
            <View style={styles.centerContainer}>
            <Picker  saveTo="@issilavinimas" data={middle}/> 
            </View>
            <View style={{alignContent:'flex-end'}} >
                <Button  uppercase={false} mode="contained" style={styles.btnSetup}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default Issilavinimas

