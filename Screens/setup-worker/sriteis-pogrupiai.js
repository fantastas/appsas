import React , {useState} from "react";
import {View, Text, Button,  StyleSheet,} from  'react-native';
// import Button from '@mui/material/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation, Trans } from "react-i18next";
import {storeData} from "../../functions/StoreData";
// import { textAlign } from "@mui/system";
import styles from "./styles";
import {GetData} from '../../functions/GetData'

const SritiesPogrupiai = ({navigation})=>{
    const { t, i18n } = useTranslation();
const [option, setOption ] = useState ('')
const GoTo = ()=>{
    AsyncStorage.removeItem('@pogrupis'); 
    storeData(option, '@pogrupis')
    navigation.navigate("patirtis")
}
const GoToSkip = ()=>{
    AsyncStorage.removeItem('@pogrupis'); 
    navigation.navigate("patirtis")
}
const sritis = GetData('@darboSritis')
console.log(GetData('@darboSritis'))
const top = t('darbuotojo_options_top').slice(2,5)
const middle = t('pogrupiai')[sritis]
    return( 
        <View style={styles.container}>
            
            <View >
                <Text>{t('Pasirinkite_issilavinimo_lygi')}</Text>
            </View>
            <View style={styles.row}> 
                {top.map((s) => (
                    <View key={s} >
                        <Text  key={s}>{s} </Text>
                    </View> 
                ))}
            </View>
            { sritis!= ""? (
            <View style={styles.centerContainer}>
                {middle.map((s) => (
                    <View key={s} >
                        <Text key={s} onPress={()=>{setOption(s)}}>{s} </Text>
                    </View> 
                ))}
            </View>

            ):(<View></View>)}

            <View >
                <Button style={styles.btn}  title={t('praleisti')} onPress={()=>{ GoToSkip()}} />
            </View>
            <View >
                <Button style={styles.btn}  title={t('toliau')} onPress={()=>{ GoTo()}} />
            </View>
        </View>
    )
}
export default SritiesPogrupiai

