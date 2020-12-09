import React from 'react';

class Product extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event){ 
  alert("Added to cart!")
  event.preventDefault();
  fetch('http://localhost:8080/addToCart', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
    "id_product": this.props.id,
    "amount": this.amount.value,
    })
  });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.props.name}</h1>
          <img src={this.props.picture}></img>
          <p>Cena: {this.props.price}</p>
          <input ref={(ref) => {this.amount = ref}} placeholder="amount" type="number" min="1" name="amount"/>
          <button type="Submit">Objednat</button>
       </form>
      </div>
    );
  }
};

export default Product;
