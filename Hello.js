import React, {useContext} from "react"
import {TaskContext} from './AppState/TaskContext';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Platform,
    Text,
    View,
    Button
  } from 'react-native';


  function Hello () {
// console.log(TaskContextProvider)
    const {tasks, setTasks} = useContext(TaskContext);

    return <View>
        {/* {tasks.map(item =>{
        <Text> {item.name} </Text>
    })} */}
    <Text> {tasks[0].name}</Text>
    <Button title ="action" onPress={()=>{setTasks([{name:'Afrobeat'}])}}/>
    </View>
  }
  export default Hello