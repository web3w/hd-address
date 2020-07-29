'use strict';
// const hdAddress = require("hd-address")
const hdAddress = require("../index")
let hdIndex = 6677
const myselfBase58 = "xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi"

let example =  () => {
    let hd = hdAddress.HD(myselfBase58, hdAddress.keyType.base58)
    let addr =  hd.BTC.getAddress(hdIndex)
    console.log("BTC", addr.address)
    addr =  hd.BTC_TEST.getAddress(hdIndex)
    console.log("BTC_TEST", addr.address)
    addr =  hd.BCH.getAddress(hdIndex)
    console.log("BCH", addr.address)
    addr =  hd.BCH_TEST.getAddress(hdIndex)
    console.log("BCH_TEST", addr.address)
    addr =  hd.LTC.getAddress(hdIndex)
    console.log("LTC", addr.address)
    addr =  hd.LTC_TEST.getAddress(hdIndex)
    console.log("LTC_TEST", addr.address)
    addr =  hd.ETH.getAddress(hdIndex)
    console.log("ETH", addr.address)
    addr =  hd.TRX.getAddress(hdIndex)
    console.log("TRX", addr.address)
}

example()
