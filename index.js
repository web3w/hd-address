'use strict';

import MnemonicHD from "./lib/utils/mnemonic.hd.js";
import SeedHD from "./lib/utils/seed.hd.js";
import Base58HD from "./lib/utils/base58.hd.js";

import HdWallet from "./lib/base/hd.wallet.class.js";
import AddressClass from "./lib/base/address.class.js";
import BtcSeriesAddress from "./lib/btc.series.address.js"
import EthAddress from "./lib/eth.address.js"
import TrxAddress from "./lib/trx.address.js"


export default {
    keyType: {
        "mnemonic": "mnemonic",
        "seed": "seed",
        "base58": "base58",
        "root": "root"
    },
    AddressClass,
    HdWallet,
    HD: (key, keyType = "mnemonic", pwd) => {
        let hd
        if (keyType == "mnemonic") {
            hd = new MnemonicHD(key, pwd)
        } else if (keyType == "seed") {
            hd = new SeedHD(key)
        } else if (keyType == "base58") {
            hd = new Base58HD(key)
        } else if (keyType == "root") {
            hd = new HdWallet(key)
        } else {
            throw "key type unsupported"
        } 
        const wallet = hd
        const BTC = new BtcSeriesAddress(hd, "BTC")
        const BTC_TEST = new BtcSeriesAddress(hd, "BTC", "TEST")
        const BCH = new BtcSeriesAddress(hd, "BCH")
        const BCH_TEST = new BtcSeriesAddress(hd, "BCH", "TEST")
        const LTC = new BtcSeriesAddress(hd, "LTC")
        const LTC_TEST = new BtcSeriesAddress(hd, "LTC", "TEST")
        const ETH = new EthAddress(hd)
        const TRX = new TrxAddress(hd) 
        return {
            wallet,
            BTC,
            BTC_TEST,
            BCH,
            BCH_TEST,
            LTC,
            LTC_TEST,
            ETH,
            TRX
        }
    },
    mnemonic: MnemonicHD,
    seed: SeedHD,
    base58: Base58HD
}