import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text, Switch } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskContext } from '../../AppState/AppContextState';
import styles from "../MainCss";
import { useTranslation, Trans } from "react-i18next";
import Icon from 'react-native-vector-icons/AntDesign';
import Varpelis from "../../assets/varpelis";
import Login from "../../functions/Log-in";
import AsmenineI from "./asmenineInfo";
import { ProgressSteps } from "react-native-progress-steps";
import { GetData } from "../../functions/GetData";
import DarbdavioSkelbimasGoTo from "./DarbdavioSkelbimasGoTo";

const Skelbimai = (props, { navigation }) => {
    const { t, i18n } = useTranslation();
    const { tasks, setTasks } = useContext(TaskContext);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const { main, setMain, skelbimas } = useContext(TaskContext);
    const { user } = useContext(TaskContext);
    var naudotojas = JSON.parse(user)
    const [skelbimai, setSkelbimai] = useState([])
    // console.log(naudotojas)

    const skelbimus = async () => {
        const get_skelbimai = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const get_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id;
        try {
            const response = await fetch(get_listing, get_skelbimai)
            const json = await response.json().then(data => {
                setSkelbimai(data)
            })
        } catch (error) {
            console.error(error);
        }
    };

    if (Object.keys(skelbimai).length <= 0) {
        skelbimus()
    }
    console.log(skelbimai)
    useEffect(() => {
        skelbimus()
      }, [skelbimas])
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
                    <ScrollView>
            <View style={{ paddingTop: 20 }}>
                <View style={[{ justifyContent: 'space-between', paddingBottom: 30 }]}>
                    <Text style={[{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' }]}>{t('Skelbimai')}</Text>
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: 18 }} onPress={() => {
                        setMain('varpelis')
                        // console.log(main)
                    }}><Varpelis width={30} height={30} /></TouchableOpacity>

                </View>
            </View>
            <View >

                {Object.keys(skelbimai).length >= 0 ? (
                    <View>
                        {skelbimai.map((s, i) => (<DarbdavioSkelbimasGoTo key={i} navigation={props.navigation} s={s} />))}
                    </View>
                ) : (
                    <View><Text></Text></View>
                    )} 
            </View> 
                    <TouchableOpacity onPress={()=>{  props.navigation.navigate('darboSritisE')}}  style={{flexDirection:'row', padding:10,alignItems:'center'}}>
                        <Icon style={[styles.textCM,{fontSize:20, marginRight:20}]} name="plus"/>
                        <Text style={{fontSize:18}}>{t('Prideti_Skelbima')}</Text>
                        
                    </TouchableOpacity>

                    </ScrollView>
 
        </View >
    );
}
export default Skelbimai


