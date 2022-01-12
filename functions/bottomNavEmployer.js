import React, { useContext } from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../Screens/MainCss";
import Match from "../assets/match";
import { useTranslation, Trans } from "react-i18next";

import { TaskContext } from '../AppState/AppContextState';
import Sutape from "../assets/sutape";
import Profilis from "../assets/profilis";
import Darbuotojai from "../assets/darbuotojai";
import Pliusas from "../assets/skelbimai";
const BottomNav = () => {
    const { t, i18n } = useTranslation();
    const { main, setMain } = useContext(TaskContext);
    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[{ alignSelf: 'center', bottom: 0, width: windowWidth }]}>
            <View style={[styles.row, styles.backgroundBlue, { justifyContent: 'space-evenly', height: 50 }]}>

                <TouchableOpacity onPress={() => { setMain('sutape') }} style={[styles.center, { paddingTop: 5 }]} >
                    <Sutape width={25} height={25} />
                    <Text  style={[styles.textWhite, { fontSize: 12 }]}>{t('Sutape')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMain('darbuotojai') }} style={[styles.center, { paddingTop: 5 }]} >
                    <Darbuotojai width={40} height={26} />
                    <Text  style={[styles.textWhite, { fontSize: 12 }]}>{t('darbuotojai')}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: -20,marginLeft:-10 }} >
                    <Text onPress={() => { setMain('kortele') }}><Match width={55} height={55} /></Text></View>
                <TouchableOpacity onPress={() => { setMain('skelbimai') }} style={[styles.center, { paddingTop: 5 }]}>
                <Pliusas width={40} height={25} />
                    <Text  style={[styles.textWhite, { fontSize: 12 }]}>{t('skelbimai')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => { setMain('profilis') }} style={[styles.center, { paddingTop: 5 }]}>
                <Profilis width={25} height={25} />
                    <Text  style={[styles.textWhite, { fontSize: 12 }]}>{t('Profilis')}</Text>
                </TouchableOpacity>
            </View>




        </View>
    )
}

export default BottomNav