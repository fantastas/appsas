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

const ModalUpdateTextMulti = (props) => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [vidinis, setVidinis] = useState(false)
  const [value, setValue] = useState(props.item[0]);
  const [value2, setValue2] = useState(props.item[1]);

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
      value = value + '-' + value2
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
    console.log(all, modalData)
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
          <View style={[{ margin: 20, justifyContent: "center", flex: 1 }]}>
            <ScrollView>
              <View key={modalData}>
                <Text style={{ color: "#1C2F5D", fontSize: 17, marginTop: 15, marginLeft: 0, marginBottom: 0 }}>{props.names[0]}</Text>

                <TextInput
                  value={value}
                  onChangeText={setValue}
                  mode="outlined"
                  placeholder={''}
                  numberOfLines={1}
                  multiline={false}
                  selectionColor="#1C2F5D"
                  outlineColor="white"
                  backgroundColor="white"
                  borderWidth={1}
                  borderRadius={8}
                  activeOutlineColor="white"
                />
                <Text style={{ color: "#1C2F5D", fontSize: 17, marginTop: 15, marginLeft: 0, marginBottom: 0 }}>{props.names[1]}</Text>

                <TextInput
                  value={value2}
                  onChangeText={setValue2}
                  mode="outlined"
                  placeholder={''}
                  numberOfLines={1}
                  multiline={false}
                  selectionColor="#1C2F5D"
                  outlineColor="white"
                  backgroundColor="white"
                  borderWidth={1}
                  borderRadius={8}
                  activeOutlineColor="white"
                />
              </View>
            </ScrollView>
          </View>
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

export default ModalUpdateTextMulti;