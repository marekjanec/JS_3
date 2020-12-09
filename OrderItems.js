import React from 'react';

function OrderItems(props) {
    return (
        <tr>
            <th>{props.id}</th>
            <th>{props.name}</th> 
            <th>{props.amount}</th>
            <th>{props.picture}</th>
            <th>{props.price}</th>
        </tr>
    );
};

export default OrderItems;