import React, { useState, useContext } from "react";
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation, Trans } from "react-i18next";
import { TaskContext } from '../../AppState/AppContextState';
import { Button, TextInput, Text, List } from 'react-native-paper';
import { GetData } from '../../functions/GetData'

import DateTimePicker from '@react-native-community/datetimepicker';
import StepsRender from "../../functions/steps";
import { storeData } from "../../functions/StoreData";
import Login from "../../functions/Log-in";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../MainCss";


const SkelbimoGaliojimasE = ({ navigation }) => {
  const { user, setTasks } = useContext(TaskContext);
  var naudotojas = JSON.parse(user)
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const GoTo = () => {
    create()
  }
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    var year = getYear(currentDate)
    var month = getMonth(currentDate)
    var day = getDay(currentDate)
    setData(year + '-' + month + '-' + day)
    setDate(currentDate);
    AsyncStorage.removeItem('skelbimoGaliojimas')
    storeData(currentDate, 'skelbimoGaliojimas')
  };
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
    console.log(show)
  };
  const showDatepicker = () => {
    showMode('date');
  };
  var sutartis = []
  t('sutarties_pobudis').forEach((element) => {
    let value = GetData(element.replace(/\s/g, ''));
    if (value != "") { sutartis += value + ',' }
  });
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
  var miestas = GetData('miestas')
  var alga = GetData('atlyginmas_nuo') + '-' + GetData('atlyginmas_iki')
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
        kontaktinis_el_pastas: GetData('kontaktinis'),
        galiojimo_laikas: date,
        papildomi_klausimai: pa,
        is_CV: cv,
        is_Linkedin: lik
      })
  };
  console.log(JSON.parse(requestOptions.body), naudotojas)
  const create = async () => {
    const create_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id;
    try {
      console.log('priespaskutinis', requestOptions)
      const response = await fetch(create_listing, requestOptions)
      console.log(response)
      const json = await response.json().then(data => {
        console.log(data)
        if (data.statusCode != 500) {
          isRegistered()
        }
        return
      })
    } catch (error) {
      console.error(error);
    }
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


  return (
    <ScrollView>

      <View style={styles.topText}>
        <StepsRender items={t('darbdavio_top_SkelbimoLaikas')} step={2} count={2} />
      </View>

      <View style={[styles.textleft, styles.flex]}>

        <View>
          <TextInput
            mode="outlined"
            placeholder={t('date')}
            value={data}
            // onChangeText={setDate}
            multiline={false}
          />
          <Button style={[styles.rightButton, { width: '100%', height: '100%', top: 0, alignItems:'flex-end', justifyContent:'center' }]} onPress={() => { showDatepicker() }} >
          <Text style={{ width: '100%' }}> <Icon style={styles.textCM} name="calendar" /></Text>
            </Button>
          
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={changeDate}
            dateFormat="yyyy month day"
          />
        )}
      </View>
      <View>
        <Button style={styles.btn} mode="contained" onPress={() => { GoTo() }} >{t('toliau')}</Button>
      </View>
    </ScrollView>
  )
}
export default SkelbimoGaliojimasE

function getDay(date) {
  var month = date.getDate();
  return month < 10 ? '0' + month : '' + month;
}
function getMonth(date) {
  var month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}
function getYear(date) {
  var year = date.getFullYear();
  return year
}  