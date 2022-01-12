import React , {useState} from "react";
import {View, ScrollView  } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "../../functions/StoreData";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, List, RadioButton   } from 'react-native-paper';
import CheckBoxList from "../../functions/checkBoxList.js";

const MiestasE = ({navigation})=>{
    const [checked, setChecked] = useState(true);
    const [option, setOption] = useState()
    const [value, setValue] = useState('');
    const { t, i18n } = useTranslation();
const [other,setOther] = useState (false)
const [filteris,setFilteris] = useState ('')
// const [exp,setExp]=useState(false)
const GoTo = ()=>{
    navigation.navigate("atlyginimasE")
}

const top = t('darbdavio_top_Miestas')
const middle = t('miestai')

const addOptions = (lang)=>{
    var index = option.indexOf(lang)
    if(index != -1){
    option.splice(index,1) 
    return
    }
    else{
        option.push(lang)
        return
    }
   
}
const makeMiestas = (newValue) =>{
    setValue(newValue)
    AsyncStorage.removeItem('miestas')
    storeData(newValue, 'miestas' )
AsyncStorage.getItem('miestas').then(data=>{
    console.log(data)
})
}
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
        </View>
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
          
            <View>
            <TextInput
            style={styles.background}
                 placeholder={t('Filtras')}
                value={filteris}
             onChangeText={setFilteris}
                />
            </View>
            <ScrollView style={{minHeight:150}}>
            <View >
                    
            <RadioButton.Group onValueChange={newValue => makeMiestas(newValue)} value={value}>
            {middle.filter(middle => middle.includes(filteris)).map((s) => (
                <View style={[styles.row,{height:50,alignContent:'center',width:'100%',borderBottomColor:'grey',borderBottomWidth:1}]} key={s} >
                    <RadioButton.Item
                        style={{width:'80%'}}
                    value={s}
                    mode='ios'
                    label={s}
                    position='trailing'
                    />
                    </View>
            ))}
            <View style={[styles.row,{height:50,alignContent:'center',width:'100%',borderBottomColor:'grey',borderBottomWidth:1}]}  >
                    <RadioButton.Item
                    key={t('visi_miestai')}
                        style={{width:'80%'}}
                    value={''}
                    mode='ios'
                    label={t('visi_miestai')}
                    position='trailing'
                    />
                </View>
                <View style={[styles.row,{height:50,alignContent:'center',width:'100%',borderBottomColor:'grey',borderBottomWidth:1}]} >
                    <RadioButton.Item
                        key={t('nuotoliniu')}
                        style={{width:'80%'}}
                    value={'#'}
                    mode='ios'
                    label={t('nuotoliniu')}
                    position='trailing'
                    />
                </View>
            </RadioButton.Group>

                </View> 
         
                
            </ScrollView>

            <View >
                <Button style={styles.btn}  onPress={()=>{ GoTo()}}><Text style={{color:"white"}}>{t('toliau')}</Text></Button>
            </View>
        </View>
    )
}
export default MiestasE

