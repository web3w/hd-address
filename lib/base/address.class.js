'use strict';

module.exports = class Address {
    constructor(hd, coin) {
        this.HD = hd
        this.coin = coin
    }

    getCoinKeyPair(index) {
        return this.HD.getCoinKeyPair(this.coin, index);
    }

    getCoinAddressKeyPair(index) {
        let {path, pri, pub} = this.getCoinKeyPair(index);
        let {address} = this.getAddress(index)
        return {address, path, pri: pri.toString("hex"), pub: pub.toString("hex")};
    };

    getAddress(index) {
        console.log(this.coin, "Please implement  getAddress method")
    }

    getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPrivateKey method")
    }

    getAddressByPublicKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPublicKey method")
    }


}
