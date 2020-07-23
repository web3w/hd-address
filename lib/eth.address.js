'use strict';

let Address = require("./base/address.interface")
const ethJs = require('ethereumjs-util');
let checksum = (addrBuff) => {
    let address = ethJs.bufferToHex(addrBuff);
    //EIP55: Mixed-case checksum address encoding
    return ethJs.toChecksumAddress(address)
}

module.exports = class EthAddress extends Address {
    constructor(hd) {
        let coin = "ETH"
        super(hd,coin);
}

    async getAddress(index) {
        let {pub} = await this.getCoinKeyPair(index);
        let addrBuff = ethJs.publicToAddress(pub, true)
        let address = checksum(addrBuff)
        return {address, pub};
    };

    async getAddressByPrivateKey(privateKey) {
        let pri = Buffer.from(privateKey, 'hex')
        let pub = ethJs.privateToPublic(pri)
        let addrBuff = ethJs.privateToAddress(pri)
        let address = checksum(addrBuff)
        return {address, pub};
    }

    async getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let addrBuff = ethJs.publicToAddress(pub, true)
        let address = checksum(addrBuff)
        return {address, pub};
    }
}
