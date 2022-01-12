import React, { useState } from "react";
import { Button, TextInput, Text, Checkbox, RadioButton } from 'react-native-paper';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { storeData } from "./StoreData";
import { GetData } from "./GetData";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation, Trans } from "react-i18next";
import Icon from 'react-native-vector-icons/AntDesign';
import styles from "../Screens/MainCss";
import Updates from "./updateListing";

const ModalUpdateSingle = (props) => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [vidinis, setVidinis] = useState(false)
  const [value, setValue] = useState(props.current);

  // const name = props.elements.replace(/\s/g, '')
  var modalData = props.item

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clearSelect = () => {
    AsyncStorage.removeItem(name);
  }
  const update = (update, value, naudotojas, changer, newValue) => {
    try {
      setValue(newValue);
      setVidinis(!vidinis)
      toggleModal()
      Updates(update, newValue, naudotojas, changer)
    }
    catch (e) { console.log(e) }
  }
  return (
    <View >
      <TouchableOpacity style={[styles.innerSelect, { paddingBottom: 18 }]} onPress={() => {
        if (vidinis !== true) { toggleModal(); }
        else { clearSelect() }
        setVidinis(!vidinis)

      }}
      >
        <Text style={[styles.innerSelectText, { marginLeft: 5 }]}>{props.name}</Text>
        <Text style={{ position: "absolute", bottom: 1, left: 15, color: 'grey' }}>{props.current}</Text>
        <Icon style={{ fontSize: 20, top: 5, color: "#1C2F5D" }} name="right" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}
        animationInTiming={200}
        animationIn="slideInRight"
        animationOut="slideOutRight">
        <View style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius:8, borderTopRightRadius:8 }}>
          <View style={styles.centerContainer}>
            <ScrollView style={{marginTop:50}}>
              
              <RadioButton.Group onValueChange={newValue => {
                update(props.update, value, props.naudotojas, props.changer, newValue)
                  ;
              }} value={value}>
                {modalData.map((s) => (
                  <View style={[styles.row, { height: 50, alignContent: 'center', width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }]} key={s} >
                    
                    <RadioButton.Item
                      style={{ width: 300}}
                      value={s}
                      mode='ios'
                      color='#1C2F5D'
                      label={s}
                      position='trailing'
                    />
                  </View>

                ))}
              {props.update =='miestas'?(
                <View>
                  <View style={[styles.row, { height: 50, alignContent: 'center', width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }]} key={t('visi_miestai')} >
                  <RadioButton.Item
                    style={{ width: 300 }}
                    label={t('visi_miestai')}
                    mode='ios'
                    color='#1C2F5D'
                    value={''}
                    position='trailing'
                  />
                </View>
                  <View style={[styles.row, { height: 50, alignContent: 'center', width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }]} key={t('nuotoliniu')} >
                  <RadioButton.Item
                    style={{ width: 300 }}
                    value={'#'}
                    mode='ios'
                    label={t('nuotoliniu')}
                    position='trailing'
                  />
                </View>
                </View>
              ):(
                <View></View>
              )}
              </RadioButton.Group>
            </ScrollView>
          </View>
        </View>
        <View style={{ backgroundColor: "white" , borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
          <Button style={styles.btn} onPress={() => {
            toggleModal()
            setVidinis(!vidinis)
          }}><Text style={{ color: "white" }}>{t('grizti')}</Text></Button>
        </View>
      </Modal>
    </View>
  );
}

export default ModalUpdateSingle;