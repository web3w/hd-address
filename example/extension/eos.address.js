'use strict';

const AddressClass = require("../../index").AddressClass

module.exports = class EosAddress extends AddressClass {
    constructor(hd) {
        let coin = "EOS"
        super(hd, coin);
    }

    async getAddress(index) {
        console.log(this.coin, " implement  getAddress method")
    }

    async getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "  implement  getAddressByPrivateKey method")
    }

    async getAddressByPublicKey(privateKey) {
        console.log(this.coin, "  implement  getAddressByPublicKey method")
    }
}
