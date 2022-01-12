import React, { useState, useContext, useEffect } from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';

import { useTranslation, Trans, composeInitialProps } from "react-i18next";
import { TaskContext } from '../../AppState/AppContextState';

import { GetUser } from '../../functions/GetUser'
import { GetData } from '../../functions/GetData'
import Login from "../../functions/Log-in";
import Background from "../../assets/background";
import styles from "../MainCss";
import Logo from "../../assets/logo";
const KurtiSkelbimaE = ({ navigation }) => {
    const { tasks, setTasks } = useContext(TaskContext);
    const { user } = useContext(TaskContext);
    const { t, i18n } = useTranslation();
    const [sukurtas, setSukurtas] = useState(false)
    const [loading, setLoading] = useState(false)
    // var user = GetUser();
    var naudotojas = JSON.parse(user)



    const access_token = GetData('@access_token')
    const create = async (requestOptions) => {
        const create_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id;
        if (loading == false) {
            setLoading(true)
            try {
                console.log('priespaskutinis', requestOptions)
                const response = await fetch(create_listing, requestOptions)
                // console.log(response)

                const json = await response.json().then(data => {
                    console.log(data)
                    if (data.statusCode != 500) {
                        isRegistered()
                        // console.log('register')
                    }
                    return
                })
            } catch (error) {
                console.error(error);
            }
        }
        else { console.log('already done') }
    };

    const token = GetData('@access_token')
    const updateUser = 'http://job-nestjs.herokuapp.com/users/update/' + token;
    const updateUserdata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            finished_registration: true,
        })
    }
    const isRegistered = async () => {

        try {
            const response = await fetch(updateUser, updateUserdata)
            const json = await response.json().then(data => {
                setTasks(Login())

            })
        } catch (error) {
            console.error(error);
        }
    }

    const get_skelbimai = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    const get_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id;
    const skelbimai = async () => {
        try {
            const response = await fetch(get_listing, get_skelbimai)
            const json = await response.json().then(data => {
                console.log(data)
            })
        } catch (error) {
            console.error(error);
        }
    };
    try {
        // useEffect(() => {
        // Run! Like go get some data from an API.
        Surinkti().then(data => {
            if (data != undefined) {

                create(data)

                // .then(() => { setSukurtas(true) }) 
            }
            try { console.log('surinkti', JSON.parse(data.body)) }
            catch { }
        })
        // }, []); 

    }
    catch (e) { console.log(e) }

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', }}><Background /></View>
            <View style={[styles.middleContainer, { paddingTop: 40 }]}><Logo height={180} width={180} /></View>


            {/* <View >
                <Button mode="contained" onPress={() => { navigation.navigate("Labas-e") }} ><Text>kurti skelbima</Text></Button>
            </View> */}
            {/* <View >
                <Button mode="contained" onPress={() => { create() }} ><Text>CreateSkelbimai</Text></Button>
            </View> */}
            {/* <View >
                <Button mode="contained" onPress={() => { skelbimai() }} ><Text>rodyti skelbima</Text></Button>
            </View> */}

            {/* <View >
                <Button mode="contained" onPress={()=>{DeleteToken()}} ><Text>delete token</Text></Button>
            </View> */}
        </View>
    )
}
export default KurtiSkelbimaE




const Surinkti = async () => {
    const { t, i18n } = useTranslation();

    var sutartis = []
    t('sutarties_pobudis').forEach((element) => {
        let value = GetData(element.replace(/\s/g, ''));
        if (value != "") { sutartis += value + ',' }
    });
    // console.log(sutartis)
    var etatas = []
    t('etatas').forEach(element => {
        let value = GetData(element);
        if (value != "") { etatas += value + ',' }
    });
    var kalbos = []
    t('kalbos').forEach(element => {
        let value = GetData(element);
        if (value != "") { kalbos += element.replace(/\s/g, '') + ':' + value + ',' }
    });
    var cv = GetData('ArreikalingasdarbuotojoCV?')
    if (cv == "") { cv = false }
    var pa = GetData('papildomiKlausimaiE')
    if (pa == "") { pa = false }
    var lik = GetData('ArreikalinganuorodaįLinkedin?')
    if (lik == "") { lik = false }
    var alga = GetData('atlyginmas_nuo') + '-' + GetData('atlyginmas_iki')

    var miestas = GetData('miestas')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:
            JSON.stringify({
                atlygis: alga,
                darbo_sritis: GetData('darboSritis'),
                pareigos: GetData('pareigos'),
                darbo_pozicija: GetData('darboPozicija'),
                sutarties_pobudis: JSON.stringify(sutartis),
                etatas: JSON.stringify(etatas),
                kalbos_ir_ju_lygiai: kalbos,
                miestas: miestas,
                darbo_aprasymas: GetData('darboAprasymas'),
                galiojimo_laikas: GetData('skelbimoGaliojimas'),
                papildomi_klausimai: pa,
                is_CV: cv,
                is_Linkedin: lik
            })
    };
    let check = JSON.parse(requestOptions.body)
    console.log('check', check)
    if (check.atlygis != '' && check.miestas != '' && check.pareigos != '' && check.darbo_pozicija != ''
        && check.darbo_aprasymas != '' && check.galiojimo_laikas != null && check.galiojimo_laikas != '') {
        return requestOptions
    }
}  