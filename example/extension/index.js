'use strict';

let EosAddress = require("./eos.address")
const myselfMnemonic = "start start"
const hdAddress = require("../../index").HD(myselfMnemonic)
let hdIndex = 6677

// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
let example =   () => {
    let hd = hdAddress.wallet
    // step 1: definition coin type
    hd.coinType.EOS = {code: 194}

    // step 2: implement getAddress method
    let eos = new EosAddress(hd)
    let {pub} =   eos.getCoinKeyPair(hdIndex)
    console.log(eos.coin, "pub", pub.toString("hex"))

    // step 3: registered extension
    hdAddress.EOS = eos
    hdAddress.EOS.getAddress(hdIndex)
}

example()


