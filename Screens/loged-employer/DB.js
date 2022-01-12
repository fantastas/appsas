import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { Alert, Linking, ScrollView, TouchableOpacity, View, TextInput } from "react-native";
import { Button, Text, List, RadioButton } from "react-native-paper";
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
import Filtras from "../../assets/filtras";

const DB = (props) => {
    const { t, i18n } = useTranslation();
    const { tasks, setTasks, baze, setBaze } = useContext(TaskContext);
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(props.loading)
    const [padetis, setPadetis] = useState('')
    const [skelbimoId, setSkelbimoId] = useState(undefined)
    const [skelbimaiMano, setSkelbimaiMano] = useState([])
    const [skelbimai, setSkelbimai] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [tel, setTel] = useState('')
    const [el, setEl] = useState('')
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [modalInner, setModalInner] = useState(false);


    const { main, setMain, user } = useContext(TaskContext);
    var naudotojas = JSON.parse(user)
    const skelbimus = async () => {
        const get_skelbimai = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const get_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id;
        try {
            const response = await fetch(get_listing, get_skelbimai)
            const json = await response.json().then(data => {
                setSkelbimaiMano(data)
            })
        } catch (error) {
            console.error(error);
        }
    };
    const mathced = async (clear = false) => {
        let get_listing = 'http://job-nestjs.herokuapp.com/users/db/' + naudotojas._id;
        if (baze == 'issaugoti') { get_listing = 'http://job-nestjs.herokuapp.com/users/issaugoti/' + naudotojas._id; }
        const get_skelbimai = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                miestas: miestasF
                // ,
                // kalbos_ir_ju_lygiai: kalbaF,
                // darbo_sritys: sritysF
            })
        }
        if (clear == true) { get_skelbimai.body = undefined }
        console.log(get_listing)
        try {
            console.log(baze, filtruota)
            console.log('?', get_skelbimai.body)
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
        mathced(true)
        setBaze('baze')
        skelbimus()
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
    const [papildomi, setPapildomi] = useState([])
    const makePapildomi = (item) => {
        setPapildomi(item.split(';'))
    }

    const issaugoti = async (mano, darbuotojo) => {
        const get_listing = 'http://job-nestjs.herokuapp.com/users/save/' + mano + '/' + darbuotojo;
        const get_skelbimai = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }

        try {
            const response = await fetch(get_listing, get_skelbimai)
            console.log(response)
            const json = await response.json().then(data => {
                console.log('resposne data', data)
                setLoading(true)
                // setBaze('issaugoti')
            })
        } catch (error) {
            console.error(error);
        }
    };
    const istrint = async (mano, darbuotojo) => {
        const get_listing = 'http://job-nestjs.herokuapp.com/users/remove/' + mano + '/' + darbuotojo;
        const get_skelbimai = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }

        try {
            const response = await fetch(get_listing, get_skelbimai)
            console.log(response)
            const json = await response.json().then(data => {
                console.log('resposne data', data)
                setLoading(true)
                mathced()
            })
        } catch (error) {
            console.error(error);
        }
    };

    const bakstelt = async () => {
        console.log(listing_id, value)
        const bla = 'http://job-nestjs.herokuapp.com/users/poke/' + value + '/' + listing_id;
        const bel = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        console.log(bla)
        try {
            const response = await fetch(bla, bel)
            console.log(response)
            // const json = await response.json().then(data => {
            // console.log('resposne data', data)
            setModalVisible(!isModalVisible)
            // })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (filtruota == true) {
            mathced()
        }
        else {
            mathced(true)
        }
    }, [baze])
    useEffect(() => {
    }, [skelbimai])
    const Langelis = (pavadinimas, aprasas) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={[square]} >
                    <View style={[border, under]} ></View>
                    <View style={[border, { backgroundColor: 'white', padding: 12, }]}>
                        <Text style={mainText} >{pavadinimas}</Text>
                        <Text >{aprasas}</Text>
                    </View>
                </View>
            </View>
        )
    }
    const Sritys = t('darbo_sritis')
    const Miestai = t('miestai')
    const Kalbos = t('kalbos')

    const [sritysF, setSritysF] = useState('')
    const [kalbaF, setKalbaF] = useState('')
    const [miestasF, setMiestasF] = useState('')
    const [filtruota, setfiltruota] = useState(false)


    const [listTytle, setlistTytle] = useState(t('darbo_sritis_filr'))
    const [expanded, setExpanded] = useState(false)
    const handlePress = () => setExpanded(!expanded);

    const [listTytle2, setlistTytle2] = useState(t('kalba_filtr'))
    const [expanded2, setExpanded2] = useState(false)
    const handlePress2 = () => setExpanded2(!expanded2);

    const [listTytle3, setlistTytle3] = useState(t('miestas'))
    const [expanded3, setExpanded3] = useState(false)
    const handlePress3 = () => setExpanded3(!expanded3);

    const [filteris, setFilteris] = useState('')
    const [filteris2, setFilteris2] = useState('')
    const [filteris3, setFilteris3] = useState('')
    const [value, setValue] = useState('')
    const [listing_id, setListing_id] = useState('')

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }} >
            <View style={{ paddingTop: 20 }}>
                <Text style={[{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: 'bold', color: '#1C2F5D' }]}>{baze == 'baze' ? t('darbuotoju_baze') : t('issaugoti_darbuotojai')}</Text>
                <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: 30, top: 20 }} onPress={() => {
                    setMain('varpelis')
                }}>
                    <Varpelis width={30} height={30} />
                </TouchableOpacity>
            </View>
            {baze == 'baze' || baze == 'issaugoti' ? (
                <View>
                    {baze == 'baze' ? (
                        <View style={[styles.row, styles.toploginRegistrationButtonContainer, { borderColor: '#1C2F5D', margin: 20 }]}>
                            <View style={[styles.backgroundBlue, styles.flex, styles.toploginRegistrationButton]} uppercase={false} ><Text minimumFontScale={2} style={[styles.textWhite, styles.toploginRegistrationText]}>{t('darbuotoju_baze')}</Text></View>
                            <View style={[styles.background, styles.flex, styles.toploginRegistrationButton]} uppercase={false}><Text onPress={() => {
                                setBaze('issaugoti')
                            }} style={[styles.textCM, styles.toploginRegistrationText]}>{t('issaugoti_darbuotojai')}</Text></View>
                        </View>
                    ) : (
                        <View style={[styles.row, styles.toploginRegistrationButtonContainer, { borderColor: '#1C2F5D', margin: 20 }]}>
                            <View style={[styles.background, styles.flex, styles.toploginRegistrationButton]} uppercase={false}><Text onPress={() => {
                                setBaze('baze')
                            }} style={[styles.textCM, styles.toploginRegistrationText]}>{t('darbuotoju_baze')}</Text></View>
                            <View style={[styles.backgroundBlue, styles.flex, styles.toploginRegistrationButton]} uppercase={false} ><Text minimumFontScale={2} style={[styles.textWhite, styles.toploginRegistrationText]}>{t('issaugoti_darbuotojai')}</Text></View>
                        </View>
                    )}
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        {filtruota == true ? (
                            <TouchableOpacity onPress={() => {
                                setKalbaF('')
                                setMiestasF('')
                                setSritysF('')
                                setfiltruota(false)
                                mathced(true)
                            }}><Text>{t('panaikinti_filtra')}</Text></TouchableOpacity>
                        ) : (<View></View>)}
                        <TouchableOpacity TouchableOpacity onPress={() => { setBaze('filtas') }} style={{ alignSelf: 'flex-end', margin: 10, marginRight: 30 }}><Filtras width={30} height={30} /></TouchableOpacity>
                    </View>
                    {skelbimai.length > 0 ? (
                        <View style={{ position: 'relative' }}>
                            <ScrollView>
                                {skelbimai.map((item) => (
                                    <View key={item._id} style={{ marginTop: 20, alignItems: 'center' }}>
                                        <TouchableOpacity style={square} onPress={() => {
                                            setModalVisible2(!isModalVisible2)
                                            setModalInner(item)
                                        }}>
                                            <View style={[border, under]} ></View>
                                            <View style={[border, { backgroundColor: 'white',  padding: 20 }]}>
                                                <Text style={mainText} >{item.vardas} {item.pavarde}</Text>
                                                <Text style={imonesPavadinimas}>{item.kontaktinis_el_pastas}</Text>
                                                <View style={[susi]}>

                                                    <View style={[border, littleMorePad]} >
                                                        <TouchableOpacity onPress={() => {
                                                            setModalVisible(true)
                                                            setListing_id(item._id)
                                                        }} >
                                                            <View style={[border, under]} ></View>
                                                            <Text style={[border, { height: '100%', fontSize: 12, color: '#121212', backgroundColor: 'white', paddingRight: 5, paddingLeft: 10 }]}>{t('poke')}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[border, littleMorePad]} >
                                                        <TouchableOpacity onPress={() => {
                                                            if (baze == 'baze') {
                                                                issaugoti(naudotojas._id, item._id)
                                                            }
                                                            else {
                                                                istrint(naudotojas._id, item._id)
                                                            }
                                                        }} >
                                                            <View style={[border, under]} ></View>
                                                            <Text style={[border, { height: '100%', fontSize: 12, color: '#121212', backgroundColor: 'white', paddingRight: 5, paddingLeft: 10 }]}>{baze == 'baze' ? t('issaugoti') : t('istrinti_issaugota')}</Text>
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
                                        <TouchableOpacity style={topClose} onPress={(() => {
                                            setModalVisible(false)
                                        })}><Icon style={iconStyleTopClose} name="close" /></TouchableOpacity>
                                        <View style={[{ marginBottom: 20, marginTop: 20 }]}>

                                            <View style={{ margin: 20 }}>
                                                <Text style={[styles.label]}>
                                                    <Text>{t('praneskite_skelbima')}</Text>
                                                </Text>
                                                <ScrollView key={'modalScrooll'}>
                                                    <RadioButton.Group onValueChange={newValue => {
                                                        setValue(newValue)
                                                    }} value={value}>
                                                        {skelbimaiMano.map((s) => (
                                                            <View key={s._id} style={[styles.row, { height: 50, alignContent: 'center', width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }]}
                                                            >
                                                                <RadioButton.Item

                                                                    style={{ width: 200 }}
                                                                    value={s._id}
                                                                    key={s._id}
                                                                    mode='ios'
                                                                    label={s.pareigos}
                                                                    position='trailing'
                                                                />
                                                            </View>

                                                        ))}
                                                    </RadioButton.Group>
                                                </ScrollView>

                                            </View>
                                            <TouchableOpacity onPress={() => { bakstelt() }} style={modalBtn}><Text style={modalBtnText}>{t('poke')}</Text></TouchableOpacity>
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
                                        <Text style={centro}>{t('darbuotoju_baze')}</Text>
                                        <TouchableOpacity style={varpas} onPress={() => {
                                            setMain('varpelis')
                                        }}>
                                            <Varpelis width={30} height={30} />
                                        </TouchableOpacity>
                                        <View style={[{ marginBottom: 20, marginTop: 45 }]}>
                                            <ScrollView style={{ height: '80%' }}>
                                                <View style={{ margin: 30, marginLeft: 40, marginBottom: 20 }}>
                                                    <Text style={{ fontSize: 32, fontWeight: 'bold', }}>{modalInner.vardas} {modalInner.pavarde}</Text>
                                                    <Text style={{ fontSize: 16 }}>{modalInner.miestas}</Text>
                                                </View>
                                                {Langelis(t('darbuotojo_options_top')[7], modalInner.miestas)}
                                                {Langelis(t('darbuotojo_options_top')[3], modalInner.patirtis)}
                                                {Langelis(t('darbuotojo_options_top')[0], modalInner.issilavinimas)}
                                                {Langelis(t('darbuotojo_options_top')[6], modalInner.kalbos_ir_ju_lygiai)}
                                                {Langelis(t('poreikis'), t('darbuotojo_options_top')[5] + ':' + modalInner.etatas + '\n' + modalInner.atlygis)}
                                                {Langelis(t('darbuotojo_options_top')[4], modalInner.sutarties_pobudis)}
                                                {Langelis(t('darbuotojo_options_top')[2], modalInner.darbo_sritis)}
                                                {Langelis(t('darbuotojo_options_top')[1], modalInner.studiju_sritis)}
                                                {/* <TouchableOpacity onPress={() => { linkEl(el) }} style={modalBtn}><Text style={modalBtnText}>{t('susiekite_elp')}</Text></TouchableOpacity> */}
                                                <View style={{ height: 50 }}></View>
                                            </ScrollView>
                                            <TouchableOpacity onPress={() => {
                                                setModalVisible3(!isModalVisible3);
                                                setEl(modalInner.kontaktinis_el_pastas)
                                                setTel(modalInner.kontaktinis_tel_nr);
                                            }} style={[modalBtn, { width: "90%", height: 50 }]}><Text style={modalBtnText} >{t('Susisiekti')}</Text></TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>
                                <Modal style={{ alignSelf: 'center' }} isVisible={isModalVisible3}
                                    animationInTiming={200}
                                    animationIn="slideInRight"
                                    animationOut="slideOutRight">
                                    <View style={modalLooks}>
                                        <TouchableOpacity style={topClose} onPress={(() => {
                                            setModalVisible3(false)
                                        })}><Icon style={iconStyleTopClose} name="close" /></TouchableOpacity>
                                        <Text style={[styles.label]}></Text>
                                        <View style={[{ marginBottom: 20, marginTop: 20 }]}>
                                            <TouchableOpacity onPress={() => { linkEl(el) }} style={modalBtn}><Text style={modalBtnText}>{t('susiekite_elp')}</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { linkTel(tel) }} style={modalBtn}><Text style={modalBtnText} >{t('susiekite_numeriu')}</Text></TouchableOpacity>
                                        </View>

                                    </View>
                                </Modal>
                            </ScrollView>
                        </View>
                    ) : (<View></View>)
                    }
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => {
                        setfiltruota(true)
                        setBaze('baze')
                        mathced()
                    }} style={{ alignItems: 'center', alignSelf: 'flex-end', margin: 10, marginRight: 30, flexDirection: 'row' }}><Text style={{ marginRight: 20 }}>{t('filtruoti')}</Text><Filtras width={30} height={30} /></TouchableOpacity>
                    <ScrollView>
                        <List.Accordion
                            style={listAcordion}

                            title={listTytle}
                            titleNumberOfLines={2}
                            titleStyle={{ padding: 0, margin: -10, marginLeft: -35, color: 'black' }}
                            expanded={expanded}
                            onPress={handlePress}
                            activeOutlineColor
                            left={props => <List.Icon style={{ margin: 0 }} name="arrow" />}>
                            <TextInput
                                style={styles.background}
                                placeholder={t('Filtras')}
                                value={filteris}
                                onChangeText={setFilteris}
                            />
                            {Sritys.filter(Sritys => Sritys.includes(filteris)).map((s) => (
                                <List.Item
                                    style={{ marginLeft: -50, alignContent: 'flex-start' }}
                                    key={s} title={s} onPress={() => {
                                        setSritysF(s)
                                    }} />
                            ))}
                        </List.Accordion>
                        <View style={{ width: '100%', backgroundColor: 'grey', height: 1 }}></View>
                        <List.Accordion
                            style={listAcordion}

                            title={listTytle2}
                            titleNumberOfLines={2}
                            titleStyle={{ padding: 0, margin: -10, marginLeft: -35, color: 'black' }}
                            expanded={expanded2}
                            onPress={handlePress2}
                            activeOutlineColor
                            left={props => <List.Icon style={{ margin: 0 }} name="arrow" />}>
                            <TextInput
                                style={styles.background}
                                placeholder={t('Filtras')}
                                value={filteris2}
                                onChangeText={setFilteris2}
                            />
                            {Kalbos.filter(Kalbos => Kalbos.includes(filteris2)).map((s) => (
                                <List.Item
                                    style={{ marginLeft: -50, alignContent: 'flex-start' }}
                                    key={s} title={s} onPress={() => { setKalbaF(s) }} />
                            ))}
                        </List.Accordion>
                        <View style={{ width: '100%', backgroundColor: 'grey', height: 1 }}></View>
                        <List.Accordion
                            style={listAcordion}
                            title={listTytle3}
                            titleNumberOfLines={2}
                            titleStyle={{ padding: 0, margin: -10, marginLeft: -35, color: 'black' }}
                            expanded={expanded3}
                            onPress={handlePress3}
                            activeOutlineColor
                            left={props => <List.Icon style={{ margin: 0 }} name="arrow" />}>
                            <TextInput
                                style={styles.background}
                                placeholder={t('Filtras')}
                                value={filteris3}
                                onChangeText={setFilteris3}
                            />
                            {Miestai.filter(Miestai => Miestai.includes(filteris3)).map((s) => (
                                <List.Item
                                    style={{ marginLeft: -50, alignContent: 'flex-start', width: 200 }}
                                    key={s} title={s} onPress={() => { setMiestasF(s) }}
                                    position='trailing'
                                />
                            ))}
                        </List.Accordion>
                    </ScrollView>
                </View>
            )
            }
        </View >
    );
}
export default DB

const centro = {
    fontSize: 20,
    color: "#1C2F5D",
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20
}
const varpas = { position: 'absolute', zIndex: 3, right: 30, top: 20 }

const listAcordion = { backgroundColor: 'white' }
const littleMorePad = { paddingTop: 5, paddingBottom: 5, height: 32, justifyContent: 'center' }
const square = {
    width: '90%',
    margin: 10,
    position: 'relative',
    backgroundColor: 'white',
    paddingBottom: 1   ,
    position:'relative'
}
const under = {
    backgroundColor: '#a6a7ab8c',
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: -2,
    right: -2
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
    position: 'absolute', top: 10, right: 15, oveflow: 'hidden', borderRadius: 100
}
const iconStyleTopClose = { fontSize: 25, color: 'white', backgroundColor: "#1C2F5D", borderRadius: 100 }

const modalLooks = { width: 250, backgroundColor: "white", position: 'relative', borderRadius: 8 }
const modalBtn = { alignSelf: 'center', width: 170, flexDirection: 'row', backgroundColor: "#1C2F5D", margin: 10, height: 40, borderRadius: 10, oveflow: 'visible', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }
const modalBtnText = { color: 'white', fontSize: 13, flexShrink: 1, textAlign: 'center', width: 120 }