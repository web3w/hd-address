let WAValidator = require('wallet-address-validator');
const TronWeb = require('tronweb');
const Web3 = require('web3');

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("h");
const tronWeb = new TronWeb(fullNode, fullNode);
const web3 = new Web3()


// validate (address [, currency = 'bitcoin'[, networkType = 'prod']])
// address - Wallet address to validate.
// currency - Optional. Currency name or symbol, e.g. 'bitcoin' (default), 'litecoin' or 'LTC'
// networkType - Optional. Use 'prod' (default) to enforce standard address, 'testnet' to enforce testnet address and 'both' to enforce nothing.
let isBtcSeriesAddress = (coin, address, network = "prod") => {
    network = network.toLowerCase() == "test" ? "testnet" : "prod"
    return WAValidator.validate(address, coin, network);
}

module.exports = (coin, address, network) => {
    coin = coin && coin.toUpperCase()
    let isAddress = false
    switch (coin) {
        case "BTC":
            isAddress = isBtcSeriesAddress(coin, address, network)
            break;
        case "BCH":
            isAddress = isBtcSeriesAddress(coin, address, network)
        case "LTC":
            isAddress = isBtcSeriesAddress(coin, address, network)
            break;
        case "ETH":
            isAddress = web3.utils.isAddress(address)
            break;
        case "TRX":
            isAddress = tronWeb.isAddress(address)
            break;
    }
    return isAddress
}

