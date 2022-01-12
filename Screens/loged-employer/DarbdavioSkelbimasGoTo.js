
import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, Switch } from "react-native-paper";
import styles from "../MainCss";
import { TaskContext } from '../../AppState/AppContextState';
import Updates from "../../functions/updateListing";


const DarbdavioSkelbimasGoTo = (props) => {
  const s  = props.s
  const { skelbimas, setSkelbimas } = useContext(TaskContext);
setSkelbimas(JSON.stringify(s))
  const [isSwitchOn, setIsSwitchOn] = useState(s.is_visible);
  const onToggleSwitch = () => {
    Updates( 'is_visible', !isSwitchOn,  s,   setSkelbimas)
    setIsSwitchOn(!isSwitchOn)
  }; 


   useEffect(() => {
    
}, [skelbimas])
  return (
    <TouchableOpacity key ={s._id} onPress={() => { props.navigation.navigate('skelbimo',{s }) }} style={[styles.innerSelect, { paddingBottom: 20 }]} >
    <Text style={styles.innerSelectText}>{s.pareigos}</Text>
    <Switch color="#1C2F5D" style={{ marginBottom: -15 }} value={isSwitchOn} onValueChange={onToggleSwitch} />
    <Text style={{ position: 'absolute', bottom: 0, left: 10, color: 'grey' }}>{s.galiojimo_laikas}</Text>
</TouchableOpacity>
  );
}
export default DarbdavioSkelbimasGoTo 


 