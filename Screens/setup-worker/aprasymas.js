import React , {useState} from "react";
import {ScrollView, View } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox   } from 'react-native-paper';
import {storeData} from '../../functions/StoreData';

const Aprasymas = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const [pareigos,setPareigos] = useState('')
    const [count,setCount] = useState(0)
    const GoTo = ()=>{
        AsyncStorage.removeItem('aprasymas'); 
          storeData(pareigos, 'aprasymas')
    navigation.navigate("kontaktai")
}
const GoToSkip = ()=>{
    AsyncStorage.removeItem("aprasymas")
    navigation.navigate("kontaktai")
}
 
const top = t('darbuotojo_top_Aprasymas')


    return(

        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{GoToSkip()}}>{t('praleisti')}</Text>
            </View> 
            <ScrollView>
            <View style={styles.topText}>
                <StepsRender items={top} step ={1} />
            </View>
            <View style={{flex:1, paddingLeft:15, paddingRight:15,paddingTop:50}}>
                <Text style={{fontSize:16, color:'#1C2F5D', fontWeight:'700'}}>{t("darbuotojo_aprasymas")}</Text>
                    <TextInput 
                    value={pareigos}
                    onChangeText={(value)=>{
                        if(value.length<=300){
                            setCount(value.length)
                            setPareigos(value)}
                        }}
                    mode="outlined"
                    placeholder={''}
                    numberOfLines  = {8}
                    multiline = {true}
                    selectionColor="#1C2F5D"
                    outlineColor="white" 
                    backgroundColor="white"
                    borderWidth={1}
                    borderRadius={8}
                    activeOutlineColor="white"
                    />
                    <Text style={styles.charCount}>{count}/300</Text>
            </View>
            </ScrollView> 
            <View style={{marginTop:20}} >
                <Button  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default Aprasymas

