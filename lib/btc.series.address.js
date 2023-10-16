'use strict';

import Address from "./base/address.class.js";
import * as btc from "@scure/btc-signer"

import { createHash } from "crypto";
import { encode } from 'coinstring';

import coinInfo from 'coininfo'; // btc series tools kit


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


// https://stevenocean.github.io/2018/09/26/generate-btc-wallet-key.html
// publicKeyToAddress = 》 A = RIPEMD160(SHA256(K))
let publicKeyToAddress = (pub, coin, network) => {
    network = network || coin
    let _network = network.toLowerCase() == "test" ? coin + "-" + network : coin
    let version = coinInfo(_network).versions
    let sha = createHash('sha256').update(pub).digest()
    let pubKeyHash = createHash('rmd160').update(sha).digest()
    let _version = bufferizeVersion(version.public)
    let address = encode(pubKeyHash, _version)
    return { address, pub };
}

export default class BtcSeriesAddress extends Address {
    constructor(hd, coin, networkType) {
        super(hd, coin);
        this.networkType = networkType == 'testnet' ? btc.TEST_NETWORK : btc.NETWORK
    }

    // BTC_P2PKH 
    getAddress(index, account, change) {
        const purpose = 44
        const network = this.networkType
        let { pub, path } = this.getCoinKeyPair(index, account, change, purpose);
        const { address } = btc.p2pkh(pub, network)
        return { address, pub, path };
    };

    // "BTC_P2WPKH"  
    getNativeSegwitAddress(index, account, change) {
        const purpose = 84
        const network = this.networkType
        const { pub, path } = this.getCoinKeyPair(index, account, change, purpose);
        const { address } = btc.p2wpkh(pub, network)
        return { address, pub, path };
    };

    // "BTC_P2SH_P2WPKH"  
    getNestedSegwitAddress(index, account, change) {
        const purpose = 49
        const network = this.networkType
        let { pub, path } = this.getCoinKeyPair(index, account, change, purpose);
        const { address } = btc.p2sh(btc.p2wpkh(pub, network), network);
        // console.log(pri.toString('hex'), address)
        return { address, pub, path };
    };


    // "BTC_P2TR"  
    getTopRootAddress(index, account, change) {

        const purpose = 86
        const network = this.networkType
        let { pub, path } = this.getCoinKeyPair(index, account, change, purpose);

        const { address } = btc.p2tr(pub.subarray(1, 33), undefined, network)
        return { address, pub, path };
    };

    // m/account'/change/address_index
    getAddressByPath(hdPath) {
        let network = this.networkType
        let coin = this.coin
        let { index, account, change } = this.getPath(hdPath)
        let { pri, pub, path } = this.getCoinKeyPair(index, account, change);
        let pubAddress = privateKeyToAddress(pri, coin, network)
        pubAddress.path = path
        pubAddress.pub = pub.toString("hex")
        pubAddress.pri = pri.toString("hex")
        return pubAddress
    };

    getAddressByPrivateKey(privateKey) {
        let pri = Buffer.from(privateKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        return privateKeyToAddress(pri, coin, network)
    }

    getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        return publicKeyToAddress(pub, coin, network)
    }
}
