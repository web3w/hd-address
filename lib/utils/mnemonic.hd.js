'use strict';

const SeedHD = require("./seed.hd")
const bip39 = require('bip39');
const conf = require("../../conf/hd")

class MnemonicHD extends SeedHD {
    constructor(mnemonic, pwd) {
        let mnemonicStr = conf.default_mnemonic //It's public
        if (mnemonic) {
            mnemonicStr = mnemonic
        } else {
            console.warn("-----------  the mnemonic is public, please init mnemonic  ------------")
        }
        let seed = bip39.mnemonicToSeedSync(mnemonicStr, pwd)
        super(seed)
    }

    static getRandomMnemonic(strength = 128, wordList) {
        return bip39.generateMnemonic(strength, null, wordList)
    }

    static validateMnemonic(mnemonic, wordList) {
        return bip39.validateMnemonic(mnemonic, wordList)
    }

    static mnemonicToEntropy(mnemonic, wordList) {
        return bip39.mnemonicToEntropy(mnemonic, wordList)
    }

    static entropyToMnemonic(entropyMnemonic, wordList) {
        return bip39.entropyToMnemonic(entropyMnemonic, wordList)
    }
};

MnemonicHD.wordLists = bip39.wordlists
MnemonicHD.wordLists.CN = bip39.wordlists.chinese_simplified

module.exports = MnemonicHD

