import React, { useState, useEffect } from 'react';
import ProductInCart from './ProductInCart';
import Form from './Form';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

const Cart = () =>{
  const API_URL = `http://localhost:8080/cart`

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
    <Router>
      <div>
        <div>
          <button>
            <Link to='/form'> Form </Link>
          </button>
        </div>
        <Route path="/form" exact component={Form}/>
      <div className="products">
        {
          products.map((r, id) => (
            <ProductInCart name={r.name} picture={r.picture} price={r.price} amount={r.amount} />
          ))
        }
      </div>
      </div>
    </Router>
  )
}

export default Cart;
