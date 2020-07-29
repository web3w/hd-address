'use strict';

module.exports = class Address {
    constructor(hd, coin) {
        this.HD = hd
        this.coin = coin
    }

    getCoinKeyPair(index) {
        return this.HD.getCoinKeyPair(this.coin, index);
    }

    getAddress(index) {
        console.log(this.coin, "Please implement  getAddress method")
    }

    getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPrivateKey method")
    }

    getAddressByPublicKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPublicKey method")
    }

    getAddressKeyPair(index) {
        let {pri, pub} = this.getCoinKeyPair(index);
        let {address} = this.getAddress(index)
        return {pri: pri.toString("hex"), pub: pub.toString("hex"), address};
    };
}
