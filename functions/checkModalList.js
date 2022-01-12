import React, { useState } from "react";
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import styles from "./functionStyles";
import { storeData } from "./StoreData";
import { GetData } from "./GetData";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, Trans } from "react-i18next";

function CheckModalList(props) {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [vidinis, setVidinis] = useState(false)
  const name = props.elements.replace(/\s/g, '')
  var modalData = props.lygiai
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const setData = (data) => {
    AsyncStorage.removeItem();
    storeData(data, name)
  }
  const clearSelect = () => {
    AsyncStorage.removeItem(name);
  }
  return (
    <View style={{ flex: 1 }}>
      <Checkbox.Item key={props.elements}
        position="trailing"
        label={props.elements}
        color='#1C2F5D'
        uncheckedColor='#1C2F5D'
        status={vidinis ? 'checked' : 'unchecked'}
        onPress={() => {
          if (vidinis !== true) { toggleModal(); }
          else { clearSelect() }
          setVidinis(!vidinis)
        }}
      />
      <Modal isVisible={isModalVisible}
        animationInTiming={200}
        animationIn="slideInRight"
        animationOut="slideOutRight">
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Text style={[styles.label]}>{props.elements}</Text>
          <View style={styles.centerContainer}>
            {modalData.map((item) => (
              <Checkbox.Item
                key={item}
                position="trailing"
                label={item}
                icon={false}
                color='#1C2F5D'
                uncheckedColor='#1C2F5D'
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setData(item)
                  toggleModal();
                }} />
            ))}
          </View>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Button style={styles.btn} onPress={()=>{
            toggleModal()
            setVidinis(!vidinis)
          }}><Text style={{ color: "white" }}>{t('grizti')}</Text></Button>
        </View>
      </Modal>
    </View>
  );
}

export default CheckModalList;