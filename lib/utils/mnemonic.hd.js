'use strict';

import SeedHD from "./seed.hd.js";
import {
    mnemonicToSeedSync, generateMnemonic,
    validateMnemonic as _validateMnemonic, mnemonicToEntropy as _mnemonicToEntropy,
    entropyToMnemonic as _entropyToMnemonic, wordlists
} from 'bip39'; 

const default_mnemonic =   "star star star star star star";

class MnemonicHD extends SeedHD {
    constructor(mnemonic, pwd) {
        let mnemonicStr = default_mnemonic //It's public
        if (mnemonic) {
            mnemonicStr = mnemonic
        } else {
            console.warn("-----------  the mnemonic is public, please init mnemonic  ------------")
        }
        let seed = mnemonicToSeedSync(mnemonicStr, pwd)
        super(seed)
    }

    static getRandomMnemonic(strength = 128, wordList) {
        return generateMnemonic(strength, null, wordList)
    }

    static validateMnemonic(mnemonic, wordList) {
        return _validateMnemonic(mnemonic, wordList)
    }

    static mnemonicToEntropy(mnemonic, wordList) {
        return _mnemonicToEntropy(mnemonic, wordList)
    }

    static entropyToMnemonic(entropyMnemonic, wordList) {
        return _entropyToMnemonic(entropyMnemonic, wordList)
    }
};

MnemonicHD.wordLists = wordlists
MnemonicHD.wordLists.CN = wordlists.chinese_simplified

export default MnemonicHD

