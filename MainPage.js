import React, { useState, useEffect } from 'react';
import Product from './Product';

const MainPage = () =>{

  const API_URL = `http://localhost:8080/getProducts`

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
    <div>
      {
        products.map((r, id) => (
          <Product id={r.id} name={r.name} picture={r.picture} price={r.price}  />
        ))
      }
    </div>
  )
}

export default MainPage;
