'use strict';

module.exports = class Address {
    constructor(hd,coin) {
        this.HD = hd
        this.coin = coin
    }

    async getCoinKeyPair(index) {
        return this.HD.getCoinKeyPair(this.coin, index);
    }

    async getAddress(index) {

    }

    async getAddressByPrivateKey(privateKey) {

    }

    async getAddressByPublicKey(privateKey) {

    }

    async getAddressKeyPair(index) {
        let {pri, pub} = await this.getCoinKeyPair(index);
        let {address} = await this.getAddress(index)
        return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
    };
}
