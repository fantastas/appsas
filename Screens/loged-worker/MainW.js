import React, {useState,useContext, useEffect} from "react";
import { GetUser } from "../../functions/GetUser";
import CardData from "../../functions/fetchCarddarbuotojas";
import { TouchableOpacity, View} from "react-native";
import { Button,Text } from "react-native-paper";
// import { LogOut } from "../../functions/LogOut";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TaskContext} from '../../AppState/AppContextState';
import { GetData } from "../../functions/GetData";
import Background from "../../assets/background";
import styles from "../MainCss";
import BottomNav from "../../functions/bottomNav";
import Varpelis from "../../assets/varpelis";
import ProfileW from "./Profilis";
import NotificationW from "./NotificationsW";
import Login from "../../functions/Log-in";
import SutapeW from "./SutapeW";
import PushNotification from "react-native-push-notification";

const MainW = (navigation)=>{
    const {main, setMain} = useContext(TaskContext);
    const {user,setTasks} = useContext(TaskContext);
    const [loading,setLoading]= useState(false) 
    const [padetis,setPadetis]= useState('')
    const [skelbimoId, setSkelbimoId] = useState(undefined)
    var [token,setToken] = useState(GetData('push_token'))
    var naudotojas = JSON.parse(user)
    const [lougouting,setLogout] = useState(false)
    useEffect(() => {
    }, [main])  
    if(main=='logout'){
        setTasks('login')
        setMain('kortele')
    }
    

    return ( 
    <View style={{flex:1}}>
        { main == 'kortele' ? (<View style={{position: 'absolute',}}><Background/></View>):(<View></View>)}
        { main == 'kortele' ? (
    <View style={[styles.container]}>
            <View>
        <View style={[styles.row,{justifyContent:'space-between',paddingBottom:30}]}>
            <Text style={styles.scobo}>Scobo</Text>
            <TouchableOpacity style={varpas}  onPress={()=>{ setMain('varpelis')
            }}>
            <Varpelis width={30} height={30}/>
           </TouchableOpacity>
        </View>
           <CardData loading={false} />
            </View>
        </View>
        ): main == "sutape" ? (
        <View style={{flex:1}} >
        <SutapeW/>
        </View>
            
        ): main == "profilis" ? (
        <View style={styles.flex}>
            <ProfileW navigation={navigation}/> 
        </View>
        ): main == "varpelis" ? (
        <View style={styles.flex}>
            <NotificationW/>
        </View>

        ):(
            <View></View> 
        )}
        {/* <View>
            <Button onPress={()=>{
                localNotif()
            }}><Text>send notif</Text>
            </Button>
        </View> */}
    <View >
        <BottomNav/>
    </View>
    </View>
      );
}
export default MainW

const varpas = { position: 'absolute', zIndex: 3, right: 5, top:5 }
// const localNotif= ()=> {
//     let soundName= true
//     PushNotification.localNotification({ 
//       channelId:  'sound-channel-id' ,
//       title: 'vidine zinute', // (optional)
//       message: 'pats issiunciau', // (required)
    
//     });
//     console.log(PushNotification.localNotification)
//   }

//   const sendNote = async()=>{
//     var send = {
//         method: 'POST',
//         // body: JSON.stringify({ token: token.token})
//         }
//         var url_sed ='http://job-nestjs.herokuapp.com/users/sendToAll';
//                 try {
//                     const response = await    fetch(url_sed,send )
//                         const json = await  response
//                         console.log(response)
//                     } catch (error) {
//                         console.log('luzo')
//                         console.error(error);
//                     }
// }