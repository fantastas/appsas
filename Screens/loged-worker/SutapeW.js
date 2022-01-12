import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { Alert, Linking, ScrollView, TouchableOpacity, View } from "react-native";
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

const SutapeW = () => {
    const { t, i18n } = useTranslation();
    const { tasks, setTasks } = useContext(TaskContext);
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [padetis, setPadetis] = useState('')
    const [skelbimoId, setSkelbimoId] = useState(undefined)
    const [skelbimai, setSkelbimai] = useState([[]])
    const [isModalVisible, setModalVisible] = useState(false);
    const [tel, setTel] = useState('')
    const [el, setEl] = useState('')
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [modalInner, setModalInner] = useState(false);
    const { main, setMain, user } = useContext(TaskContext);
    var naudotojas = JSON.parse(user)
    console.log('mano',naudotojas)
    const mathced = async () => {
        const get_listing = 'http://job-nestjs.herokuapp.com/users/matches/' + naudotojas._id;
        const get_skelbimai = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            console.log(get_listing)
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
    console.log('sutape', skelbimai)

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
    const [papildomi, setPapildomi] = useState([])
    const makePapildomi = (item) => {
        setPapildomi(item.split(';'))
        console.log(papildomi)
    }
    const Langelis = (pavadinimas, aprasas) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={[square]} >
                    <View style={[border, under]} ></View>
                    <View style={[border, { backgroundColor: 'white', paddingLeft: 10, }]}>
                        <Text style={mainText} >{pavadinimas}</Text>
                        <Text >{aprasas}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }} >
            <View style={{ paddingTop: 20 }}>
                <Text style={[{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold' }]}>{t('Sutape_darbdaviai')}</Text>
                <TouchableOpacity style={varpas} onPress={() => {
                    setMain('varpelis')
                }}>
                    <Varpelis width={30} height={30} />
                </TouchableOpacity>
            </View>
            {skelbimai[0] != undefined ? (
                <View style={{ position: 'relative' }}>

                    {skelbimai[0].map((item) => (
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                           <TouchableOpacity onPress={() => {
                                setModalVisible2(!isModalVisible2)
                                setModalInner(item)
                            }} style={square} >
                                <View style={[border, under]} ></View>
                                <View style={[border, { backgroundColor: 'white', padding: 10 }]}>
                                    <Text style={mainText} >{item.company_name}</Text>
                                    <Text style={imonesPavadinimas}>{item.kontaktinis_el_pastas}</Text>
                                    <Text style={imonesPavadinimas}>{item.kontaktinis_tel_nr}</Text>
                                    <View onPress={() => {
                                        setModalVisible2(!isModalVisible2)
                                    }} style={[susi]}>

                                        <View style={[border]} >
                                            <TouchableOpacity onPress={() => {
                                                setEl(item.kontaktinis_el_pastas)
                                                setTel(item.kontaktinis_tel_nr)
                                                setModalVisible(true)
                                            }} style={{ height: 20 }}>
                                                <View style={[border, under]} ></View>
                                                <Text style={[border, { height: '100%', fontSize: 12, color: '#121212', backgroundColor: 'white' }]}>{t('Susisiekti')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
                            <View style={[{ marginBottom: 20, marginTop: 20 }]}>

                                <View style={{ margin: 20 }}>
                                    <Text style={[styles.label]}>
                                        {info.is_CV == true || info.papildomi_klausimai != '' ? t('kreipiantis') : (<View></View>)}
                                        {info.is_CV == true ? t('add_CV') : (<View></View>)}
                                        {info.is_CV == true && info.papildomi_klausimai != '' ? t('ir') : (<View></View>)}
                                        {info.papildomi_klausimai != '' ? t('ats_kls') : (<View></View>)}
                                    </Text>
                                    {info.papildomi_klausimai != '' ? (papildomi.map((p) => (<Text>{p}</Text>))) : (<View></View>)}

                                </View>
                                <TouchableOpacity onPress={() => { linkEl(el) }} style={modalBtn}><Text style={modalBtnText}>{t('Susisiekti')}</Text></TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => { linkTel(tel) }} style={modalBtn}><Text style={modalBtnText} >{t('susiekite_numeriu')}</Text></TouchableOpacity> */}
                            </View>

                        </View>
                    </Modal>
                    <Modal style={{ height: '100%', width: '100%', margin: 0 }} isVisible={isModalVisible2}
                        animationInTiming={200}
                        animationIn="slideInRight"
                        animationOut="slideOutRight">
                        <View style={{ backgroundColor: 'white', flex: 1, }}>
                            <TouchableOpacity style={[topClose, { left: 20, top: 20 }]} onPress={(() => {
                                setModalVisible2(false)
                            })}><Text style={{ fontSize: 20 }}>{t('atgal')}</Text>
                                {/* <Icon style={iconStyleTopClose} name="close" /> */}
                            </TouchableOpacity>
                            <Text style={centro}>{t('Sutape_darbuotojai')}</Text>
                            <TouchableOpacity style={varpas} onPress={() => {
                                setMain('varpelis')
                            }}>
                                <Varpelis width={30} height={30} />
                            </TouchableOpacity>
                            <View style={[{ marginBottom: 20, marginTop: 45 }]}>
                                <ScrollView style={{ height: '80%' }}>
                                    <View style={{ margin: 30, marginLeft: 40, marginBottom: 20 }}>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', }}>{modalInner.company_name} </Text>
                                    </View>
                                    {Langelis(t('darbuotojo_options_top')[9], modalInner.darbo_aprasymas)}
                                    {Langelis(t('darbuotojo_options_top')[7], modalInner.miestas)}
                                    {Langelis(t('darbuotojo_options_top')[6], modalInner.kalbos_ir_ju_lygiai)}
                                    {Langelis(t('poreikis'), t('darbuotojo_options_top')[5] + ':' + modalInner.etatas + '\n' + modalInner.atlygis)}
                                    {Langelis(t('darbuotojo_options_top')[4], modalInner.sutarties_pobudis)}
                                    {Langelis(t('darbuotojo_options_top')[2], modalInner.darbo_sritis)}
                                    {Langelis(t('darbuotojo_options_top')[1], modalInner.studiju_sritis)}
                                    {/* <TouchableOpacity onPress={() => { linkEl(el) }} style={modalBtn}><Text style={modalBtnText}>{t('susiekite_elp')}</Text></TouchableOpacity> */}
                                    <View style={{ height: 50 }}></View>
                                </ScrollView>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(!isModalVisible);
                                    setEl(modalInner.kontaktinis_el_pastas)
                                    // setTel(modalInner.kontaktinis_tel_nr);
                                }} style={[modalBtn, { width: "90%", height: 50 }]}><Text style={modalBtnText} >{t('Susisiekti')}</Text></TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
            ) : (<View></View>)}
        </View >
    );
}
export default SutapeW


const centro = {
    fontSize: 20,
    color: "#1C2F5D",
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20
}
const varpas = { position: 'absolute', zIndex: 3, right: 30, top: 20 }
const square = {
    width: '90%',
    margin: 10,
    position: 'relative',
    backgroundColor: 'white',
    paddingBottom: 1,
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
const modalLooks = { width: 250, backgroundColor: "white", position: 'relative', borderRadius: 8 }
const modalBtn = { alignSelf: 'center', width: 170, flexDirection: 'row', backgroundColor: "#1C2F5D", margin: 10, height: 40, borderRadius: 10, oveflow: 'visible', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }
const modalBtnText = { color: 'white', fontSize: 13, flexShrink: 1, textAlign: 'center', width: 120 }