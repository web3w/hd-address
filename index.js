let Address = {
    BTC: require("./lib/btc.address"),
    ETH: require("./lib/eth.address"),
    TRX: require("./lib/trx.address")
}

module.exports = class ChainAddress {
    constructor(coin, networkType) {
        this.address = new Address[coin](coin, networkType)
    }

    async getKeyPair(index) {
        let {pri, pub} = await this.address.getHDPrivateKey(index);
        let {address} = await this.address.getAddress(index)
        return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
    };
}