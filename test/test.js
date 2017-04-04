import assert from 'assert';
import App from '../src/App';
import Shopping from '../src/Shopping';
import Basket from '../src/Basket';
import { currencies } from '../src/data/currencies.json';
import { products } from '../src/data/products.json';
import { expect } from 'chai';
import calculator from '../src/calculator';

describe ('Shopping', () => {
    /* 
    ** On verifie nos données d'entrée
    **
    ** Ici le test se fait sur un json 
    ** que l'on récupére mais il faut imaginer
    ** que l'on recupere ceci depuis une API 
    */
    it ('should GET all products and currencies', () => {
        expect(currencies).to.be.a('array');
        expect(currencies).to.have.lengthOf(3);
        expect(currencies[0]).to.have.property('name');
        expect(products).to.be.a('array');
        expect(products).to.have.lengthOf(10);
        expect(products[0]).to.have.property('name');
    });

    it ('should return the same price', () => {
        const currencies = [
            {"id":0, "name": "chr", "sign": "CHF", "fromDollar": 0.997705},
            {"id":1, "name": "dollar", "sign": "$", "fromDollar": 1},
            {"id":2, "name": "euro", "sign": "€", "fromDollar": 1.06575}
        ];
        const price = calculator.convert(120, "CHF", "CHF", currencies);
        expect(price).to.eql('120.00');
        const priceInEuro = calculator.convert(120, "CHF", "€", currencies)
        expect(priceInEuro).to.eql('112.34');
        const priceInDollar = calculator.convert(250, "$", "€", currencies)
        expect(priceInDollar).to.eql('234.58');
    });
});