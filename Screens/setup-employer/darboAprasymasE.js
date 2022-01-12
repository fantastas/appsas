import React, { useState } from "react";
import { ScrollView, View } from 'react-native';
import { useTranslation, Trans } from "react-i18next";
import StepsRender from "../../functions/steps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { storeData } from '../../functions/StoreData';
import styles from "../MainCss";
const DarboAprasymasE = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [pareigos, setPareigos] = useState('')
    const [kontaktinis, setKontaktinis] = useState('')
    const [count, setCount] = useState(0)
    const GoTo = () => {
        AsyncStorage.removeItem('darboAprasymas');
        storeData(pareigos, 'darboAprasymas')
        storeData(kontaktinis, 'kontaktinis')
        navigation.navigate("papildomiKlausimaiE")
    }
    const top = t('darbdavio_top_Aprasymas')
    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <View style={[styles.row, { justifyContent: 'space-between', paddingTop: 15, paddingBottom: 30 }]}>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
            </View>
            <ScrollView>
                <View style={styles.topText}>
                    <StepsRender items={top} step={1} />
                </View>
                <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 15, marginTop: 30, marginBottom: 30 }}>
                    <TextInput
                        
                        backgroundColor="white"
                        borderWidth={1}
                        borderRadius={8}
                        activeOutlineColor="transparent"
                        activeUnderlineColor='transparent'
                        underlineColor='transparent'
                        selectionColor="#1C2F5D"
                        mode="none"
                        placeholder={t('kontaktinis')}
                        value={kontaktinis}
                        onChangeText={setKontaktinis}
                        multiline={false}
                    />
                    <TextInput
                        value={pareigos}
                        onChangeText={(value) => {
                            if (value.length <= 300) {
                                setPareigos(value)
                            }
                        }}
                        mode="outlined"
                        placeholder={t('darbo_aprasymas')}
                        numberOfLines={8}
                        multiline={true}
                        selectionColor="#1C2F5D"
                        outlineColor="white"
                        backgroundColor="white"
                        borderWidth={1}
                        borderRadius={8}
                        activeOutlineColor="white"
                    />
                </View>
            </ScrollView>
            <View >
                <Button mode="contained" style={styles.btn} onPress={() => { GoTo() }} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default DarboAprasymasE

