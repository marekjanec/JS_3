import React, { useState, useEffect } from 'react';
import Order from './Order';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import OrderInfo from './OrderInfo';

const Info = ({match}) => {
return <h1>AHOJJJ {match.params.order_id}</h1>
}



const Admin = () =>{
  const API_URL = `http://localhost:8080/getOrders`

  const [orders,setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setOrders(data);
    console.log(data);
  }

  return ( 
    <Router>
        <table className='admin-list'>
            <tr>
                <th>id</th>
                <th>name</th> 
                <th>address</th>
                <th>city</th>
                <th>zip</th>
                <th>order_state</th>
            </tr>
        {
          orders.map((r, id) => (
            <Order id={r.id} name={r.name} address={r.address} city={r.city} zip={r.zip} order_state={r.order_state}/>
          ))
        }
        
      </table>
      
      <Route path="/info/:order_id" exact component={OrderInfo} />
      
      
    </Router>
  )
}

export default Admin;
