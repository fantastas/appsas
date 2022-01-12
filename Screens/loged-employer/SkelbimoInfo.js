
import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { TaskContext } from '../../AppState/AppContextState';
import styles from "../MainCss";
import { useTranslation, Trans } from "react-i18next";
import ModalUpdateSingle from "../../functions/ModalUpdateSingle";
import ModalUpdateMultiple from "../../functions/ModalUpdateMultiple";
import ModalUpdateText from "../../functions/ModalUpdateText";
import ModalUpdateTextMulti from "../../functions/ModalUpdateTextMulti";
import ModalUpdateTime from "../../functions/ModalUpdateTime";


const SkelbimoI = ({ route,navigation }) => {
  const { t, i18n } = useTranslation();

  const { user } = useContext(TaskContext);
  const { skelbimas, setSkelbimas } = useContext(TaskContext);
  var items = JSON.parse(skelbimas)
  var naudotojas = items
  useEffect(() => { 
  }, [skelbimas])
  console.log(items)
  return ( 
    <View style={styles.container, { backgroundColor: 'white', flex: 1 }}>
      <View style={[styles.row], { alignItems: 'center', marginTop: 10, marginBottom: 50 }}>
        <Text style={[styles.textCM, { fontSize: 18, position: "absolute", left: 10, top: 2 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
        <Text style={[{ fontWeight: 'bold', fontSize: 20 }]}>{t('skelbimo_informacija')}</Text>
        <Text style={[{ fontWeight: 'bold', fontSize: 20 }]}>{items.skelbimas}</Text>
      </View>
 <ScrollView>
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'darbo_sritis'} name={t('darbuotojo_options_top')[2]} current={items.darbo_sritis} item={t('darbo_sritis')} />
      <ModalUpdateText changer={setSkelbimas} naudotojas={naudotojas} update={'pareigos'} name={t('darbdavio_top_Pozicija')[0]} current={items.pareigos} item={items.pareigos} />
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'darbo_pozicija'} name={t('darbdavio_top_Pozicija')[1]} current={items.darbo_pozicija} item={t('darbo_pozicijos')} />
      <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'sutarties_pobudis'} name={t('darbuotojo_options_top')[4]} current={items.sutarties_pobudis} item={t('sutartis')} />
      <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'etatas'} name={t('darbuotojo_options_top')[5]} current={items.etatas} item={t('etatas')} />
      <ModalUpdateSingle changer={setSkelbimas} naudotojas={naudotojas} update={'miestas'} name={t('darbuotojo_options_top')[7]} current={items.miestas} item={t('miestai')} />
      <ModalUpdateText changer={setSkelbimas} naudotojas={naudotojas} update={'darbo_aprasymas'} name={t('darbdavio_top_Klausimai')[0]} current={items.darbo_aprasymas} item={items.darbo_aprasymas} />
      <ModalUpdateText changer={setSkelbimas} naudotojas={naudotojas} update={'papildomi_klausimai'} name={t('darbdavio_top_Klausimai')[1]} current={items.papildomi_klausimai} item={items.papildomi_klausimai} />
      <ModalUpdateTextMulti changer={setSkelbimas} naudotojas={naudotojas} update={'atlygis'} name={t('darbuotojo_options_top')[8]} names={[t("nuo"),t("iki")]} current={items.atlygis} item={items.atlygis.split('-')} />
      {/* geri */}
      {/* <View style={{backgroundColor:'black',width:'100%',height:20}}></View> */}
      {/* blogi */}
     
      
      <ModalUpdateTime changer={setSkelbimas} naudotojas={naudotojas} update={'galiojimo_laikas'} name={t('darbdavio_top_SkelbimoLaikas')[2]} current={items.galiojimo_laikas} item={items.galiojimo_laikas} />
      
     
      {/* <ModalUpdateMultiple changer={setSkelbimas} naudotojas={naudotojas} update={'kalbos_ir_ju_lygiai'} name={t('darbuotojo_options_top')[6]} current={items.kalbos_ir_ju_lygiai} item={t('kalbos')} /> */}
      </ScrollView>
       </View>
  );
}
export default SkelbimoI


