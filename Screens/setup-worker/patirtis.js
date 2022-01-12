import React , {useState} from "react";
import {View, Text,  StyleSheet,} from  'react-native';
// import Button from '@mui/material/Button';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "../../functions/StoreData";
// import { textAlign } from "@mui/system";
import styles from "../MainCss";
import StepsRender from "../../functions/steps";
import { Checkbox, Button } from "react-native-paper";
import Picker from "../../functions/selectPicker";

const Patirtis = ({navigation})=>{
    const { t, i18n } = useTranslation();
const [option, setOption ] = useState ('')
const [checked, setChecked ] = useState (false)
const [exp,setExp]=useState(true)

const GoTo = ()=>{  
    navigation.navigate("sutartis")
}
const GoToSkip = ()=>{
    AsyncStorage.removeItem('@patirtis'); 
    navigation.navigate("sutartis")
    }
const top = t('darbuotojo_options_top').slice(2,5)
const middle = t('patirtis_metais')
    return(
<View style={[styles.container,{position:'relative',backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
            <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{GoToSkip()}}>{t('praleisti')}</Text>
            </View> 
            <View style={styles.topText}>
            <StepsRender items={top} step ={1} />
        </View>
    <View>
        <Text>{t('ar_turite_patirties')}</Text>
        <Checkbox.Item key={t('taip')}
            position="leading"
            style={{  
            
            }}
            labelStyle={{textAlign:'left',textTransform:'capitalize'}}
            label={t('taip')}
            status={!checked ?  'unchecked' :'checked'} 
            onPress={() => {
                setChecked(true)
            }}/>
        <Checkbox.Item key={t('ne')}
            position="leading"
            style={{  
            
            }}
            labelStyle={{textAlign:'left',textTransform:'capitalize'}}
            label={t('ne')}
            status={checked ?  'unchecked' :'checked'} 
            onPress={() => {
                setChecked(false)
            }}/>
    </View>
        { checked ==true ? (
            <View>
                <Text>{t('kiek_metu')}</Text>
            <View style={styles.list}>
            <Picker  saveTo="@patirtis" data={middle} font={16}/> 
            </View>
            </View>
            ):(<View></View>)
        }

        

    
    <View style={{alignContent:'flex-end',alignItems:"center",position:'absolute',bottom:10,width:'100%',left:15}} >
                <Button uppercase={false}  mode="contained" style={[styles.btnSetup,{width:'100%'}]}  onPress={()=>{ GoTo()}} >{t('toliau')}</Button>
            </View>
</View>
    )
}
export default Patirtis

