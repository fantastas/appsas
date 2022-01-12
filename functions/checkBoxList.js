import React, { useState, useContext, useCallback, useEffect } from "react";
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import styles from "./functionStyles";
import { storeData } from "./StoreData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskContext } from "../AppState/AppContextState";


const CheckBoxList = (props) => {
    var yes = true
    if (props.true) { yes = false }

    const [checked, setChecked] = useState(yes);
    const [items, setItems] = useState(props.elements);
    const [option, setOption] = useState()
    const { multi, setMulti, setDisabled } = useContext(TaskContext)
    const name = props.elements.replace(/\s/g, '')
    var visi = []
    const itemCheck = () => {
        storeData(items, name)
         visi = multi;
        if (checked !== true) {
            if (visi.indexOf(items) >= 0) {
                visi.splice(visi.indexOf(items), 1)
                setMulti(visi)
            }
            
        }
        else {
            if (visi.indexOf(items) >= 0) {
                visi.splice(visi.indexOf(items), 1)
                setMulti(visi)
            } else {
                visi.push(items)
                setMulti(visi)
            }
        }
    }
    if (yes == false && checked == false) {
        let visi = multi;
        if (visi.indexOf(items) < 0) {
            visi.push(items)
            setMulti(visi)
        }
    }
    if(multi[0]== undefined){
        setDisabled(true)
    }
    else{
        setDisabled(false)
    }
    console.log(multi)
    useEffect(() => { 

      }, [multi])
    return (
        <Checkbox.Item key={items}
            position="leading"
            style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                // marginBottom: 30,
            }}
            labelStyle={{ textAlign: 'left', textTransform: 'capitalize' }}
            label={items}
            status={checked ? 'unchecked' : 'checked'}
            onPress={(items) => {
                setChecked(!checked)
                itemCheck(items);

            }}
        />
    )
}
export default CheckBoxList