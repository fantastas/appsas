import React, { useState, useContext } from "react";
import { ScrollView, View } from 'react-native';
// import Button from '@mui/material/Button';
import { useTranslation, Trans } from "react-i18next";
import { storeData } from "../../functions/StoreData";
// import { textAlign } from "@mui/system";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../MainCss";
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import StepsRender from "../../functions/steps";
import CheckBoxList from "../../functions/checkBoxList";
import { TaskContext } from '../../AppState/AppContextState';
import { GetData } from '../../functions/GetData'
import Login from "../../functions/Log-in";

const Kontaktai = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [option, setOption] = useState('')
    const [option2, setOption2] = useState('')
    const [checked, setChecked] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const { setMain } = useContext(TaskContext)
    const GoTo = () => {

        // navigation.navigate("update")
        create()
    }
    const GoToSkip = () => {
        setChecked(false)
        setChecked2(false)
        create()
    }
    const top = t('darbuotojo_options_Kontaktai')

    const textValidation = (value) => {
        console.log(value)
    }

    const { tasks, setTasks } = useContext(TaskContext);
    const { user } = useContext(TaskContext);
    var naudotojas = JSON.parse(user)
    var access_token = GetData('@access_token')

    var etatas = []
    t('etatas').forEach(element => {
        let value = GetData(element);
        if (value != "") { etatas += value + ',' }
    });
    var studiju_sritis = []
    t('sritys').forEach(element => {
        let value = GetData(element);
        if (value != "") { studiju_sritis += value + ',' }
    });
    var sutartis = []
    t('sutartis').forEach((element) => {
        let value = GetData(element.replace(/\s/g, ''));
        if (value != "") { sutartis += value + ',' }
    });
    var kalbos = []
    t('kalbos').forEach(element => {
        let value = GetData(element);
        if (value != "") { kalbos += element.replace(/\s/g, '') + ':' + value + ',' }
    });
    var alga = GetData('atlyginmas_nuo') + '-' + GetData('atlyginmas_iki')
    const update = {
        issilavinimas: GetData('@issilavinimas'),
        studiju_sritis: studiju_sritis,
        darbo_sritis: GetData('@darboSritis'),
        patirtis: GetData('@patirtis'),
        sutartis: sutartis,
        etatas: etatas,
        language: kalbos,
        city: GetData('miestas'),
        aprasymas: GetData('aprasymas'),
        pastas: option,
        tel: option2,
        kontakto_sutikimas: checked,
        db_sutikimas: checked2,
        finished_registration: 'true',
        alga: alga
    }

    const DeleteToken = () => {
        AsyncStorage.removeItem('@access_token');
        setTasks('login')
    }
    var miestas = GetData('miestas')

    console.log('po', miestas)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:
            JSON.stringify({
                user_id: naudotojas._id,
                issilavinimas: update.issilavinimas,
                darbo_sritis: update.darbo_sritis,
                pogrupis: update.pogrupis,
                patirtis: update.patirtis,
                sutarties_pobudis: update.sutartis,
                studiju_sritis: studiju_sritis,
                etatas: update.etatas,
                kalbos_ir_ju_lygiai: update.language,
                miestas: miestas,
                atlygis: update.alga,
                aprasymas: update.aprasymas,
                kontaktinis_el_pastas: option,
                kontaktinis_tel_nr: option2,
                kontakto_sutikimas: checked,
                matomumas_db: checked2,
            })

    };
    console.log('patikriniti ar suvesta viskas', JSON.parse(requestOptions.body), naudotojas)

    const create_listing = 'http://job-nestjs.herokuapp.com/worker-listing/' + naudotojas._id + '';
    const create = async () => {
        try {
            console.log(JSON.parse(requestOptions.body))
            const response = await fetch(create_listing, requestOptions)
            console.log(response)
            const json = await response.json().then(data => {
                if (data.responseCode !== 500) {
                    console.log(data)
                    isRegistered()
                }
            })
        } catch (error) {
            console.error(error);
        }
    };


    const updateUser = 'http://job-nestjs.herokuapp.com/users/update/' + access_token
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
                console.log(data)
                setTasks('login')
                setMain('kortele')
            })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <View style={[styles.row, { justifyContent: 'space-between', paddingTop: 15, paddingBottom: 30 }]}>
                <Text style={[styles.textCM, { fontSize: 18 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
            </View>
            <ScrollView>
                <View style={styles.topText}>
                    <StepsRender items={top} step={2} noEnd={true} />
                </View>

                <View style={{marginTop: 40}}>
                    <TextInput
                        placeholder={t('kontaktinis_el')}
                        onChangeText={setOption}
                        value={option}
                        mode="outlined"
                        numberOfLines={8}
                        multiline={false}
                        selectionColor="#1C2F5D"
                        outlineColor="white"
                        backgroundColor="white"
                        borderWidth={1}
                        borderRadius={8}
                        activeOutlineColor="white"
                    />
                    <TextInput
                        placeholder={t('tel')}
                        value={option2}
                        onChangeText={setOption2}
                        mode="outlined"
                        numberOfLines={8}
                        multiline={false}
                        selectionColor="#1C2F5D"
                        outlineColor="white"
                        backgroundColor="white"
                        borderWidth={1}
                        borderRadius={8}
                        activeOutlineColor="white"
                        style={{marginTop:5}}
                    />

                </View>
                <View style={{ marginTop: 30}}>
                    <Checkbox.Item key={t('kotaktu_sutikimas')}
                        position="leading"
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            marginLeft: -20
                            // marginBottom: 30,
                        }}
                        labelStyle={{ textAlign: 'left', textTransform: 'none' }}
                        label={t('kotaktu_sutikimas')}
                        status={checked ? 'checked' : 'unchecked'}

                        onPress={() => {
                            setChecked(!checked)
                        }}
                    />
                    <Checkbox.Item key={t('darbuotoju_baze_sutikimas')}
                        position="leading"
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            marginLeft: -20
                            // marginBottom: 30,
                        }}
                        labelStyle={{ textAlign: 'left', textTransform: 'none' }}
                        label={t('darbuotoju_baze_sutikimas')}
                        status={checked2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked2(!checked2)

                        }}
                    />
                </View>
            </ScrollView>
            <View style={{ marginTop: 20, justifyContent: 'flex-end' }} >
                <Button mode="contained" style={styles.btn} onPress={() => { GoTo() }} >{t('toliau')}</Button>
            </View>
        </View>
    )
}
export default Kontaktai

