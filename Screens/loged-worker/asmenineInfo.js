import React, { useState, useContext, useEffect } from "react";
import { GetUser } from "../../functions/GetUser";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { TaskContext } from '../../AppState/AppContextState';
import styles from "../MainCss";
import { useTranslation, Trans } from "react-i18next";


const AsmenineI = ({ navigation }) => {
  const { user } = useContext(TaskContext);
  var naudotojas = JSON.parse(user)
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState(naudotojas.email)
  const [name, setName] = useState(naudotojas.name)
  const [surname, setSurname] = useState(naudotojas.surname)

  return (
    <View style={styles.container, { backgroundColor: 'white', flex: 1 }}>
      <View style={[styles.row], { alignItems: 'center', marginTop: 10, marginBottom: 50 }}>
        <Text style={[styles.textCM, { fontSize: 18, position: "absolute", left: 10, top: 2 }]} onPress={() => { navigation.pop() }}>{t('atgal')}</Text>
        <Text style={[{ fontWeight: 'bold', fontSize: 20 }]}>{t('asmenine_informacija')}</Text>
      </View>
      <ScrollView style={{marginBottom:50}} >
        <TextInput
          style={[styles.inputTextsPersonal, { position: 'relative' }]}
          activeOutlineColor="black"
          activeUnderlineColor='none'
          selectionColor="#1C2F5D"
          mode="none"
          placeholder={t('date')}
          value={email}
          onChangeText={setEmail}
          multiline={false}
        />
        <TextInput
          style={[styles.inputTextsPersonal, { position: 'relative' }]}
          activeOutlineColor="black"
          activeUnderlineColor='none'
          selectionColor="#1C2F5D"
          mode="none"
          placeholder={t('date')}
          value={name}
          onChangeText={setName}
          multiline={false}
        />
        <TextInput
          style={[styles.inputTextsPersonal, { position: 'relative', marginBottom: 70 }]}
          activeOutlineColor="black"
          activeUnderlineColor='none'
          selectionColor="#1C2F5D"
          mode="none"
          placeholder={t('date')}
          value={surname}
          onChangeText={setSurname}
          multiline={false}
        />
      </ScrollView>
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <Button
          style={[styles.btn, styles.backgroundBlue, { marginBottom: 50, width: '95%', height: 55 }]}
          contentStyle={{ color: 'white' }}
          mode="contained"
          onPress={() => { update() }}
          uppercase={false} >{t('issaugoti')}</Button>
      </View>

    </View>
  );
}
export default AsmenineI


