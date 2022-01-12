import React from "react";
import {ScrollView, View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import CheckBoxList from "../../functions/checkBoxList.js";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudijuSritis = ({navigation})=>{
    const { t, i18n } = useTranslation();
const GoTo = ()=>{
    navigation.navigate("darbo_Sritis")
}
const GoToSkip = ()=>{
    middle.map((item)=>( 
        AsyncStorage.removeItem(item)
    ))
    navigation.navigate("darbo_Sritis")
}

const top = t('darbuotojo_options_top').slice(0,3)
const middle = t('sritys')
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
            <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{GoToSkip()}}>{t('praleisti')}</Text>
        </View> 
        <View style={styles.topText}>
            <StepsRender items={top} step ={1} />
        </View>
        <ScrollView style={{marginBottom:20}}>
        <View style={[styles.background,styles.flex,styles.topText,styles.textleft]}>
            {middle.map((item)=>( 
                <CheckBoxList key={item} elements={item}/>
            ))} 
        </View>
        </ScrollView>
        <View style={{alignContent:'flex-end'}} >
                <Button uppercase={false}  mode="contained" style={styles.btnSetup}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
    </View>
    )
}
export default StudijuSritis

