import React , {useState} from "react";
import {View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import StepsRender from "../../functions/steps";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import {storeData} from '../../functions/StoreData';
import CheckBoxList from "../../functions/checkBoxList";

const DarboAprasymasE = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const [pareigos,setPareigos] = useState('')
    const [klausimai,setKlausimai] = useState(1)
    const GoTo = ()=>{
        AsyncStorage.removeItem('papildomiKlausimaiE'); 
          storeData(pareigos, 'papildomiKlausimaiE')
    navigation.navigate("skelbimoGaliojimasE")
}
const top = t('darbdavio_top_Klausimai')
    return(
        <View style={[styles.background,styles.flex]}>
            
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
            <View style={{flex:1, paddingLeft:15, paddingRight:15,paddingTop:15, minHeight:200}}>
            <TextInput 
                mode="outlined"
                placeholder={t('klausimas')}
                value={pareigos}
                onChangeText={setPareigos}
                numberOfLines  = {1}
                multiline = {true}
                outlineColor="#1C2F5D"
                backgroundColor="white"
                activeOutlineColor="#1C2F5D"
                />
            <View onPress={()=>{addQuestion()}}><Text style={{fontSize:26}}>+</Text></View>
            <CheckBoxList elements={t('reikalingas_CV')}/>
            <CheckBoxList elements={t('reikalingas_Linkedin')}/>
            </View>
            <View >
                <Button  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default DarboAprasymasE

