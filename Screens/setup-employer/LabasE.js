import React, { useState, useContext } from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { useTranslation, Trans } from "react-i18next";
import { TaskContext } from '../../AppState/AppContextState';
import { GetUser } from '../../functions/GetUser';
import Background from "../../assets/background";
import styles from "../MainCss";
import Logo from "../../assets/logo";
const LabasE = ({ navigation }) => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { t, i18n } = useTranslation();
    const GoTo = () => {
        navigation.navigate("aboutE")
    }
    const DeleteToken = () => {
        AsyncStorage.removeItem('@access_token');
        setTasks('login')
    }
    const user = GetUser()
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', }}><Background /></View>
            <View style={[styles.middleContainer, { paddingTop: 40 }]}><Logo height={180} width={180} /></View>
            <View style={[styles.centerContainer, { alignSelf: 'flex-start', alignItems: 'flex-start' }]}>
                <Text style={{ color: 'white', fontSize: 28, textAlign: 'left' }}>{t('Labas')} </Text>
                <Text style={{ color: 'white', fontSize: 16, width: 150 }} >{t('Laukiame')}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button mode="contained" uppercase={false} style={[styles.btn, styles.background, { marginBottom: 1, width: '100%', height: 52, paddingBottom: 0 }]} onPress={() => { GoTo() }}>
                    <Text style={[styles.textCM, styles.textButton]}>{t('pradeti')} </Text> </Button>
            </View>
        </View>
    )
}
export default LabasE



