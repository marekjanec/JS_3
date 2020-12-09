import React from 'react';

class ProductInCart extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <img src={this.props.picture}></img>
        <p>Cena: {this.props.price}</p>
        <p>Pocet kusov: {this.props.amount}</p>
      </div>
    );
  }
};

export default ProductInCart;