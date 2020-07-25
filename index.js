let walletHD = require("./lib/utils/wallet.hd")

let Address = {
    BTC: require("./lib/btc.series.address"),
    ETH: require("./lib/eth.address"),
    TRX: require("./lib/trx.address")
}

module.exports = (mnemonic) => {
    let hd = new walletHD(mnemonic)
    return {
        BTC: new Address.BTC(hd, "BTC"),
        BTC_TEST: new Address.BTC(hd, "BTC", "TEST"),
        BCH: new Address.BTC(hd, "BCH"),
        BCH_TEST: new Address.BTC(hd, "BCH", "TEST"),
        LTC: new Address.BTC(hd, "LTC"),
        LTC_TEST: new Address.BTC(hd, "LTC", "TEST"),
        ETH: new Address.ETH(hd),
        TRX: new Address.TRX(hd),
    }
}