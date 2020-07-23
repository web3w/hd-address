'use strict';

let Address = require("./base/address.interface")
const ethJs = require('ethereumjs-util');
const bs58 = require('bs58')
/*
https://cn.developers.tron.network/docs/%E8%B4%A6%E6%88%B7-1
地址格式说明
用公钥P作为输入，计算SHA3得到结果H, 这里公钥长度为64字节，SHA3选用Keccak256。
取H的最后20字节，在前面填充一个字节0x41得到address。
对address进行basecheck计算得到最终地址，所有地址的第一个字符为T。

其中basecheck的计算过程为：
    首先对address计算sha256得到h1，
    再对h1计算sha256得到h2，
    取其前4字节作为check填充到address之后得到address||check，
    对其进行base58编码得到最终结果。
    我们用的字符映射表为：
       ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
 */
let publicKeyToAddress = (pubBuff) => {
    let addrBuff = ethJs.publicToAddress(pubBuff, true)
    let newBuff = Buffer.from([0x41]);
    let AddressBuff = Buffer.concat([newBuff, addrBuff], 21)
    let h1 = ethJs.sha256(AddressBuff)
    let h2 = ethJs.sha256(h1)

    let checksum = Buffer.alloc(4);
    h2.copy(checksum, 0, 0, checksum.length);

    let trxAddress = Buffer.alloc(AddressBuff.length + checksum.length)
    trxAddress = Buffer.concat([AddressBuff, checksum], trxAddress.length);
    return bs58.encode(trxAddress);
}

module.exports = class TrxAddress extends Address {
    constructor(hd) {
        let coin = "TRX"
        super(hd,coin);
    }

    async getAddress(index) {
        let {pub} = await this.getCoinKeyPair(index);
        let address = publicKeyToAddress(pub)
        return {address, pub}
    };

    async getAddressByPrivateKey(privateKey) {
        let pri = Buffer.from(privateKey, 'hex')
        let pub = ethJs.privateToPublic(pri)
        let address = publicKeyToAddress(pub)
        return {address, pub};
    }

    async getAddressByPublicKey(publicKey) {
        let pub = Buffer.from(publicKey, 'hex')
        let address = publicKeyToAddress(pub)
        return {address, pub};
    }
}

