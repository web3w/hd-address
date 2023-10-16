'use strict';

import HdWallet from "../base/hd.wallet.class.js" 
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32'
const bip32 = BIP32Factory(ecc)
import * as bip39 from 'bip39';


let seedBuff

export default class SeedHD extends HdWallet {
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
        return pwd ? { root, seed, mnemonic, pwd } : { root, mnemonic, seed }
    }

    static mnemonicToSeed(mnemonic, pwd) {
        let seed = bip39.mnemonicToSeedSync(mnemonic, pwd)
        const root = bip32.fromSeed(seed)
        return pwd ? { root, seed, mnemonic, pwd } : { root, mnemonic, seed }
    }
};

