import React from 'react';
import './App.css';
import calculator from './calculator';

const Basket = ({currencies, products, currencySelecter}) => {

  const getSelectedProducts = (products) => {
    let productsSelected = Object.assign(products);

    return productsSelected.filter((product) => {
      return product.selected;
    });
  }

  const convert = (price, originCurr, destCurr) => {
    return calculator.convert(price, originCurr, destCurr, currencies);
  };

  const getSelectedCurrency = (currencies) => {
    let currenciesSelected = Object.assign(currencies);

    return currenciesSelected.filter((currency) => {
      return currency.selected;
    });
  }

  const Prices = getSelectedProducts(products).map((product) => {
    const selectedConcurrency = getSelectedCurrency(currencies);

    if (selectedConcurrency.length === 0) {
      return (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.selected}</td>
          <td>{product.price}</td>
          <td>{product.currency}</td>
          <td>{(product.price * product.selected).toFixed(2)}</td>
        </tr>
      );
    } else {
      return (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.selected}</td>
          <td>{convert(product.price, product.currency, selectedConcurrency[0].sign)}</td>
          <td>{selectedConcurrency[0].sign}</td>
          <td>{(convert(product.price, product.currency, selectedConcurrency[0].sign) * product.selected).toFixed(2)}</td>
        </tr>
      );
    }
  });

  const Currencies = currencies.map((currency) => {
    return (
      <span key={currency.id} onClick={() => currencySelecter(currency.id)}> {currency.sign} </span>
    );
  });

  const getTotal = (products, currencies) => {
    let total = 0;
    const currenciesSelected = getSelectedCurrency(currencies);
    let sign = '';
    if (currenciesSelected.length === 0) {
      sign = '€';
    } else {
      sign = currenciesSelected[0].sign;
    }

    for (let i = 0; i < products.length; i++) {
      if (products[i].selected > 0) {
        total += Number(convert(products[i].price, products[i].currency, sign)) * products[i].selected;
      }
    }
    return total.toFixed(2);
  };

  const GetTotal = () => {
    return getTotal(products, currencies);
  };

  const getSign = (currencies) => {
    let ImmutablesCurrencies = Object.assign(currencies);

    const selectedCurrencies = ImmutablesCurrencies.filter((currency) => {
      return currency.selected;
    });
    if (selectedCurrencies.length === 0) {
      return "€";
    } else {
      return selectedCurrencies[0].sign;
    }
  };

  const GetSign = () => {
    return getSign(currencies);
  };

  return (
    <div>
      <div className="currencySelecter">
        {Currencies}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Currency</th>
              <th>Total Price</th>              
            </tr>
          </thead>
          <tbody>
            {Prices}
          </tbody>
        </table>
        <div>
          <p>Le total est de {GetTotal()} {GetSign()}</p>
        </div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  currencies: React.PropTypes.array.isRequired,
  products: React.PropTypes.array.isRequired,
  currencySelecter: React.PropTypes.func.isRequired
};

export default Basket;