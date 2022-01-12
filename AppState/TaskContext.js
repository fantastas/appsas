import React, {useState, createContext} from "react";

export const TaskContext = createContext();


 const TaskContextProvider = (props)=>{
     const [tasks, setTasks]= useState([
    {
         name:'Kuti Kuti'
    },
    {
        name: 'DDL PLK'
    },
    {
        name:'FusedTrio'
    }
    ]);

    return (
        <TaskContext.Provider value={{tasks,setTasks}}>
            {props.children}
        </TaskContext.Provider>
    );
 };
 export default TaskContextProvider