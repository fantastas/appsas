import React, { useState, useContext, useEffect } from "react";
import { GetData } from "../../functions/GetData";
import CardData from "../../functions/fetchCard";
import { Button, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskContext } from '../../AppState/AppContextState';
import Background from "../../assets/background";
import styles from "../MainCss";
import BottomNav from "../../functions/bottomNavEmployer";
import Varpelis from "../../assets/varpelis";
import ProfileW from "./Profilis";
import NotificationW from "./NotificationsW";
import Skelbimai from "./Skelbimai";
import SutapeE from "./SutapeE";
import DB from "./DB";

const Main = ({navigation}) => {
    const { main, setMain } = useContext(TaskContext);
    const { tasks, setTasks, user } = useContext(TaskContext);
    const [loading, setLoading] = useState(false)
    const [padetis, setPadetis] = useState('')
    var [token, setToken] = useState(GetData('push_token'))
    return (
        <View style={{ flex: 1 }}>
            {main == 'kortele' ? (<View style={{ position: 'absolute', }}><Background /></View>) : (<View></View>)}

            {main == 'kortele' ? (
                <View style={[styles.container]}>
                    <View>
                        <View style={[styles.row, { justifyContent: 'space-between', paddingBottom: 15 }]}>
                            <Text style={styles.scobo}>Scobo</Text><TouchableOpacity style={{ position: 'relative', zIndex: 3 }} onPress={() => {
                                setMain('varpelis')
                            }}>
                                <Varpelis width={30} height={30} />
                                </TouchableOpacity>
                                </View>
                        <View >
                                <CardData loading={false} />
                        </View>

                    </View>
                </View>
            ) : main == "sutape" ? (
            <View style={styles.flex}>
                <SutapeE/>
            </View>
            ) : main == "profilis" ? (
                <View style={styles.flex}>
                    <ProfileW navigation={navigation} />
                </View>
            ) : main == "varpelis" ? (
                <View style={styles.flex}>
                    <NotificationW />
                </View>

            ) : main == "darbuotojai" ? (
                <View style={styles.flex}>
                    <DB loading={false}/>
                </View>

            ) : main == "skelbimai" ? (
                <View style={styles.flex}>
                    <Skelbimai navigation={navigation} />
                </View>

            ) : (
                <View></View>
            )}
            <View >
                <BottomNav />
            </View>
        </View>
    );
}
export default Main

