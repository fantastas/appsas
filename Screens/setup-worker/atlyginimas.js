import React, { useState } from "react";
import { View, ScrollView } from 'react-native';
import { useTranslation, Trans } from "react-i18next";
import Picker from "../../functions/selectPicker";
import StepsRender from "../../functions/steps";
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox, List } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../../functions/StoreData";
const Atlyginimas = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [nuo, setNuo] = useState('')
    const [iki, setIki] = useState('')
    const [expanded, setExpanded] = useState(true);
    const GoTo = () => {
        storeData(iki, "atlyginmas_iki")
        storeData(nuo, "atlyginmas_nuo")
        console.log(nuo, '-', iki)
        navigation.navigate("aprasymas")
    }
    const GoToSkip = () => {
        try {
            AsyncStorage.removeItem("atlyginmas_iki")
            AsyncStorage.removeItem("atlyginmas_nuo")
        } catch { }
        navigation.navigate("aprasymas")
    }
    const top = t('darbuotojo_top_Atlyginimas')

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <View style={[styles.row, { justifyContent: 'space-between', paddingTop: 15, paddingBottom: 30 }]}>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { GoToSkip() }}>{t('praleisti')}</Text>
            </View>
            <ScrollView>
                <View style={styles.topText}>
                    <StepsRender items={top} step={1} />
                </View>
                <View style={[styles.flex, { marginTop: 20 }]}>
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
            <View style={{ paddingTop: 20 }} >
                <Button mode="contained" style={styles.btn} onPress={() => { GoTo() }} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default Atlyginimas

