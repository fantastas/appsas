import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation, Trans } from "react-i18next";
import { TaskContext } from '../AppState/AppContextState';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//registration
import Language from '../Screens/Language';
import ChooseType from '../Screens/ChooseType';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import Logging from '../Screens/Logging';
//worker-registration
import Labas from '../Screens/setup-worker/Labas';
import Issilavinimas from '../Screens/setup-worker/issilavinimas';
import DarboSritis from '../Screens/setup-worker/darbo-sritis';
import StudijuSritis from '../Screens/setup-worker/studiju-sritis';
import SritiesPogrupiai from '../Screens/setup-worker/sriteis-pogrupiai';
import Patirtis from '../Screens/setup-worker/patirtis';
import Sutartis from '../Screens/setup-worker/sutarties-pobudis';
import Etatas from '../Screens/setup-worker/etatas';
import Kalbos from '../Screens/setup-worker/kalbos';
import Miestai from '../Screens/setup-worker/miestas';
import Atlyginimas from '../Screens/setup-worker/atlyginimas';
import Aprasymas from '../Screens/setup-worker/aprasymas';
import Kontaktai from '../Screens/setup-worker/kontaktai';
import Update from '../Screens/update';
//employer-registration
import LabasE from '../Screens/setup-employer/LabasE';
import AboutE from '../Screens/setup-employer/aboutE';
import LabasEiskelbima from '../Screens/setup-employer/LabasEiskelbima';
import DarboSritisE from '../Screens/setup-employer/darboSritisE';
import PareigosE from '../Screens/setup-employer/pareigosE';
import DarboPozicijaE from '../Screens/setup-employer/darboPozicijaE';
import SutartiesPobudisE from '../Screens/setup-employer/sutartiesPobudisE';
import EtatasE from '../Screens/setup-employer/etatasE';
import KalbosE from '../Screens/setup-employer/kalbosE';
import MiestasE from '../Screens/setup-employer/miestasE';
import AtlyginimasE from '../Screens/setup-employer/atlyginimasE';
import DarboAprasymasE from '../Screens/setup-employer/darboAprasymasE';
import PapildomiKlausimaiE from '../Screens/setup-employer/papildomiKlausimaiE';
import SkelbimoGaliojimasE from '../Screens/setup-employer/skelbimoGaliojimasE';
import KurtiSkelbimaE from '../Screens/setup-employer/kurtiSkelbimaE';
//employer
import Main from '../Screens/loged-employer/Main';
//worker
import MainW from '../Screens/loged-worker/MainW';
import { View } from 'react-native';
import Login from "../functions/Log-in";
import SkelbimoI from '../Screens/loged-worker/SkelbimoInfo';
import SlaptazodzioK from '../Screens/loged-worker/SlaptazodzioKeitimas';
import AsmenineI from '../Screens/loged-worker/asmenineInfo';
import SkelbimoIE from '../Screens/loged-employer/SkelbimoInfo';
import SlaptazodzioKE from '../Screens/loged-employer/SlaptazodzioKeitimas';
import AsmenineIE from '../Screens/loged-employer/asmenineInfo';
import Kalbai from '../functions/Language'
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator(); 
const LoginStack = () => {
  const { tasks, setTasks, access } = useContext(TaskContext);
  
  try{
    if (tasks != "logout"){
    Login().then(data => {
      setTasks(data)
      
    })
  }
  useEffect(() => {
    // console.log('Login Navigator', tasks)
  }, [tasks])
  
  }
  catch(e){console.log(e)}


  return (

    <NavigationContainer theme={MyTheme}>
      {/* {tasks == 'start' ? (
        <Stack.Navigator  >
          <Stack.Group>
            <Stack.Screen name="Logging" component={Logging} />
          </Stack.Group>
        </Stack.Navigator>
      ) : */}
      {tasks == 'login' ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Group>
            <Stack.Screen name="SelectLanguage" component={Language} />
            <Stack.Screen name="ChooseType" component={ChooseType} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="Logging" component={Logging} />
          </Stack.Group>
        </Stack.Navigator>
      ) : tasks == "setup-worker" ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Group>
            <Stack.Screen name="Labas" component={Labas} />
            <Stack.Screen name="Issilavinimas" component={Issilavinimas} />
            <Stack.Screen name="sritis" component={StudijuSritis} />
            <Stack.Screen name="darbo_Sritis" component={DarboSritis} />
            <Stack.Screen name="pogrupiai" component={SritiesPogrupiai} />
            <Stack.Screen name="patirtis" component={Patirtis} />
            <Stack.Screen name="sutartis" component={Sutartis} />
            <Stack.Screen name="etatas" component={Etatas} />
            <Stack.Screen name="kalbos" component={Kalbos} />
            <Stack.Screen name="miestas" component={Miestai} />
            <Stack.Screen name="atlyginimas" component={Atlyginimas} />
            <Stack.Screen name="aprasymas" component={Aprasymas} />
            <Stack.Screen name="kontaktai" component={Kontaktai} />
            <Stack.Screen name="update" component={Update} />

          </Stack.Group>
        </Stack.Navigator>

      ) : tasks == "setup-employer" ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Group>
            <Stack.Screen name="Labas-e" component={LabasE} />
            <Stack.Screen name="aboutE" component={AboutE} options={{ title: 'Apie įmonę' }} />
            <Stack.Screen name="darboSritisE" component={DarboSritisE} />
            <Stack.Screen name="LabasEiskelbima" component={LabasEiskelbima} />
            <Stack.Screen name="pareigosE" component={PareigosE} />
            <Stack.Screen name="darboPozicijaE" component={DarboPozicijaE} />
            <Stack.Screen name="sutartiesPobudisE" component={SutartiesPobudisE} />
            <Stack.Screen name="etatasE" component={EtatasE} />
            <Stack.Screen name="kalbosE" component={KalbosE} />
            <Stack.Screen name="miestasE" component={MiestasE} />
            <Stack.Screen name="atlyginimasE" component={AtlyginimasE} />
            <Stack.Screen name="darboAprasymasE" component={DarboAprasymasE} />
            <Stack.Screen name="papildomiKlausimaiE" component={PapildomiKlausimaiE} />
            <Stack.Screen name="skelbimoGaliojimasE" component={SkelbimoGaliojimasE} />
            <Stack.Screen name="kurtiSkelbimaE" component={KurtiSkelbimaE} />

          </Stack.Group>
        </Stack.Navigator>

      ) : tasks == "loged-employer" ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Group>
      
           
            <Stack.Screen name="main" component={Main} />
            <Stack.Screen name="asmenine" component={AsmenineIE} />
            <Stack.Screen name="skelbimo" component={SkelbimoIE} />
            <Stack.Screen name="slaptazodzio" component={SlaptazodzioKE} />

            <Stack.Screen name="darboSritisE" component={DarboSritisE} />
            <Stack.Screen name="LabasEiskelbima" component={LabasEiskelbima} />
            <Stack.Screen name="pareigosE" component={PareigosE} />
            <Stack.Screen name="darboPozicijaE" component={DarboPozicijaE} />
            <Stack.Screen name="sutartiesPobudisE" component={SutartiesPobudisE} />
            <Stack.Screen name="etatasE" component={EtatasE} />
            <Stack.Screen name="kalbosE" component={KalbosE} />
            <Stack.Screen name="miestasE" component={MiestasE} />
            <Stack.Screen name="atlyginimasE" component={AtlyginimasE} />
            <Stack.Screen name="darboAprasymasE" component={DarboAprasymasE} />
            <Stack.Screen name="papildomiKlausimaiE" component={PapildomiKlausimaiE} />
            <Stack.Screen name="skelbimoGaliojimasE" component={SkelbimoGaliojimasE} />
            <Stack.Screen name="kurtiSkelbimaE" component={KurtiSkelbimaE} />
            <Stack.Screen name="kalbai" component={Kalbai} />

          </Stack.Group>
        </Stack.Navigator>
      ) : tasks == "loged-worker" ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Group>
            <Stack.Screen name="mainW" component={MainW} />
            <Stack.Screen name="asmenine" component={AsmenineI} />
            <Stack.Screen name="skelbimo" component={SkelbimoI} />
            <Stack.Screen name="slaptazodzio" component={SlaptazodzioK} />
            <Stack.Screen name="kalbai" component={Kalbai} />

          </Stack.Group>
        </Stack.Navigator>

      ) : (

        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="SelectLanguage" component={Language} />
            <Stack.Screen name="ChooseType" component={ChooseType} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="Logging" component={Logging} />
          </Stack.Group>
        </Stack.Navigator>
      )
      }

    </NavigationContainer >
  )
}
export default LoginStack;


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};