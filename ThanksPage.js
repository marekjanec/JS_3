import React from 'react';
import { withRouter } from 'react-router'

function ThanksPage (props){

  function handleCounter(event){ 
  
    event.preventDefault();
    fetch('http://localhost:8080/counter', {
      method: 'post',
      headers: {'Content-Type':'application/json'}
      })
  };



    return (
      <div>
        <p>Prosím dajte mi minimum na zápočet a už v živote sa nedotknem javascriptu</p>
        <button onClick={handleCounter}>
          <a href="https://www.fiit.stuba.sk/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLeaK6QKBXjpV1fU6Z9pbJ0r9Oh0rdnIhQw&usqp=CAU"></img>
          </a>
        </button>
      </div>
    );
};

export default ThanksPage;

