import React, { useCallback, useMemo, useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import LoginStack from './navigation/LoginNavigator'
import TaskContextProvider from './AppState/AppContextState';
import NotifService from './notification/NofifService';
import Lang from './Language/i18n';

const App = () => {
  const onRegister = useCallback(() => { }, [])
  const onNotif = useCallback(() => { }, [])
  Lang()
  useEffect(() => {
    Lang()
    // console.log('lang:', Lang)
  }, [])
  const notif = useMemo(() => {
    return new NotifService(onRegister, onNotif)
  }, [])

  return (
    <MainRender />
  )
}
export default App




const MainRender = () => {
  return (
    <SafeAreaView style={styles.container} >
      <TaskContextProvider>
        <LoginStack />
      </TaskContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    fontSize: 28,
    flex: 1,
  },
  text: {
    fontSize: 28,
  }
});


