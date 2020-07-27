'use strict';

const SeedHD = require("./seed.hd")
const bip39 = require('bip39');
const conf = require("../../conf/hd")

module.exports = class MnemonicHD extends SeedHD {
    constructor(mnemonic) {
        let mnemonicStr = conf.default_mnemonic //It's public
        if (mnemonic) {
            mnemonicStr = mnemonic
        } else {
            console.warn("-----------  the mnemonic is public, please init mnemonic  ------------")
        }
        let seed =  bip39.mnemonicToSeedSync(mnemonicStr)
        super(seed)
    }
};

