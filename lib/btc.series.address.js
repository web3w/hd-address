'use strict';

let Address = require("./base/address.interface")
let crypto = require("crypto")
let cs = require('coinstring')

const coinInfo = require('coininfo') // btc series tools kit
const coinKey = require('coinkey')

// accepts hex string sequence with or without 0x prefix
let hexStringToBuffer = (input) => {
    let isValidRE = /^(0x)?([\dA-Fa-f]{2})+$/g
    if (!isValidRE.test(input)) throw new Error('invalid hex string.')
    return Buffer.from(input.slice(input.slice(0, 2) === '0x' ? 2 : 0), 'hex')
}

let beUIntToBuffer = (num) => {
    let length
    if (num === 0) length = 1
    else if (num > 0) length = Math.ceil((Math.log(num + 1) / Math.log(2)) / 8)
    let buf = Buffer.alloc(length)
    buf.writeUIntBE(num, 0, length)
    return buf
}


let bufferizeVersion = (version) => {
    if (typeof version === 'string') return hexStringToBuffer(version)
    if (typeof version === 'number') return beUIntToBuffer(version)
    throw new Error('invalid version type.')
}

let privateKeyToAddress = (pri, coin, network) => {
    network = network || coin
    let _network = network.toLowerCase() == "test" ? coin + "-" + network : coin
    let version = coinInfo(_network).versions
    let ck = new coinKey(pri, version)

    let pub = ck.publicKey
    let address = ck.publicAddress
    return {address, pub};
}

// https://stevenocean.github.io/2018/09/26/generate-btc-wallet-key.html
// publicKeyToAddress = 》 A = RIPEMD160(SHA256(K))
let publicKeyToAddress = (pub, coin, network) => {
    network = network || coin
    let _network = network.toLowerCase() == "test" ? coin + "-" + network : coin
    let version = coinInfo(_network).versions
    let sha = crypto.createHash('sha256').update(pub).digest()
    let pubKeyHash = crypto.createHash('rmd160').update(sha).digest()
    let _version = bufferizeVersion(version.public)
    let address = cs.encode(pubKeyHash, _version)
    return {address, pub};
}

module.exports = class BtcSeriesAddress extends Address {
    constructor(hd, coin, networkType) {
        super(hd, coin);
        this.networkType = networkType
    }

    async getAddress(index) {
        let network = this.networkType
        let coin = this.coin
        let {pri} = await this.getCoinKeyPair(index);
        return privateKeyToAddress(pri, coin, network)
    };

    async getAddressByPrivateKey(privateKey) {
        let pri = Buffer.from(privateKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        return privateKeyToAddress(pri, coin, network)
    }

    async getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        return publicKeyToAddress(pub, coin, network)
    }
}
