'use strict';
// const hdAddress = require("hd-address")
const hdAddress = require("../index")
let hdIndex = 6677
const myselfBase58 = "xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi"

let example = async () => {
    let hd = hdAddress.HD(myselfBase58, hdAddress.keyType.base58)
    let addr = await hd.BTC.getAddress(hdIndex)
    console.log("BTC", addr.address)
    addr = await hd.BTC_TEST.getAddress(hdIndex)
    console.log("BTC_TEST", addr.address)
    addr = await hd.BCH.getAddress(hdIndex)
    console.log("BCH", addr.address)
    addr = await hd.BCH_TEST.getAddress(hdIndex)
    console.log("BCH_TEST", addr.address)
    addr = await hd.LTC.getAddress(hdIndex)
    console.log("LTC", addr.address)
    addr = await hd.LTC_TEST.getAddress(hdIndex)
    console.log("LTC_TEST", addr.address)
    addr = await hd.ETH.getAddress(hdIndex)
    console.log("ETH", addr.address)
    addr = await hd.TRX.getAddress(hdIndex)
    console.log("TRX", addr.address)
}

example()
