'use strict';

import Address from "./base/address.class.js";
import { bufferToHex, toChecksumAddress, publicToAddress, privateToPublic, privateToAddress } from 'ethereumjs-util';
let checksum = (addrBuff) => {
    let address = bufferToHex(addrBuff);
    //EIP55: Mixed-case checksum address encoding
    return toChecksumAddress(address)
}

export default class EthAddress extends Address {
    constructor(hd) {
        let coin = "ETH"
        super(hd, coin);
    }

    getAddress(index) {
        let { pub } = this.getCoinKeyPair(index);
        let addrBuff = publicToAddress(pub, true)
        let address = checksum(addrBuff)
        return { address, pub };
    };

    getAddressByPrivateKey(privateKey) {
        let pri = Buffer.from(privateKey, 'hex')
        let pub = privateToPublic(pri)
        let addrBuff = privateToAddress(pri)
        let address = checksum(addrBuff)
        return { address, pub };
    }

    getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let addrBuff = publicToAddress(pub, true)
        let address = checksum(addrBuff)
        return { address, pub };
    }
}
