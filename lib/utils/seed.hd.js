'use strict';

let HdWallet = require("../base/hd.wallet.class") 
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39');


let seedBuff

module.exports = class SeedHD extends HdWallet {
    constructor(seed) {
        if (seed) {
            const root = bip32.fromSeed(seed) // 可加入网络信息 得到wif 格式的私钥
            super(root)
            seedBuff = seed
        } else {
            throw "seed undefined"
        }
    }

    static getRandomSeed(strength = 128, pwd) {
        const mnemonic = bip39.generateMnemonic(strength)
        let seed = bip39.mnemonicToSeedSync(mnemonic, pwd)
        const root = bip32.fromSeed(seed)
        return pwd ? {root, seed, mnemonic, pwd} : {root,mnemonic, seed}
    }

    static mnemonicToSeed(mnemonic, pwd) {
        let seed = bip39.mnemonicToSeedSync(mnemonic, pwd)
        const root = bip32.fromSeed(seed)
        return pwd ? {root, seed, mnemonic, pwd} : {root,mnemonic, seed}
    }
};

