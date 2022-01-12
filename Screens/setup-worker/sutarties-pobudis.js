import React , {useState} from "react";
import {View, Text,   StyleSheet, ScrollView} from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "../../functions/StoreData";
import { Button } from "react-native-paper";
import styles from "../MainCss";
import StepsRender from "../../functions/steps";
import CheckBoxList from "../../functions/checkBoxList";

const Sutartis = ({navigation})=>{
    const { t, i18n } = useTranslation();
const [option, setOption ] = useState ('')
// const [exp,setExp]=useState(false)
const GoTo = ()=>{
    navigation.navigate("etatas")
}
const GoToSkip = ()=>{
    middle.map((item)=>( 
        AsyncStorage.removeItem(item.replace(/\s/g, ''))
    ))
    navigation.navigate("etatas")
}
const top = t('darbuotojo_options_top').slice(3,6)
const middle = t('sutartis')
middle.map((item)=>( 
    AsyncStorage.removeItem(item.replace(/\s/g, ''))
))
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
export default Sutartis

