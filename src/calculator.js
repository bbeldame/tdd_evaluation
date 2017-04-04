const calculator = {};

calculator.convert = (price, originCur, destCur, currencies) => {
  const currencyOriginStat = currencies.filter((currency) => {
    return (currency.sign === originCur);
  })[0];

  const currencyDestStat = currencies.filter((currency) => {
    return (currency.sign === destCur);
  })[0];

  if (originCur === destCur) {
    return Number(price).toFixed(2);
  } else {
    const priceInDollar = price * currencyOriginStat.fromDollar;
    return (priceInDollar / currencyDestStat.fromDollar).toFixed(2);
  }
};

export default calculator;