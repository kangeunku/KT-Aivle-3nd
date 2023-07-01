import axios from 'axios';
import React from 'react';

// https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].replace(' ', '');
             if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// function getCookie(name) {
//     var value = "; " + document.cookie;
//     var parts = value.split("; " + name + "=");
//     if (parts.length === 2) {
//       return parts.pop().split(";").shift();
//     }
//   }


const CSRFToken = () => {
    const csrftoken = getCookie('csrftoken');
    // console.log(csrftoken)
    return(
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken || ''}/>
    )
};


export { CSRFToken }