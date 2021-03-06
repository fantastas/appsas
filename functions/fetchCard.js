import { useTranslation, Trans } from "react-i18next";
import React, { useState, useEffect, useContext, useMemo } from "react";
// import { GetData } from "./GetData";
// import { GetUser } from "./GetUser";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import TinderCard from 'react-tinder-card'
import { TaskContext } from '../AppState/AppContextState';
import styles from "../Screens/MainCss";

const CardData = (props) => {
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(props.loading)
    const [isModalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation();

    const { user, setUser } = useContext(TaskContext);
    const veikejes = JSON.parse(user)
    var cardDomain = 'http://job-nestjs.herokuapp.com/worker-listing/darbdaviui/' + veikejes._id
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const getCard = async () => {
        fetch(cardDomain, requestOptions)
            .then(async response => {
                await response.json().then(data => {
                    console.log('fetch', data)
                    if (data.statusCode != 500 && data != []) {
                        setData(data)
                        console.log(data)
                        setLoading(true)
                    }
                })
            })
            .catch(error => {
                console.error('There was an error!', error);
                return false
            });
    }

    if (Object.keys(data).length == [] && loading == false) {
        getCard()
    }
    if (loading == false) {
        getCard()
    }
    const agree = () => {
        sumatchint(data[0]._id, veikejes._id)
        data.shift()
        setCount(count + 1)
        setData(data)
        console.log(count)
    }
    const no = () => {
        atmestiSkelbima(data[0]._id, veikejes._id)
        data.shift();
        setData(data)
        setCount(count + 1)
        console.log(count)
    }
    const Langelis = (pavadinimas, aprasas) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={[square]} >
                    <View style={[border, under]} ></View>
                    <View style={[border, { backgroundColor: 'white', flex: 1, paddingLeft: 10, height: '100%' }]}>
                        <Text style={mainText} >{pavadinimas}</Text>
                        <Text style={imonesPavadinimas}>{aprasas}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <View  >

            {Object.keys(data).length != [] ? (
                <View>
                    <Card style={cardStyle}>
                        <Card.Title titleStyle={titleStyle} title={data[0].vardas + ' ' + data[0].pavarde} />
                        <Card.Content >
                            <View style={{ alignItems: 'center' }}>
                                <View style={[square]} >
                                    <View style={[border, under]} ></View>
                                    <View style={[border, { backgroundColor: 'white' }]}>
                                        <Title>{t('miestas')}</Title>
                                        <Paragraph>{data[0].miestas}</Paragraph>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={[square]} >
                                    <View style={[border, under]} ></View>
                                    <View style={[border, { backgroundColor: 'white' }]}>
                                        <Title>{t('sritis')}</Title>
                                        <Paragraph>{data[0].studiju_sritis}</Paragraph>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={[square]} >
                                    <View style={[border, under]} ></View>
                                    <View style={[border, { backgroundColor: 'white' }]}>
                                        <Title style={{ marginBottom: 0 }}>{t('atlyginimas')}</Title>
                                        <Paragraph>{data[0].atlygis}</Paragraph>
                                    </View>
                                </View>
                            </View>

                            <View style={{ position: 'relative' }}>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(true)
                                }} >
                                    <IconAwesome style={elipsis} name="ellipsis-h" />
                                    <Text style={daugiau}>{t('daugiau')}</Text></TouchableOpacity>
                            </View>
                        </Card.Content>
                        <Card.Actions style={cardActions}>
                            <Button style={iconBtn} onPress={(() => {
                                no()
                                if (data.length == 0) { setCount(0); setLoading(false) }
                            })}><Icon style={iconStyle} name="close" /></Button>
                            <Button style={iconBtn} onPress={(() => {
                                console.log('agree')
                                agree()
                                if (data.length == 0) { setCount(0); setLoading(false) }
                            })}><Icon style={iconStyle} name="check" /></Button>
                        </Card.Actions>
                    </Card>

                    <Modal isVisible={isModalVisible}
                        animationInTiming={200}
                        animationIn="slideInRight"
                        animationOut="slideOutRight">
                        <View style={{ flex: 1, backgroundColor: "white", position: 'relative' }}>
                            <TouchableOpacity style={topClose} onPress={(() => {
                                setModalVisible(false)
                            })}><Icon style={iconStyleTopClose} name="close" /></TouchableOpacity>
                            <Text style={[styles.label]}>{props.elements}</Text>
                            <View style={[{ marginBottom: 20, marginTop: 20 }]}>
                                <ScrollView style={{ width: '100%', height: '80%' }}>
                                    <Text style={titleStyle} > {data[0].vardas + ' ' + data[0].pavarde} </Text>
                                    {Langelis(t('darbuotojo_options_top')[7], data[0].miestas)}
                                    {Langelis(t('darbuotojo_options_top')[3], data[0].patirtis)}
                                    {Langelis(t('darbuotojo_options_top')[0], data[0].issilavinimas)}
                                    {Langelis(t('darbuotojo_options_top')[6], data[0].kalbos_ir_ju_lygiai)}
                                    {Langelis(t('poreikis'), t('darbuotojo_options_top')[5] + ':' + data[0].etatas.replace(',', '') + '\n' + data[0].atlygis)}
                                    {Langelis(t('darbuotojo_options_top')[4], data[0].sutarties_pobudis)}
                                    {Langelis(t('darbuotojo_options_top')[2], data[0].darbo_sritis)}
                                    {Langelis(t('darbuotojo_options_top')[1], data[0].studiju_sritis)}

                                </ScrollView>
                            </View>

                            <View style={modalActions}>
                                <TouchableOpacity style={iconBtnmodal} onPress={(() => {
                                    no()
                                    if (data.length == 0) { setCount(0); setLoading(false) }
                                })}><Icon style={iconStyleModal} name="close" /></TouchableOpacity>
                                <TouchableOpacity style={iconBtnmodal} onPress={(() => {
                                    agree()
                                    if (data.length == 0) { setCount(0); setLoading(false) }
                                })}><Icon style={iconStyleModal} name="check" /></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : (
                <Text style={{ color: 'white', fontSize: 22 }}>Nera darbuotoju </Text>
            )
            }
        </View >
    )
}
export default CardData


