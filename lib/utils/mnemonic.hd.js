'use strict';

const SeedHD = require("./seed.hd")
const bip39 = require('bip39');
const conf = require("../../conf/hd")

module.exports = class MnemonicHD extends SeedHD {
    constructor(mnemonic, pwd) {
        let mnemonicStr = conf.default_mnemonic //It's public
        if (mnemonic) {
            mnemonicStr = mnemonic
        } else {
            console.warn("-----------  the mnemonic is public, please init mnemonic  ------------")
        }
        let seed = bip39.mnemonicToSeedSync(mnemonicStr, pwd)
        super(seed)
        this.strength = {
            low: 128,
            level15: 160,
            level18: 192,
            high: 256,
        }
        this.wordlists = bip39.wordlists
        this.wordlists.zh = bip39.wordlists.chinese_simplified
    }

    getRandomMnemonic(strength = 128, wordList) {
        return bip39.generateMnemonic(strength, null, wordList)
    }

    validateMnemonic(mnemonic, wordList) {
        return bip39.validateMnemonic(mnemonic, wordList)
    }

    mnemonicToEntropy(mnemonic, wordList) {
        return bip39.mnemonicToEntropy(mnemonic, wordList)
    }

    entropyToMnemonic(entropyMnemonic, wordList) {
        return bip39.entropyToMnemonic(entropyMnemonic, wordList)
    }
};

