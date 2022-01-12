import React, { useState, useContext, useEffect } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Linking,
  Text,
  View,
  AppState,
} from 'react-native';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetData } from '../functions/GetData';
import { storeData } from '../functions/StoreData';
import Background from '../assets/background';
import styles from './MainCss';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import { TaskContext } from '../AppState/AppContextState';
import Icon from 'react-native-vector-icons/Entypo';
import Login from '../functions/Log-in';

const RegisterDomain = 'http://job-nestjs.herokuapp.com/users/register'
const confirmEmailDomain = 'http://job-nestjs.herokuapp.com/password/confirm-email'
const googleLoginDomain = 'http://job-nestjs.herokuapp.com/google';
const facebookLoginDomain = 'http://job-nestjs.herokuapp.com/facebook';


const LoginScreen = ({ navigation, route }) => {
  const { access, setAccess, setTasks } = useContext(TaskContext);
  const { t, i18n } = useTranslation();
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLasName] = useState('')
  const [password, setPassword] = useState('')
  const [extrapassword, setextraPassword] = useState('')
  const [secureAgainText, setSecureAgainText] = useState(true)
  const [secureText, setSecureText] = useState(true)
  const [eye, setEye] = useState('eye')
  const [eye2, setEye2] = useState('eye')
  const [checked, setChecked] = React.useState(false);


  const checkMemory = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name)
      jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue
    } catch (e) {
      console.log(e)
    }
  }
  checkMemory('@type')
    .then(data => {
      setType(data);
    })

    .catch(e => console.log(e))


  let fire_token = GetData('fire_token', true)
  const RegisterOptionsWorker = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.toLowerCase(),
      password: password,
      name: name,
      surname: lastName,
      employer: type,
      device_token_fcm: fire_token.token
    })
  }
  const confirmEmailStuff = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.toLowerCase(), })
  }


  const letsRegister = async () => {

    await fetch(RegisterDomain, RegisterOptionsWorker)
      .then(async response => {
        await response.json().then(data => {
          confirmEmail()
          Alert.alert(t('priregistruotas') + email)

        })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }

  const confirmEmail = async () => {
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@user');

    await fetch(confirmEmailDomain, confirmEmailStuff)
      .then(async response => {
        await response.json().then(data => {
          if (data.access_token != undefined) {
            navigation.navigate('LoginScreen')
          }
          else {
            Alert.alert(data.message)
          }
        })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }

  Linking.addEventListener('url', (url) => {
    if (url.url != undefined) {
      let kent = url.url
      kent = kent.split('?')[1]
      setAccess(kent)
      // console.log(url)

      let updateUser = 'http://job-nestjs.herokuapp.com/users/update/' + kent
      let updateUserdata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employer: type,
        })
      }
      let tokenUrl = 'http://job-nestjs.herokuapp.com/users/access-user/' + kent;
      let requestOptions = {
        method: 'GET',
      };
      fetch(`${tokenUrl}`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (data.finished_registration == true) {
            Login().then(data => {
              setTasks(data)
            })
          }
          else {
            fetch(updateUser, updateUserdata).then((response) => {
              Login().then(data => {
                setTasks(data)
              })
            })
          }

        })
      })
    }
  });



  // AppState.addEventListener('change', state => {

  // }
  // )


  const googleLogin = (async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // handleUrl(url)
      await Linking.openURL(url);

    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  })
  const [disabledStyle, setDisabledStyle] = useState({ backgroundColor: 'grey' })
  return (
    <View style={styles.container} >
      <View style={{ position: 'absolute' }}><Background /></View>
      <View style={[styles.row, { paddingBottom: 22, marginTop: 3, width: '100%' }]}>
        <Text style={[styles.textWhite, { position: 'absolute', marginTop: 3, fontSize: 17, zIndex: 2 }]} onPress={() => { navigation.navigate('ChooseType') }}> {t('atgal')}</Text>
        <Text style={[styles.textWhite, styles.middleContainer, { textAlign: 'center', flex: 1, fontSize: 18 }]}>{t('registracija')}</Text></View>

      <ScrollView>
        <View style={[styles.row, styles.toploginRegistrationButtonContainer]}>
          <View style={[styles.background, styles.flex, styles.toploginRegistrationButton]} uppercase={false} ><Text onPress={() => { navigation.navigate("LoginScreen") }} minimumFontScale={2} style={[styles.textCM, styles.toploginRegistrationText]}>{t('Prisijungimas')}</Text></View>
          <View style={[styles.backgroundBlue, styles.flex, styles.toploginRegistrationButton]} uppercase={false}><Text style={[styles.textWhite, styles.toploginRegistrationText]}>{t('Registracija')}</Text></View>
        </View>
        <View><Text style={[styles.textWhite, styles.LoginText, { paddingTop: 10 }]}>{t('Prie_Scovo')}</Text></View>
        <View>
          <View style={[styles.row]}>
            <View style={[styles.background, styles.flex, { marginRight: 10 }, styles.socialConnect]}>
              <Button uppercase={false} onPress={() => { googleLogin(googleLoginDomain) }}><Text style={styles.textCM}>Go {t('google')}</Text></Button>
            </View>
            <View style={[styles.background, styles.flex, styles.socialConnect]}>
              <Button uppercase={false} onPress={() => { googleLogin(facebookLoginDomain) }}><Text style={styles.textCM}>Fb {t('facebook')}</Text></Button>
            </View>

          </View>
          <View><Text style={[styles.textWhite, { paddingTop: 5, textAlign: 'center', paddingBottom: 20 }]}>{t('arba_registruokis')}</Text></View>
          <View style={styles.paddingBottomInput}>
            <TextInput
              mode='none'
              underlineColor='white'
              activeUnderlineColor='white'
              selectionColor="#1C2F5D"

              style={styles.inputText}
              placeholder={t('email')}
              value={email}

              onChangeText={setEmail}
            />
          </View>
          {type == 'false' ? (<View>
            <View style={styles.paddingBottomInput}>
              <TextInput
                style={styles.inputText}
                mode='none'
                underlineColor='white'
                activeUnderlineColor='white'
                selectionColor="#1C2F5D"

                placeholder={t('Vardas')}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.paddingBottomInput}>
              <TextInput
                mode='none'
                underlineColor='white'
                activeUnderlineColor='white'
                selectionColor="#1C2F5D"
                style={styles.inputText}
                placeholder={t('Pavarde')}
                value={lastName}
                onChangeText={setLasName}
              />
            </View>
          </View>
          ) : (<View></View>)}

          <View style={styles.paddingBottomInput}>
            <TextInput
              right={<TextInput.Icon onPress={() => {
                setSecureText(!secureText);
                if (secureText == true) { setEye('eye-with-line') }
                else { setEye('eye') }
              }} name={() => <Icon name={eye} size={20} color={'black'} />} />}

              style={styles.inputText}
              mode='none'
              underlineColor='white'
              activeUnderlineColor='white'
              selectionColor="#1C2F5D"
              placeholder={t('slaptazodis')}
              value={password}
              secureTextEntry={secureText}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.paddingBottomInput}>
            <TextInput
              right={<TextInput.Icon onPress={() => {
                setSecureAgainText(!secureAgainText);
                if (secureAgainText == true) { setEye2('eye-with-line') }
                else { setEye2('eye') }
              }} name={() => <Icon name={eye2} size={20} color={'black'} />} />}
              style={styles.inputText}
              mode='none'
              underlineColor='white'
              activeUnderlineColor='white'
              selectionColor="#1C2F5D"
              placeholder={t('Pakartoti_slaptazodis')}
              value={extrapassword}
              secureTextEntry={secureAgainText}
              onChangeText={setextraPassword}
            />
            <Checkbox.Item
              style={{ marginBottom: 25, width: 300, marginLeft: -20 }}
              label={t('sutinku_prisijunimo')}
              labelStyle={{ color: 'white', fontSize: 14, fontWeight: '700' }}
              position='leading'
              color='white'
              uncheckedColor='white'
              mode='android'
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
                if (checked == false) {
                  setDisabledStyle({})
                }
                else {
                  setDisabledStyle({ backgroundColor: 'grey' })
                }

              }
              }
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button disabled={!checked} mode="contained" uppercase={false} style={[styles.btn, styles.background, { marginBottom: 1, width: '100%', height: 56, paddingBottom: 2 }, disabledStyle]} onPress={() => { letsRegister() }}>
          <Text style={[styles.textCM, styles.textButton, { alignSelf: 'center' }]}>{t('Registruotis')} </Text> </Button>
      </View>
    </View >

  )
}
export default LoginScreen