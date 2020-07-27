'use strict';

module.exports = class Address {
    constructor(hd, coin) {
        this.HD = hd
        this.coin = coin
    }

    async getCoinKeyPair(index) {
        return this.HD.getCoinKeyPair(this.coin, index);
    }

    async getAddress(index) {
        console.log(this.coin, "Please implement  getAddress method")
    }

    async getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPrivateKey method")
    }

    async getAddressByPublicKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPublicKey method")
    }

    async getAddressKeyPair(index) {
        let {pri, pub} = await this.getCoinKeyPair(index);
        let {address} = await this.getAddress(index)
        return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
    };
}
