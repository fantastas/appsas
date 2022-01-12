import React, { useState, useContext } from 'react';
import {
  View,
  Linking,
  Alert,
  ScrollView
} from 'react-native';
import { useTranslation, Trans } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeData } from '../functions/StoreData';
import { GetData } from '../functions/GetData';
import Background from '../assets/background';
const googleLoginDomain = 'http://job-nestjs.herokuapp.com/google';
const facebookLoginDomain = 'http://job-nestjs.herokuapp.com/facebook';
const LoginDomain = 'http://job-nestjs.herokuapp.com/users/login';
const forgotURl = 'http://job-nestjs.herokuapp.com/password/forgot';
import styles from './MainCss';
import {
  Button,
  TextInput,
  Text,
} from 'react-native-paper';
import  Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TaskContext } from '../AppState/AppContextState';
import { Link } from '@react-navigation/native';
import Dialog from "react-native-dialog";
// import Icon from 'react-native-vector-icons/AntDesign';

const LoginScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const { access, setAccess, setMain } = useContext(TaskContext);

  const [isEnabled, setEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [emailReset, setEmailReset] = useState('')
  const [password, setPassword] = useState('')
  const [secureText, setSecureText] = useState(true)
  const [visible, setVisible] = useState(false)
  const [eye,setEye] = useState('eye')

  const toggleSwitch = () => {
    setEnabled(!isEnabled)
  }

  const googleLogin = (async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  })
  
  const forgot = ( (url) => {setVisible(true)})
  const handleCancel = () => {  setVisible(false); };

  const handleSend = async (url) => {
    let forgotData ={
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailReset.toLowerCase(),
      })
    }
    
    fetch(url,forgotData)
    .then(async response=>{
      console.log(response)
        if(response.status == 400){
            Alert.alert('No such email')
          }
          else{
            Alert.alert('Please check your email', emailReset)
          }
    })
    setVisible(false);
  };
  let fire_token = GetData('fire_token', true)
  console.log(fire_token.token)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email:email.toLowerCase(),
      password: password,
      device_token_fcm: fire_token.token
    })
  };
  const letsLogIn = () => {
    fetch(LoginDomain, requestOptions)
      .then(async response => {
        await response.json().then(data => {
          if(data.statusCode == 400){
            Alert.alert(data.message)
          }
          else{
            
            AsyncStorage.removeItem('@access_token')
            storeData(data.access_token, '@access_token')
            setAccess(data.access_token)
            setMain('kortele')
            console.log(data)
            navigation.navigate('Logging', { token: data.access_token })
          }
        })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }
  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute' }}><Background /></View>

      <View style={[styles.row, { paddingBottom: 22, marginTop: 3, width: '100%' }]}>
        <Text style={[styles.textWhite, { position: 'absolute', marginTop: 3, fontSize: 17, zIndex: 2 }]} onPress={() => { navigation.navigate('ChooseType') }}> {t('atgal')}</Text>
        <Text style={[styles.textWhite, styles.middleContainer, { textAlign: 'center', flex: 1, fontSize: 18 }]}>{t('prisijungimas')}</Text></View>

      <ScrollView>
        <View style={[styles.row, styles.toploginRegistrationButtonContainer]}>
          <View style={[styles.background, styles.flex, styles.toploginRegistrationButton]} uppercase={false} ><Text minimumFontScale={2} style={[styles.textCM, styles.toploginRegistrationText]}>{t('Prisijungimas')}</Text></View>
          <View style={[styles.backgroundBlue, styles.flex, styles.toploginRegistrationButton]} uppercase={false}><Text onPress={() => { navigation.navigate("RegistrationScreen") }} style={[styles.textWhite, styles.toploginRegistrationText]}>{t('Registracija')}</Text></View>
        </View>
        <View><Text style={[styles.textWhite, styles.LoginText, { paddingTop: 10}]}>{t('Prie_Scovo')}</Text></View>

        <View>
          <View style={[styles.row]}>
            <View style={[styles.background, styles.flex, { marginRight: 10 }, styles.socialConnect]}>
              <Button uppercase={false} onPress={() => { googleLogin(googleLoginDomain) }}><Text style={styles.textCM1}>Go {t('google')}</Text></Button>
            </View>
            <View style={[styles.background, styles.flex, styles.socialConnect]}>
              <Button uppercase={false} onPress={() => { googleLogin(facebookLoginDomain) }}><Text style={styles.textCM1}>Fb {t('facebook')}</Text></Button>
            </View>

          </View>
        </View>
        <View style={{ paddingTop: 58 }}>
          
          <TextInput
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            style={[styles.inputText]}
            placeholder={t('email')}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <TextInput
            activeUnderlineColor='white'
            selectionColor="#1C2F5D"
            mode='flat'
            right={<TextInput.Icon onPress={() => { setSecureText(!secureText);
              if(secureText == true){setEye('eye-with-line')}
              else{setEye('eye')}
            }} name={() => <Icon name={eye} size={20} color={'black'} />} />}
            style={[styles.inputText]}
            placeholder={t('slaptazodis')}
            value={password}
            secureTextEntry={secureText}
            onChangeText={setPassword}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ marginBottom: 25, marginTop:25,marginLeft:5 }}>
            <Text onPress={()=>{
              forgot(forgotURl)
            }} style={[styles.textWhite, { fontSize: 15 }]} >{t('pamirsauSlaptazodi')}?</Text>
          </View>
          <View>
            <Dialog.Container visible={visible}>
        <Dialog.Title>Reset password</Dialog.Title>
        <Dialog.Description>
          Enter your email
        </Dialog.Description>
        <Dialog.Input 
        value={emailReset}
         onChangeText={setEmailReset}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={()=>{handleCancel()}} />
        <Dialog.Button label="Send" onPress={()=>{handleSend(forgotURl)}} />
      </Dialog.Container></View>
        </View>
      </ScrollView>
          <View >
            <Button mode="contained" style={[styles.btn, styles.background, { marginBottom: 1, width: '100%', height: 56, paddingBottom: 0 }]} uppercase={false} onPress={() => { letsLogIn() }}> <Text style={[styles.textCM, styles.textButton]}>{t('Prisijungti')} </Text></Button>
          </View>
    </View>

  )
}
export default LoginScreen