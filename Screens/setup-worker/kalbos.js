import React, { useState } from "react";
import { View, ScrollView } from 'react-native';
import { useTranslation, Trans } from "react-i18next";
import CheckModalList from "../../functions/checkModalList.js";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const KalbosE = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [checked, setChecked] = useState(false)
    const GoTo = () => {
        navigation.navigate("miestas")
    }
    const GoToSkip = () => {
        middle.map((item) => (
            AsyncStorage.removeItem(item)
        ))
        navigation.navigate("miestas")
    }

    const top = t('darbdavio_top_Kalbos')
    const middle = t('kalbos')
    var kalbaMatoma = middle.slice(0, 4)
    var kita = middle.slice(4, 5)
    var kalbaNematoma = middle.slice(5)
    var kalbos_lygiai = t('kalbos_lygiai')
    return (
        <View style={[styles.container, { backgroundColor: 'white'}]}>
            <View style={[styles.row, { justifyContent: 'space-between', paddingTop: 15, paddingBottom: 30 }]}>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { GoToSkip() }}>{t('praleisti')}</Text>
            </View>
            <View style={styles.topText}>
                <StepsRender items={top} step={1} />
            </View>
            <ScrollView>
                <View style={[{ marginTop: 20 }]}>
                    {kalbaMatoma.map((item) => (
                        <CheckModalList key={item} elements={item} lygiai={kalbos_lygiai} />
                    ))}
                </View>
                
                <View style={[styles.row, styles.middleContainer, {alignItems:"center", flex: 1, alignSelf:'baseline', justifyContent:'space-between', width:'92.5%', marginLeft: 13, marginTop:5, marginBottom:2}]}>
                <Text style={{fontSize:16}}> {kita}</Text>
                    <Checkbox
                        key={kita}
                        position="leading"
                        label={kita}
                        color='#1C2F5D'
                        uncheckedColor='#1C2F5D'
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked(!checked) }}
                    />
                    
                </View>
                <View>
                    {checked == true ? (
                        kalbaNematoma.map((item) => (
                            <View><CheckModalList key={item} elements={item} lygiai={kalbos_lygiai} /></View>
                        ))
                    ) : (<View></View>)
                    }

                    <View style={{ padding: 100 }}></View>
                </View>
            </ScrollView>
            <View >
                <Button mode="contained" style={styles.btn} onPress={() => { GoTo() }} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default KalbosE

