import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
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
import Dialog from "react-native-dialog";

const ProfileW = (props) => {
    const { t, i18n } = useTranslation();
    const { tasks, setTasks } = useContext(TaskContext);
    const { main, setMain } = useContext(TaskContext);
    const { user } = useContext(TaskContext);
    const [loading, setLoading] = useState(false)
    const [padetis, setPadetis] = useState('')
    const [skelbimoId, setSkelbimoId] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const [dialog, setDialog] = useState(false)

    var naudotojas = JSON.parse(user)
    const [isSwitchOn, setIsSwitchOn] = useState(naudotojas.pranesimai);

    const deleteRoute = 'http://job-nestjs.herokuapp.com/users/' + naudotojas._id;

    const trinti = {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    }

    const istrint = async () => {
        try {
            AsyncStorage.getAllKeys().then(data => {
                console.log(data)
                AsyncStorage.multiRemove(data)
            })
            const response = await fetch(deleteRoute, trinti)
            const json = await response.json().then(data => {
                console.log(data)
                setTasks('login')
            })
        } catch (error) {
            console.error(error);
        }

    }
    const LogOut = async () => {
        let Logout = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        let logoutpath = 'http://job-nestjs.herokuapp.com/users/logout/' + naudotojas.access_token;
        try {

            const response = await fetch(logoutpath, Logout)
            const json = await response.json().then(data => {
                console.log(data)
                setTasks('login')
            })
        } catch (error) {
            console.error(error);
        }
    }
    const navigation = props.navigation.navigation
    const onToggleSwitch = async () => {
        let notif = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            
        }

        let path = 'http://job-nestjs.herokuapp.com/users/pranesimai/' + naudotojas._id;
        try {
            const response = await fetch(path, notif)
            console.log(response)
            // const json = await response.json().then(data => {
            //    console.log(data)
            setIsSwitchOn(!isSwitchOn)
            // })rr
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white'}} >
            <View style={{ paddingTop: 20 }}>
                <View style={[{ justifyContent: 'space-between', paddingBottom: 30 }]}>
                    <Text style={[{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' }]}>{t('Profilis')}</Text>
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: 20 }} onPress={() => {
                        setMain('varpelis')
                        console.log(main)
                    }}><Varpelis width={30} height={30} /></TouchableOpacity></View>
            </View>
            <View style={{ flex: 1, borderTopColor: 'grey', borderTopWidth: 1, borderBottomColor: 'grey', marginTop: 30 }}>
                <TouchableOpacity style={styles.innerSelect} onPress={() => { navigation.navigate('asmenine') }} >
                    <Text style={styles.innerSelectText}>{t('asmenine_informacija')}</Text>
                    <Icon style={{ fontSize: 20, color:"#1C2F5D" }} name="right" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerSelect} onPress={() => { navigation.navigate('skelbimo') }}>
                    <Text style={styles.innerSelectText}>{t('skelbimo_informacija')}</Text>
                    <Icon style={{ fontSize: 20, color:"#1C2F5D" }} name="right" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerSelect} onPress={() => { navigation.navigate('slaptazodzio') }}>
                    <Text style={styles.innerSelectText}>{t('slaptazodzio_keitimas')}</Text>
                    <Icon style={{ fontSize: 20, color:"#1C2F5D" }} name="right" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('kalbai') }} style={styles.innerSelect} >
                    <Text style={styles.innerSelectText}>{t('pasirinkti kalba')}</Text>
                    <Icon style={{ fontSize: 20, color:"#1C2F5D" }} name="right" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onToggleSwitch() }} style={styles.innerSelect} >
                    <Text style={styles.innerSelectText}>{t('pranesimai')}</Text>
                    <Switch color="#1C2F5D" mode="IOS"  value={isSwitchOn} onValueChange={onToggleSwitch} />
                </TouchableOpacity>
            </View>


            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View>
                    <Text style={styles.LogOut} onPress={() => {
                        setVisible(!visible)
                        setDialog('atsijungti')
                    }}> {t('atsijungti')} <Icon name="deleteuser" size={30} />
                    </Text>
                </View>
                <View style={{ marginBottom: 50 }}>
                    <Text style={styles.LogOut1} onPress={() => {
                        setVisible(!visible)
                        setDialog('istrinti')

                    }}> {t('istrinti')}
                        <Icon name="close" size={30} /></Text>
                </View>
            </View>
            <View>
                <Dialog.Container visible={visible}>
                    {dialog == 'atsijungti' ? (
                        <Dialog.Description>
                            {t('ar_tikrai_atsijungti')}
                        </Dialog.Description>
                    ) : (
                        <Dialog.Description>

                        </Dialog.Description>
                    )}
                    <Dialog.Button label={t('uzdaryti')} onPress={() => { setVisible(!visible) }} />
                    <Dialog.Button label={dialog == 'atsijungti' ? t('atsijungti') : t('istrinti')} onPress={() => {
                        dialog == 'atsijungti' ? LogOut() : istrint()
                    }} />
                </Dialog.Container></View>
        </View>
    );
}
export default ProfileW


