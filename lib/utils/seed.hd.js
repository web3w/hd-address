'use strict';

const bip32 = require('bip32');
let HdWallet = require("../base/hd.wallet.class")

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
};

