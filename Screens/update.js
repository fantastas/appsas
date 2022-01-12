import React, { useState, useContext } from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';

import { useTranslation, Trans } from "react-i18next";
import { TaskContext } from '../AppState/AppContextState';

import { GetUser } from '../functions/GetUser'
import { GetData } from '../functions/GetData'
const Update = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { user } = useContext(TaskContext);

  const { t, i18n } = useTranslation();
  const [loading, setLoading]= useState(false)
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
    pastas: GetData('@pastas'),
    tel: GetData('@telefonas'),
    kontakto_sutikimas: GetData(t('kotaktu_sutikimas').replace(/["/" ]/g, "").replace(/["\"\"" ]/g, "\""),),
    db_sutikimas: GetData(t('darbuotoju_baze_sutikimas').replace(/["/" ]/g, "").replace(/["\"\"" ]/g, "\""),),
    finished_registration: 'true'
  }
  console.log(update);

  const DeleteToken = () => {
    AsyncStorage.removeItem('@access_token');
    setTasks('login')
  }
  var miestas = GetData('miestas')

  console.log('po',miestas)

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
        sutartis: update.sutartis,
        studiju_sritis: studiju_sritis,
        etatas: update.etatas,
        kalbos_ir_ju_lygiai: update.language,
        miestas: miestas,
        atlygis: update.alga,
        darbo_aprasymas: update.aprasymas,
        pastas: update.pastas,
        tel: update.tel,
        kontakto_sutikimas: update.kontakto_sutikimas,
      })

  };

  const create_listing = 'http://job-nestjs.herokuapp.com/worker-listing/' + naudotojas._id + '';
  const create = async () => {
    try {
      const response = await fetch(create_listing, requestOptions)
      const json = await response.json().then(data => {
        console.log(data)
        isRegistered()
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
        setLoading(true)
      })
    } catch (error) {
      console.error(error);
    }
  }

  const get_skelbimai = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const get_listing = 'http://job-nestjs.herokuapp.com/worker-listing/' + naudotojas._id + '';

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
  // console.log(user)
  // if (loading == false){
  //   setTimeout(()=>{
      create()
//  }, 2000);
//  }

  return (
    <View>
      <View>
        <Text>{t('Labas')} {naudotojas.name}-{naudotojas.surname}</Text>
        <Text></Text>
      </View>
      {/* <View >
        <Button mode="contained" onPress={() => { create() }} >Create list</Button>
      </View>
      <View >
        <Button mode="contained" onPress={() => { navigation.navigate('Labas') }} >navigate</Button>
      </View>
      <View >
        <Button mode="contained" onPress={() => { skelbimai() }} ><Text>Skelbimai</Text></Button>
      </View> */}
    </View>
  )
}
export default Update




