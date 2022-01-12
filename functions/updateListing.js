import React, { useCallback, useContext, useState } from "react";
import { TaskContext } from "../AppState/AppContextState";


const Updates = async (update, value, naudotojas, changer) => {
    // const { user } = useContext(TaskContext)
    const name = update
    // const value = value
    // const naudotojas = naudotojas
    // console.log(name)
    try {
        var requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:
                JSON.stringify({
                    [update]: value
                })
        };
        var create_listing 
        // console.log('naudojas',user)
        if(naudotojas.is_CV == false || naudotojas.is_CV == true){
         create_listing = 'http://job-nestjs.herokuapp.com/skelbimai/' + naudotojas._id + '';}
        else {
            create_listing = 'http://job-nestjs.herokuapp.com/worker-listing/' + naudotojas._id + '';
        }
        console.log(create_listing)
        const response = await fetch(create_listing, requestOptions)
        const json = await response.json().then(data => {
            // setSkelbimas(data)
            changer(JSON.stringify(data))
            console.log(data)
            
        })
    } catch (error) {
        console.error(error);
    }

}

export default Updates