const atmestiSkelbima = (darbuotojoId, ManoId) => {

    const atmesti = async (darbuotojoId, ManoId) => {
        var atmesti_listing = 'http://job-nestjs.herokuapp.com/worker-listing/dislike/' + darbuotojoId + '/' + ManoId;
        var atmesti_skelbimai = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const response = await fetch(atmesti_listing, atmesti_skelbimai)
            const json = await response.json().then(data => {
                console.log('response istrinimo', data)
                return true
            })
        } catch (error) {
            console.error(error);
        }
    }
    atmesti(darbuotojoId, ManoId)

}

const sumatchint = (darbuotojoId, ManoId) => {


    const prideti = async (darbuotojoId, skelbimoId) => {
        var atmesti_listing = 'http://job-nestjs.herokuapp.com/worker-listing/like/' + darbuotojoId + '/' + ManoId;
        var atmesti_skelbimai = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            const response = await fetch(atmesti_listing, atmesti_skelbimai)
            const json = await response.json().then(data => {
                console.log('response pridejimo', data)
                return true
            })
        } catch (error) {
            console.error(error);
        }
    }
    prideti(darbuotojoId, ManoId)
}

const square = {
    width: '90%',
    margin: 10,
    position: 'relative',
    backgroundColor: 'white',
    paddingBottom: 2,
}
const under = {
    backgroundColor: '#a6a7ab8c',
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: -2,
    right: -2
}
const imonesPavadinimas = {
    color: "#1C2F5D",
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
const border = { borderRadius: 10, paddingLeft: 10 }
const mainText = { fontSize: 18, color: "#1C2F5D" }
const iconStyle = { fontSize: 28, color: 'white' }
const iconBtn = { backgroundColor: "#1C2F5D", borderRadius: 50, padding: 4 }
const cardStyle = { height: '95%', width: '98%', alignSelf: 'center', borderRadius: 10 }
const titleStyle = { alignSelf: 'center', marginTop: 25, marginBottom: 25, color: "#1C2F5D", fontSize: 22, fontWeight: 'bold' }
const cardActions = { flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', padding: 20 }
const elipsis = { color: "#1C2F5D", fontSize: 38, alignSelf: 'flex-end', marginRight: 20 }
const daugiau = { color: "#1C2F5D", fontSize: 10, alignSelf: 'flex-end', marginRight: 20, marginTop: -12 }

//modal
const modalActions = { flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', padding: 20, backgroundColor: 'white', flexDirection: 'row' }
const iconBtnmodal = { backgroundColor: "#1C2F5D", borderRadius: 100, backgroundColor: "#1C2F5D", padding: 25, alignItems: 'center' }
const iconStyleModal = { fontSize: 28, color: 'white', backgroundColor: "#1C2F5D", borderRadius: 100, position: 'absolute', top: 10, bottom: 0 }
const topClose = { position: 'absolute', top: 10, right: 10, backgroundColor: "#1C2F5D", borderRadius: 100, }
const iconStyleTopClose = { fontSize: 25, color: 'white', margin: 0 }




