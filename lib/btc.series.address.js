'use strict';

import Address from "./base/address.class.js";
import * as btc from "@scure/btc-signer"

import { secp256k1 } from '@noble/curves/secp256k1';


export default class BtcSeriesAddress extends Address {
    constructor(hd, coin, networkType) {
        super(hd, coin);
        this.networkType = networkType == 'testnet' ? btc.TEST_NETWORK : btc.NETWORK
    }

    // BTC_P2PKH 
    getAddress(index, account, change) {
        const purpose = 44
        const network = this.networkType
        let { pub, path, pri } = this.getCoinKeyPair(index, account, change, purpose);
        const { address } = btc.p2pkh(pub, network)
        return { address, pub, path, pri };
    };

    // BTC_P2PKH
    getLegacyAddress(index, account, change) {
        const purpose = 44
        const network = this.networkType
        let { pub, path, pri } = this.getCoinKeyPair(index, account, change, purpose);
        const { address } = btc.p2pkh(pub, network)
        return { address, pub, path, pri };
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
        const network = this.networkType
        const coin = this.coin
        
        const { index, account, change, purpose } = this.getPath(hdPath, coin)

        const { pri, pub, path } = this.getCoinKeyPair(index, account, change, purpose);

        let btcAddr = btc.p2pkh(pub, network)
        if (coin == "BTC_P2WPKH") {
            btcAddr = btc.p2wpkh(pub, network)
        } else if (coin == "BTC_P2TR") {
            btcAddr = btc.p2tr(pub.subarray(1, 33), undefined, network)
        } else if (coin == "BTC_P2SH_P2WPKH") {
            btcAddr = btc.p2sh(btc.p2wpkh(pub, network), network);
        }
        return { address: btcAddr.address, path, pub: pub.toString('hex'), pri: pri.toString('hex') }
    };

    getCoinAddressKeyPair(index, account, change) {
        const network = this.networkType
        const coin = this.coin
        let purpose = 44
        if (coin == "BTC_P2WPKH") {
            purpose = 84
        } else if (coin == "BTC_P2SH_P2WPKH") {
            purpose = 49
        } else if (coin == "BTC_P2TR") {
            purpose = 86
        } else if (coin == "BTC_P2PKH") {
            purpose = 44
        }

        const { pri, pub, path } = this.getCoinKeyPair(index, account, change, purpose);

        let btcAddr = btc.p2pkh(pub, network)
        if (coin == "BTC_P2WPKH") {
            btcAddr = btc.p2wpkh(pub, network)
        } else if (coin == "BTC_P2TR") {
            btcAddr = btc.p2tr(pub.subarray(1, 33), undefined, network)
        } else if (coin == "BTC_P2SH_P2WPKH") {
            btcAddr = btc.p2sh(btc.p2wpkh(pub, network), network);
        }
        return { address:btcAddr.address, path, pri: pri.toString("hex"), pub: pub.toString("hex") };
    };


    getAddressByPrivateKey(privKey) {
        const network = this.networkType
        const coin = this.coin

        //'pkh' | 'wpkh' | 'tr'
        let adderType = 'pkh'
        if (coin == "BTC_P2WPKH") {
            adderType = 'wpkh'
        } else if (coin == "BTC_P2TR") {
            adderType = 'tr'
        } else if (coin == "BTC_P2PKH") {
            adderType = 'pkh'
        } 
        const address = btc.getAddress(adderType, privKey, network)
        const pub = secp256k1.getPublicKey(privKey, true)
        return { address, pub };
    }

    // getAddressByPublicKey(publicKey) {
    //     let pub = Buffer.from(publicKey, 'hex')
    //     let network = this.networkType
    //     let coin = this.coin
    //     return publicKeyToAddress(pub, coin, network)
    // }
}
