import React, { useState, useEffect } from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { LogBox, Text } from 'react-native';
import { View } from 'react-native-animatable';
import styles from '../Screens/MainCss';

const StepsRender = (props) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])


  const configs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#FFFFFF',
    stepStrokeWidth: 5,
    stepStrokeFinishedColor: '#FFFFFF',
    stepStrokeUnFinishedColor: '#FFFFFF',
    separatorFinishedColor: '#8A8A8E',
    separatorUnFinishedColor: '#8A8A8E',
    stepIndicatorFinishedColor: '#8A8A8E',
    stepIndicatorUnFinishedColor: '#8A8A8E',
    stepIndicatorCurrentColor: '#1C2F5D',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1C2F5D',
    stepIndicatorLabelFinishedColor: '#8A8A8E',
    stepIndicatorLabelUnFinishedColor: '#8A8A8E',
    labelColor: '#999999',
    labelSize: 18,
    currentStepLabelColor: '#1C2F5D',
    useNativeDriver: false,

  };
  const labels = props.items;
  const step = props.step;
console.log(step)
const style1 = {backgroundColor:'#1C2F5D', width:30,height:30, borderRadius:20, borderColor:'white',borderWidth:5}
const style2 = {backgroundColor:configs.separatorFinishedColor, width:30,height:30, borderRadius:20, borderColor:'white',borderWidth:5}
const text1 =  {justifyContent:'center',color:'#1C2F5D', fontSize:18}
const text2 =  {justifyContent:'center',color:'#1C2F5D', fontSize:18}
  return (
    <View style={[{width:'100%',justifyContent:'space-evenly',position:'relative'},styles.row]}>
      {/* {props.noStart == true ? (<View></View>) : (<View style={{ position: 'absolute', borderColor: '#8A8A8E', borderWidth: 1, width: '30%', left: 0, top: 11 }}></View>)} */}
      {/* {props.noEnd == true ? (<View></View>) : ( */}
      <View style={{ position: 'absolute', borderColor: '#8A8A8E', borderWidth: 0.5, width: '100%', right: 0, top: 15 }}></View>
      {/* )} */}
          {labels.map( (s,i)=>
            <View key = {s} style={[styles.center,{width:'30%'}]}> 
             <View  style={step == i ? (style1):(style2)}></View>
            <Text  style={step == i ? (text1):(text2)}>{s}</Text>
             </View>
          )}
    </View>

  )
}
export default StepsRender
