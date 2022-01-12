import React , {useState} from "react";
import {View,ScrollView } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import Picker from "../../functions/selectPicker";
import StepsRender from "../../functions/steps";
import { Button, TextInput, Text, Checkbox ,List  } from 'react-native-paper';
import styles from "../MainCss";
import { storeData } from "../../functions/StoreData";
const AtlyginimasE = ({navigation})=>{
    const { t, i18n } = useTranslation();
    const [nuo,setNuo] = useState(false)
    const [iki,setIki] = useState(false)
    const [expanded, setExpanded] = useState(true);
    const GoTo = ()=>{
        storeData(nuo, 'atlyginmas_nuo' )
        storeData(iki, 'atlyginmas_iki')
    navigation.navigate("darboAprasymasE")
}
const top = t('darbdavio_top_Atlyginimas')

    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
        </View>
                <ScrollView>
                <View style={styles.topText}>
                    <StepsRender items={top} step={1} />
                </View>
                <View style={[styles.flex, { marginTop: 30 }]}>
                    <TextInput
                        value={nuo}
                        onChangeText={setNuo}
                        placeholder={t('nuo')}
                        style={styles.inputTexts}
                        activeOutlineColor="black"
                        activeUnderlineColor='white'
                        selectionColor="#1C2F5D"
                        mode="none"
                    />
                    <TextInput
                        value={iki}
                        onChangeText={setIki}
                        placeholder={t('iki')}
                        style={styles.inputTexts}
                        activeOutlineColor="black"
                        activeUnderlineColor='white'
                        selectionColor="#1C2F5D"
                        mode="none"
                    />            
                    </View>
            </ScrollView>
            <View >
                <Button  mode="contained" style={styles.btn}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default AtlyginimasE

