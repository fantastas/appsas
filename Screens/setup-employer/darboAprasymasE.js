import React , {useState} from "react";
import {View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import StepsRender from "../../functions/steps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import {storeData} from '../../functions/StoreData';
import styles from "../MainCss";
const DarboAprasymasE = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const [pareigos,setPareigos] = useState('')
    const [kontaktinis,setKontaktinis] = useState('')
    const GoTo = ()=>{
        AsyncStorage.removeItem('darboAprasymas'); 
          storeData(pareigos, 'darboAprasymas')
          storeData(kontaktinis, 'kontaktinis')
    navigation.navigate("papildomiKlausimaiE")
}
const top = t('darbdavio_top_Aprasymas')
    return(
        <View style={[styles.background,styles.position_wide,styles.flex]}>
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
            <View style={{flex:1, paddingLeft:15, paddingRight:15,paddingTop:15}}>
            <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('kontaktinis')}
            value={kontaktinis}
            onChangeText={setKontaktinis}
            multiline={false}
          />
            <TextInput 
              style={[styles.inputMulti]}
              activeOutlineColor="black"
              dense={true}
              activeUnderlineColor='white'
              selectionColor="#1C2F5D"
              mode="flat"
                placeholder={t('darbo_aprasymas')}
                value={pareigos}
                onChangeText={setPareigos}
                numberOfLines  = {9}
                multiline = {true}
           
                />
            </View>
            <View >
                <Button  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default DarboAprasymasE

