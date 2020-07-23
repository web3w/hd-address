let walletHD = require("./lib/wallet.hd")

let Address = {
    BTC: require("./lib/btc.series.address"),
    ETH: require("./lib/eth.address"),
    TRX: require("./lib/trx.address")
}

// class ChainAddress {
//     constructor(mnemonic,coin, networkType) {
//         let hd = new walletHD(mnemonic)
//         networkType = networkType || coin
//         this.address = new Address[coin](hd, coin, networkType)
//     }
//
//     async getAddressKeyPair(index) {
//         let {pri, pub} = await this.address.getAddressKeyPair(index);
//         let {address} = await this.address.getAddress(index)
//         return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
//     };
// }

module.exports = (mnemonic) => {
    let hd = new walletHD(mnemonic)
    return {
        BTC: new Address.BTC(hd, "BTC"),
        BTC_TEST: new Address.BTC(hd, "BTC","TEST"),
        BCH: new Address.BTC(hd, "BCH"),
        LTC: new Address.BTC(hd, "LTC"),
        ETH: new Address.ETH(hd),
        TRX: new Address.TRX(hd),
    }
}