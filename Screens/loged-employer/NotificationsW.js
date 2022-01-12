import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { Alert, Linking, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Modal from "react-native-modal";

// import { LogOut } from "../../functions/LogOut";
import { TaskContext } from '../../AppState/AppContextState';
import { GetData } from "../../functions/GetData";
import styles from "../MainCss";
import { useTranslation, Trans } from "react-i18next";
import Varpelis from "../../assets/varpelis";
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import { Link } from '@react-navigation/native';

const NotificationsW = () => {
    const { t, i18n } = useTranslation();
    const { tasks, setTasks } = useContext(TaskContext);

    const [loading, setLoading] = useState(false)
    const [padetis, setPadetis] = useState('')
    const [skelbimoId, setSkelbimoId] = useState(undefined)
    const [skelbimai, setSkelbimai] = useState(['empty'])
    const [isModalVisible, setModalVisible] = useState(false);
    const [tel, setTel] = useState('')
    const [el, setEl] = useState('')

    const { main, setMain, user } = useContext(TaskContext);
    var naudotojas = JSON.parse(user)
    const mathced = async () => {
        const get_listing = 'http://job-nestjs.herokuapp.com/users/notifications/' + naudotojas._id;
        const get_skelbimai = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const response = await fetch(get_listing, get_skelbimai)
            console.log(response)
            const json = await response.json().then(data => {
                console.log('resposne data', data)
                setLoading(true)
                setSkelbimai(data)
            })
        } catch (error) {
            console.error(error);
        }
    };

    if (loading == false) {
        mathced()
    }
    console.log(skelbimai, isModalVisible)

    const linkTel = async () => {
        let url = "tel:" + tel
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(supported)
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }
    const linkEl = async () => {
        console.log(el)
        let url = "mailto:" + el
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }
    let items= []
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }} >
            <View style={{ paddingTop: 20 }}>
                <Text style={[{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' }]}>{t('pranesimai')}</Text>
                <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: 30, top: 20 }} onPress={() => {
                    setMain('varpelis')
                }}>
                    <Varpelis width={30} height={30} />
                </TouchableOpacity>
            </View>
            {Object.keys(skelbimai).length >= 0 ? (
                <View style={{ position: 'relative' }}>

                    {skelbimai.map((item) => (
                        <View key={item._id}style={{ marginTop: 5, alignItems: 'center' }}>
                            <View style={square} >
                                <View style={[border, under]} ></View>
                                <View style={[border, { backgroundColor: 'white', flex: 1, padding: 10 }]}>
                                    <Text style={mainText} >{t('SutapoteSu')}</Text>
                                    <Text style={imonesPavadinimas}>{item.split(',')[0]}</Text>
                                    <Text style={imonesPavadinimas}>{item.split(',')[1]}</Text>
                                    <View style={[susi]}>

                                        <View style={[border, { height: 30, width: 50 }]} >
                                            <TouchableOpacity onPress={() => {
                                                setEl(item.split(',')[0])
                                                setTel(item.split(',')[1])
                                                setModalVisible(true)
                                            }} style={{ height: 20 }}>
                                                <View style={[border, under]} ></View>
                                                <Text style={[border, { height: '100%', fontSize: 12, color: '#121212', backgroundColor: 'white' }]}>{t('Susisiekti')}</Text>
                                            </TouchableOpacity></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                    <Modal style={{ alignSelf: 'center' }} isVisible={isModalVisible}
                        animationInTiming={200}
                        animationIn="slideInRight"
                        animationOut="slideOutRight">
                        <View style={modalLooks}>
                            <Button style={topClose} onPress={(() => {
                                setModalVisible(false)
                            })}><Icon style={iconStyleTopClose} name="close" /></Button>
                            <Text style={[styles.label]}></Text>
                            <View style={[{ marginBottom: 20, marginTop: 20 }]}>
                                <TouchableOpacity onPress={() => { linkEl(el) }} style={modalBtn}><Text style={modalBtnText}>{t('susiekite_elp')}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { linkTel(tel) }} style={modalBtn}><Text style={modalBtnText} >{t('susiekite_numeriu')}</Text></TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
            ) : (<View></View>)}
        </View >
    );
}
export default NotificationsW


const square = {
    width: '90%',
    margin: 10,
    position: 'relative',
    backgroundColor: 'white',
    height: 70,
}
const under = {
    backgroundColor: '#a6a7ab8c',
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: -2,
    right: -3
}
const border = {
    borderRadius: 10,
}
const imonesPavadinimas = {
    color: '#a6a7ab8c',
    fontSize: 13,
}
const susi = {
    position: 'absolute',
    top: 0,
    right: 15,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
}
const mainText = {
    fontSize: 18
}

//modal
const modalActions = { flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', padding: 20, backgroundColor: 'white', flexDirection: 'row' }
const iconBtnmodal = { backgroundColor: "#1C2F5D", borderRadius: 50, padding: 0 }
const iconStyleModal = { fontSize: 28, color: 'white' }
const topClose = {
    position: 'absolute', top: 0, right: 0, oveflow: 'hidden', borderRadius: 100
}
const iconStyleTopClose = { fontSize: 20, color: 'white', backgroundColor: "#1C2F5D", borderRadius: 5 }
const modalLooks = { width: 250, height: 200, backgroundColor: "white", position: 'relative', borderRadius: 8 }
const modalBtn = { alignSelf: 'center', width: 170, flexDirection: 'row', backgroundColor: "#1C2F5D", margin: 10, height: 40, borderRadius: 10, oveflow: 'visible', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }
const modalBtnText = { color: 'white', fontSize: 13, flexShrink: 1, textAlign: 'center', width: 120 }