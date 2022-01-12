import React , {useState} from "react";
import {View, ScrollView  } from  'react-native';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from "../../functions/StoreData";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, List, RadioButton, Checkbox   } from 'react-native-paper';

import CheckBoxList from "../../functions/checkBoxList.js";

const Miestai = ({navigation})=>{
    const { t, i18n } = useTranslation();
const [option, setOption ] = useState ([])
const [other,setOther] = useState (false)
const [value, setValue] = useState('');
const [filteris,setFilteris] = useState ('')
const [checked, setChecked] = useState(false)
const [checked2, setChecked2] = useState(false)
// const [exp,setExp]=useState(false)
const GoTo = ()=>{
    storeData( value,'miestas')
    navigation.navigate("atlyginimas")
}
const makeMiestas = (newValue) =>{
    setValue(newValue)
    AsyncStorage.removeItem('miestas')
    storeData(newValue, 'miestas' )
}
const top = t('darbdavio_top_Miestas') 
const middle = t('miestai')


    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
        <View style={[styles.row,{justifyContent:'space-between',paddingTop:15,paddingBottom:30}]}>
        <Text style={[styles.textCM,{fontSize:18}]} onPress={()=>{navigation.pop()}}>{t('atgal')}</Text>
        </View>
            <View style={styles.topText}>
                <StepsRender items={top} step ={1}/>
            </View>
          
            <View style={{marginTop: 30}}>
            <TextInput
            style={[styles.background, {marginTop: 10, height:50}]}
                 placeholder={t('Filtras')}
                value={filteris}
             onChangeText={setFilteris}
            backgroundColor="white"
            borderWidth={1}
            borderRadius={8}
            activeOutlineColor="transparent"
            activeUnderlineColor='transparent'
            underlineColor='transparent'
            selectionColor="transparent"
            mode="none"
            // placeholder={t('kontaktinis')}
            // value={kontaktinis}
            // onChangeText={setKontaktinis}
            multiline={false}
                />
            </View>
            <ScrollView style={{minHeight:150}}>
            <View >
                    
            <RadioButton.Group onValueChange={newValue => 
            {makeMiestas(newValue)
                setChecked(false)
                setChecked2(false)
            }} value={value}>
            {middle.filter(middle => middle.includes(filteris)).map((s) => (
                <View style={[styles.row,{height:50,alignContent:'center',width:'100%',borderBottomColor:'grey',borderBottomWidth:1}]} key={s} >
                    <RadioButton.Item
                        style={{width:'80%'}}
                    value={s}
                    mode='ios'
                    color='#1C2F5D'
                    label={s}
                    position='trailing'
                    />
                    </View>
            ))}
            <View  >
                    <Checkbox.Item key={t('visi_miestai')}
                    position="leading"
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginLeft: -20
                        // marginBottom: 30,
                    }}
                    value={''}
                    color='#1C2F5D'
                    uncheckedColor='#1C2F5D'
                    labelStyle={{ textAlign: 'left', textTransform: 'none' }}
                    label={t('visi_miestai')}
                    status={checked ? 'checked' : 'unchecked'}
                    

                    onPress={() => {
                        setChecked(true)
                        setChecked2(false)
                        makeMiestas('')
                    }}
                    />
                </View>
                <View style={[styles.row,{height:50,alignContent:'center',width:'100%', marginTop:-10}]} >

                    <Checkbox.Item key={t('nuotoliniu')}
                    position="leading"
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                        marginLeft: -20
                        // marginBottom: 30,
                    }}
                    value={''}
                    color='#1C2F5D'
                    uncheckedColor='#1C2F5D'
                    labelStyle={{ textAlign: 'left', textTransform: 'none' }}
                    label={t('nuotoliniu')}
                    status={checked2 ? 'checked' : 'unchecked'}
                    

                    onPress={() => {
                        setChecked(false)
                        setChecked2(true)
                        makeMiestas('')
                    }}
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
export default Miestai

