import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { currencies } from './data/currencies.json';
import { products } from './data/products.json';
import Basket from './Basket';
import Shopping from './Shopping';

class App extends Component {
  constructor(props) {
    super(props);

    const smartProducts = products.map(product => {
      return {...product, selected: 0};
    });

    const smartCurrencies = currencies.map(currency => {
      return {...currency, selected: 0};
    });

    this.state = {
      currencies: smartCurrencies,
      products: smartProducts
    };
  }

  plusOne = (id) => {
    const products = this.state.products.map((product) => {
      if (product._id === id)
        product.selected += 1;
      return product;
    });

    this.setState({products});
  }

  currencySelecter = (id) => {
    const currencies = this.state.currencies.map((currency) => {
      if (currency.id === id)
        currency.selected = true;
      else
        currency.selected = false;
      return currency;
    });
    this.setState({currencies});
  }

  minusOne = (id) => {
    const products = this.state.products.map((product) => {
      if (product._id === id)
        product.selected -= 1;
      return product;
    });

    this.setState({products});
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Multi-Currency Basket</h2>
        </div>
        <Shopping
          products={this.state.products}
          plusOne={this.plusOne}
          minusOne={this.minusOne}
          />
        <hr />
        <Basket
          currencies={this.state.currencies}
          products={this.state.products}
          currencySelecter={this.currencySelecter}
          />
      </div>
    );
  }
}

export default App;
