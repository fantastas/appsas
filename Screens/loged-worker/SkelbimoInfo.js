
import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { Button, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { TaskContext } from '../../AppState/AppContextState';
import styles from "../MainCss";
import { useTranslation, Trans } from "react-i18next";
import ModalUpdateSingle from "../../functions/ModalUpdateSingle";
import ModalUpdateMultiple from "../../functions/ModalUpdateMultiple";
import ModalUpdateText from "../../functions/ModalUpdateText";
import ModalUpdateTextMulti from "../../functions/ModalUpdateTextMulti";


const SkelbimoI = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const { user } = useContext(TaskContext);
  var naudotojas = JSON.parse(user)
  const { skelbimas, setSkelbimas } = useContext(TaskContext);

  var items = JSON.parse(skelbimas)
console.log(items)
useEffect(() => {
  // console.log('Login Navigator', tasks)
}, [skelbimas])
  return (
    <View style={styles.container, { backgroundColor: 'white', flex: 1 }}>
      <View style={[styles.row], { alignItems: 'center', marginTop: 10, marginBottom: 50 }}>
        <Text style={[styles.textCM, { fontSize: 18, position: "absolute", left: 10, top: 2 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
        <Text style={[{ fontWeight: 'bold', fontSize: 20 }]}>{t('skelbimo_informacija')}</Text>
        <Text style={[{ fontWeight: 'bold', fontSize: 20 }]}>{items.skelbimas}</Text> 
      </View>
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'issilavinimas'} name={t('darbuotojo_options_top')[0]} current={items.issilavinimas} item={t('issilavinimas')} />
      <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'studiju_sritis'} name={t('darbuotojo_options_top')[1]} current={items.studiju_sritis} item={t('sritys')} />
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'darbo_sritis'} name={t('darbuotojo_options_top')[2]} current={items.darbo_sritis} item={t('darbo_sritis')} />
      
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'patirtis'} name={t('darbuotojo_options_top')[3]} current={items.patirtis} item={t('patirtis_metais')} />
     
      <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'sutarties_pobudis'} name={t('darbuotojo_options_top')[4]} current={items.sutarties_pobudis} item={t('sutartis')} />
      <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'etatas'} name={t('darbuotojo_options_top')[5]} current={items.etatas} item={t('etatas')} />
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'miestas'} name={t('darbuotojo_options_top')[7]} current={items.miestas} item={t('miestai')} />
      <ModalUpdateTextMulti changer={setSkelbimas} naudotojas={naudotojas} update={'atlygis'} name={t('darbuotojo_options_top')[8]} names={[t("nuo"),t("iki")]} current={items.atlygis} item={items.atlygis.split('-')} />
      <ModalUpdateText changer={setSkelbimas} naudotojas={naudotojas} update={'aprasymas'} name={t('darbuotojo_options_top')[9]}  current={items.aprasymas} item={items.aprasymas} />
      {/* <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'kalbos_ir_ju_lygiai'} name={t('darbuotojo_options_top')[6]} current={items.kalbos_ir_ju_lygiai} item={t('kalbos')} /> */}

      {/* <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'aprasymas'} name={t('darbuotojo_options_top')[9]} current={items.employer_kind} item={t('employer_kind')} /> */}


    </View>
  );
}
export default SkelbimoI


