'use strict';

import Address from "./base/address.class.js";
import * as btc from "@scure/btc-signer"
 


// https://stevenocean.github.io/2018/09/26/generate-btc-wallet-key.html
// publicKeyToAddress = 》 A = RIPEMD160(SHA256(K))
const publicKeyToAddress = (pub, coin, network) => {
    // network = network || coin
    // let _network = network.toLowerCase() == "test" ? coin + "-" + network : coin
    // let version = coinInfo(_network).versions
    // let sha = createHash('sha256').update(pub).digest()
    // let pubKeyHash = createHash('rmd160').update(sha).digest()
    // let _version = bufferizeVersion(version.public)
    // let address = encode(pubKeyHash, _version)
    return { address, pub };
}

const privateKeyToAddress = (pri, coin, network) => {
    network = network || coin


    let pub = ""
    let address = ""
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
        debugger
        const { address } = btc._pubECDSA(privateKey)
        let pri = Buffer.from(privateKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        debugger
        return privateKeyToAddress(pri, coin, network)
    }

    getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let network = this.networkType
        let coin = this.coin
        return publicKeyToAddress(pub, coin, network)
    }
}
