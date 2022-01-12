import React, { useState, createContext, useContext, useEffect } from "react";
import { GetData } from "../functions/GetData";
import Login from "../functions/Log-in";

export const TaskContext = createContext();
const TaskContextProvider = (props) => {

    const [tasks, setTasks] = useState('login');
    const [main, setMain] = useState('kortele');
    const [user, setUser] = useState('');
    const [skelbimas, setSkelbimas] = useState('');
    const [access, setAccess] = useState('');
    const [multi, setMulti] = useState([]);
    const [baze, setBaze] = useState('baze');
    const [disabled, setDisabled] = useState(true);
    //unhide me
    // Login().then(data => {
    //     setTasks(data)   
    //     console.log(data)
    // })
    return (
        <TaskContext.Provider value={{ tasks, setTasks, main, setMain,
         user, setUser, skelbimas, setSkelbimas,
         access, setAccess, multi, setMulti, baze, setBaze, disabled, setDisabled }}>
            {props.children}
        </TaskContext.Provider>
    );
};
export default TaskContextProvider

