import React, { useState, useContext } from "react";
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation, Trans } from "react-i18next";
import { TaskContext } from '../../AppState/AppContextState';
import { Button, TextInput, Text, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import { GetData } from '../../functions/GetData';
import styles from "../MainCss";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const AboutE = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const {disabled,setDisabled} = useContext(TaskContext)
  const [date, setDate] = useState(new Date(1598051730000));
  const [data, setData] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [pavadinimas, setPavadinimas] = useState('')
  const [apie, setApie] = useState('')
  const [svetaine, setSvetaine] = useState('')
  const [sk, setSk] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [veiklosSritis, setVeiklosSritis] = useState('');
  const [teisineForma, setTeisineForma] = useState('');

  const handlePress = () => setExpanded(!expanded);


  const GoTo = () => {
    navigation.navigate("LabasEiskelbima")
  }
  const DeleteToken = () => {
    AsyncStorage.removeItem('@access_token');
    setTasks('login')
  }
  const token = GetData('@access_token')
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    var year = getYear(currentDate)
    var month = getMonth(currentDate)
    var day = getDay(currentDate)
    setData(year + '-' + month + '-' + day)
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
    console.log(show)
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const Sritys = t('darbo_sritis')
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:
      JSON.stringify({
        darbo_sritis: veiklosSritis,
        company_name: pavadinimas,
        about_company: apie,
        company_url: svetaine,
        number_of_emploees: sk,
        imones_ikurimo_data: date,
        employer_kind: teisineForma,

      })
  };
  const update_employe = 'http://job-nestjs.herokuapp.com/users/update/' + token;
  const update = async () => {
    try {
      const response = await fetch(update_employe, requestOptions)
      const json = await response.json().then(data => {
        console.log(data)
        GoTo()
      })
    } catch (error) {
      console.error(error);
    }
  };
  const [listTytle, setlistTytle] = useState(t('veiklos_sritys'))

  if(pavadinimas!==""){setDisabled(false)}
  return (

    <View style={[styles.container, styles.background]}>
      <ScrollView style={{ backgroundColor: 'white' }} >
        <View style={styles.textleft}>
          <Text style={[styles.textCM, { fontSize: 28, fontWeight: 'bold' }]}>Apie Imone</Text>
          <Text style={{ color: 'grey', }}>{t('uzpildyti_apie_imone')}</Text>
        </View>


        <View style={styles.textleft}>
          <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('imones_pavadinimas')}
            value={pavadinimas}
            onChangeText={setPavadinimas}
          />
          <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('apie_imone')}
            value={apie}
            onChangeText={setApie}
            multiline={false}
          />
          <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('svetaine')}
            value={svetaine}
            onChangeText={setSvetaine}
            multiline={false}
          />
          <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('darbuotoju_sk')}
            value={sk}
            onChangeText={setSk}
            multiline={false}
          />
          <View>
            <TextInput
              style={[styles.inputTexts, { position: 'relative' }]}
              activeOutlineColor="black"
              activeUnderlineColor='white'
              selectionColor="#1C2F5D"
              mode="none"
              placeholder={t('isikurimo_data')}
              value={data}
              onChangeText={setDate}
              // onPressIn={() => { showDatepicker() }}
              multiline={false}
            />
            <Button accessibilityHint='false'
              style={[styles.rightButton, { width: '100%', height: '100%', top: 0, alignItems: 'flex-end' }]} onPress={() => { showDatepicker() }} >
              <Text style={{ width: '100%' }}> <Icon style={styles.textCM} name="calendar" /></Text>
            </Button>
          </View>
          {show && (
            <DateTimePicker
              style={styles.inputTexts}
              disabled={true}
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={changeDate}
              dateFormat="yyyy month day"
            />
          )}
          <List.Accordion
            style={[styles.inputTexts, { padding: 0, margin: 0 }]}
            title={listTytle}
            titleNumberOfLines={2}
            titleStyle={{ padding: 0, margin: -10, marginLeft: -35, color: 'black' }}
            expanded={expanded}
            onPress={handlePress}
            activeOutlineColor
            left={props => <List.Icon style={{ margin: 0 }} name="arrow" />}>
            {Sritys.map((s) => (
              <List.Item
                style={{ marginLeft: -50, alignContent: 'flex-start' }}
                key={s} title={s} onPress={() => { setVeiklosSritis(s); handlePress(); setlistTytle(s) }} />
            ))}
          </List.Accordion>
          <TextInput
            style={styles.inputTexts}
            activeOutlineColor="black"
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode="none"
            placeholder={t('teisineForma')}
            value={teisineForma}
            onChangeText={setTeisineForma}
            multiline={false}
          />
        </View>
      </ScrollView>

      <View style={{ justifyContent: 'flex-end' }}>
        <Button
        disabled={disabled}
          style={[styles.btn, styles.backgroundBlue, { paddingBottom: 50, width: '100%', height: 52, paddingBottom: 0 }]}
          mode="contained"
          onPress={() => { update() }}
          uppercase={false} >{t('toliau')}</Button>
      </View>

    </View>
  )
}
export default AboutE



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