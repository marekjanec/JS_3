import React, { useState, useEffect } from 'react';
import OrderItems from './OrderItems'

function OrderInfo(props) {
    console.log(props)

    const API_URL = `http://localhost:8080/getInfo?id_order=` + props.match.params.order_id;

    const [products,setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
        console.log(data);
    }

    
    return (
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>amount</th>
                <th>link</th>
                <th>price</th>
            </tr>
            {
                products.map((r, id) => (
                    <OrderItems id={r.id} name={r.name} amount={r.amount} picture={r.picture} price={r.price}  />
                ))
            }
        </table>
    );
    
};

export default OrderInfo;
