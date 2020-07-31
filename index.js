'use strict';

let MnemonicHD = require("./lib/utils/mnemonic.hd")
let SeedHD = require("./lib/utils/seed.hd")
let Base58HD = require("./lib/utils/base58.hd")

let AddressClass = require("./lib/base/address.class")

let Address = {
    BTC: require("./lib/btc.series.address"),
    ETH: require("./lib/eth.address"),
    TRX: require("./lib/trx.address")
}

module.exports = {
    keyType: {
        "mnemonic": "mnemonic",
        "seed": "seed",
        "base58": "base58",
    },
    AddressClass: AddressClass,
    HD: (key, keyType = "mnemonic", pwd) => {
        let hd
        if (keyType == "mnemonic") {
            hd = new MnemonicHD(key, pwd)
        } else if (keyType == "seed") {
            hd = new SeedHD(key)
        } else if (keyType == "base58") {
            hd = new Base58HD(key)
        } else {
            throw "key type unsupported"
        }
        return {
            wallet: hd,
            BTC: new Address.BTC(hd, "BTC"),
            BTC_TEST: new Address.BTC(hd, "BTC", "TEST"),
            BCH: new Address.BTC(hd, "BCH"),
            BCH_TEST: new Address.BTC(hd, "BCH", "TEST"),
            LTC: new Address.BTC(hd, "LTC"),
            LTC_TEST: new Address.BTC(hd, "LTC", "TEST"),
            ETH: new Address.ETH(hd),
            TRX: new Address.TRX(hd),
        }
    }
}