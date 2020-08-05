'use strict';

let HdChainCode = require("../base/hd.wallet.class")
const bip32 = require('bip32');
const bip39 = require('bip39');

/**
 * BIP44 提出了5層的路徑建議 m / purpose' / coin_type' / account' / change / address_index
 * purporse' 固定是 44'，代表使用 BIP44。
 * coin_type' 用來表示不同幣種，例如 Bitcoin 就是 0'，Ethereum 是 60'
 * account' 顧名思義，是帳戶的意思。從0’開始。可以理解為Bitcoin-QT中的錢包
 * change：找零。一般使用0對外收款，1接受每次交易的找零
 * address_index: 位址索引
 * @returns {Promise<void>}
 */
module.exports = class Base58HD extends HdChainCode {
    constructor(base58Str) {
        if (base58Str) {
            const root = bip32.fromBase58(base58Str) // 可加入网络信息 得到wif 格式的私钥
            super(root)
        } else {
            throw "base58 undefined "
        }
    }

    static getRandomBase58(strength = 128, pwd) {
        const mnemonic = bip39.generateMnemonic(strength)
        const seed = bip39.mnemonicToSeedSync(mnemonic, pwd)
        const root = bip32.fromSeed(seed)
        const base58 = root.toBase58()
        return pwd ? {root, base58, mnemonic, pwd} : {root,base58, mnemonic}
    }

    static mnemonicToBase58(mnemonic, pwd) {
        const seed = bip39.mnemonicToSeedSync(mnemonic, pwd)
        const root = bip32.fromSeed(seed)
        const base58 = root.toBase58()
        return pwd ? {root, base58, mnemonic, pwd} : {root,base58, mnemonic}
    }
};


