import React, { useState } from "react";
import axios from 'axios';


function send(state, data, callback){
    const csrftoken = document.getElementsByName("csrftoken").value;
    axios.get("http://127.0.0.1:8000/", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        params:{
            state: state,
            data: data,
            callback: callback,
        }
    })
    .then(function (response) {
        console.log(response);
        console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
    });
}

function stt_common(){
    
}

export { send };






