import React, { useContext, useState } from "react";
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

const ModalUpdateMultiple = (props) => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [vidinis, setVidinis] = useState(false)
  const [value, setValue] = useState('');
  const { multi, setMulti } = useContext(TaskContext)

  // const name = props.elements.replace(/\s/g, '')
  var modalData = props.item

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clearSelect = () => {
    AsyncStorage.removeItem(name);
  }
  const update = (update, value, naudotojas, changer) => {
    try {
      console.log('multi viduje', multi)
      value = multi.join(',')
      Updates(update, value, naudotojas, changer)
    }
    catch (e) { console.log(e) }
  }
  var current = props.current.split(',')
  // console.log(current)
  // modalData.map((el) => {
  // console.log(t(el))
  //   AsyncStorage.removeItem(el.replace(/\s/g, ''))
  // })
  // setMulti(current)
  return (
    <View >
      <TouchableOpacity style={[styles.innerSelect, { paddingBottom: 18 }]} onPress={() => {
        if (vidinis !== true) { toggleModal(); }
        else { clearSelect() }
        setVidinis(!vidinis)

      }}
      >
        <Text style={styles.innerSelectText}>{props.name}</Text>
        {/* <Text style={{position:"absolute",bottom:0,left:10,color:'grey'}}>{props.current}</Text> */}
        <Icon style={{ fontSize: 20, top: 5 }} name="right" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}
        animationInTiming={200}
        animationIn="slideInRight"
        animationOut="slideOutRight">
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Text style={[styles.label]}>{props.elements}</Text>
          <View style={[styles.centerContainer, { marginBottom: 20, marginTop: 20 }]}>
            <ScrollView>
              {modalData.map((item) => (
                {
                  ...current.indexOf(item) != -1 ? (
                    <CheckBoxList key={item} elements={item} true={true} />
                  ) : (
                    <CheckBoxList key={item} elements={item} true={false} />
                  )
                }
                // <Checkbox.Item 
                //   key={item}
                //   position="trailing"
                //   label={item}
                //   icon={false}
                //   status={checked ? 'checked' : 'unchecked'}
                //   onPress={() => {
                //     // toggleModal();
                //     setChecked(!checked)
                //   }} />
              ))}
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

export default ModalUpdateMultiple;