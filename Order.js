import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

function Order (props) {

    function handleSetPaid(event){ 
        alert(props.id + " " + props.name + " "+ " paid!")
        event.preventDefault();
        fetch('http://localhost:8080/paidOrder', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          "id_order": props.id,
          })
    });
    };
    
    var path = '/info/:' + props.id;

    return (
        <tr>
            <th>{props.id}</th>
            <th>{props.name}</th> 
            <th>{props.address}</th>
            <th>{props.city}</th>
            <th>{props.zip}</th>
            <th>{props.order_state}</th>
            <button onClick={handleSetPaid}>Set paid</button>
            <button>
                <Link to={path}> Info </Link>
            </button> 
        </tr>
    );
};

export default Order;
