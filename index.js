let Address = {
    BTC: require("./lib/btc.series.address"),
    BCH: require("./lib/btc.series.address"),
    LTC: require("./lib/btc.series.address"),
    ETH: require("./lib/eth.address"),
    TRX: require("./lib/trx.address")
}

module.exports = class ChainAddress {
    constructor(coin, networkType) {
        networkType = networkType || coin
        this.address = new Address[coin](coin, networkType)
    }

    async getKeyPair(index) {
        let {pri, pub} = await this.address.getHDPrivateKey(index);
        let {address} = await this.address.getAddress(index)
        return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
    };
}