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
        const BTC_P2WPKH = new BtcSeriesAddress(hd, "BTC_P2WPKH")
        const BTC_P2SH_P2WPKH = new BtcSeriesAddress(hd, "BTC_P2SH_P2WPKH")
        const BTC_P2TR = new BtcSeriesAddress(hd, "BTC_P2TR")
        const BTC_P2PKH = new BtcSeriesAddress(hd, "BTC_P2PKH")
        const ETH = new EthAddress(hd)
        const TRX = new TrxAddress(hd)
        return {
            wallet,
            BTC,
            BTC_P2WPKH,
            BTC_P2SH_P2WPKH,
            BTC_P2TR,
            BTC_P2PKH,
            ETH,
            TRX
        }
    },
    mnemonic: MnemonicHD,
    seed: SeedHD,
    base58: Base58HD
}

// if (coin == "BTC_P2WPKH") {
//     purpose = 84
// } else if (coin == "BTC_P2SH_P2WPKH") {
//     purpose = 49
// } else if (coin == "BTC_P2TR") {
//     purpose = 86
// } else if (coin == "BTC_P2PKH") {
//     purpose = 44
// }