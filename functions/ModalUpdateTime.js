import React, { useContext, useState, useEffect } from "react";
import { Button, TextInput, Text, Checkbox, RadioButton } from 'react-native-paper';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { storeData } from "./StoreData";
import { GetData } from "./GetData";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, Trans } from "react-i18next";
import Icon from 'react-native-vector-icons/AntDesign';
import styles from "../Screens/MainCss";
import Updates from "./updateListing";
import CheckModalList from "./checkModalList";
import CheckBoxList from "./checkBoxList";
import { TaskContext } from "../AppState/AppContextState";

import DateTimePicker from '@react-native-community/datetimepicker';
const ModalUpdateTime = (props) => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [vidinis, setVidinis] = useState(false)
  const [value, setValue] = useState(props.item);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(props.current);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    // var year = getYear(currentDate)
    // var month = getMonth(currentDate)
    // var day = getDay(currentDate)
    // setData(year + '-' + month + '-' + day)
    setDate(currentDate);
    setData(currentDate)
    console.log(date, data)
    // AsyncStorage.removeItem('skelbimoGaliojimas')
    // storeData(currentDate, 'skelbimoGaliojimas')
  };
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
    console.log(show)
  };
  const showDatepicker = () => {
    showMode('date');
  };

  // const name = props.elements.replace(/\s/g, '')
  const [modalData, setModalData] = useState(props.item);
  var modalName = props.name
  var all = modalData
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clearSelect = () => {
    AsyncStorage.removeItem(name);
  }
  const update = (update, value, naudotojas, changer) => {
    try {
      console.log(all)
      Updates(update, value, naudotojas, changer)
    }
    catch (e) { console.log(e) }
  }
  useEffect(() => {
  }, [modalData])


  const updateVal = (val) => {

    setModalData(val)
    setValue(all)
  }

  return (
    <View >
      <TouchableOpacity style={[styles.innerSelect, { paddingBottom: 18 }]} onPress={() => {
        if (vidinis !== true) { toggleModal(); }
        else { clearSelect() }
        setVidinis(!vidinis)

      }}
      >
        <Text style={styles.innerSelectText}>{props.name}</Text>
        <Text style={{ position: "absolute", bottom: 0, left: 10, color: 'grey' }}>{props.current}</Text>

        <Icon style={{ fontSize: 20, top: 5 }} name="right" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}
        animationInTiming={200}
        animationIn="slideInRight"
        animationOut="slideOutRight">
        <View style={{ flex: 1, backgroundColor: "white" }}>
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
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Button style={styles.btn} onPress={() => {
            toggleModal()
            setVidinis(!vidinis)
            update(props.update, value, props.naudotojas, props.changer)
          }}><Text style={{ color: "white" }}>{t('issaugoti')}</Text></Button>
        </View>
      </Modal>
    </View>
  );
}

export default ModalUpdateTime;