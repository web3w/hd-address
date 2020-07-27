'use strict';

let hdIndex = 6677
const myselfMnemonic = "star star"
const hdAddress = require("../index")

let example = async () => {
    let hd = hdAddress.HD(myselfMnemonic)
    let addr = await hd.BTC.getAddress(hdIndex)
    console.log("BTC",addr.address)
    addr = await hd.BTC_TEST.getAddress(hdIndex)
    console.log("BTC_TEST",addr.address)
    addr = await hd.BCH.getAddress(hdIndex)
    console.log("BCH",addr.address)
    addr = await hd.BCH_TEST.getAddress(hdIndex)
    console.log("BCH_TEST",addr.address)
    addr = await hd.LTC.getAddress(hdIndex)
    console.log("LTC",addr.address)
    addr = await hd.LTC_TEST.getAddress(hdIndex)
    console.log("LTC_TEST",addr.address)
    addr = await hd.ETH.getAddress(hdIndex)
    console.log("ETH",addr.address)
    addr = await hd.TRX.getAddress(hdIndex)
    console.log("TRX",addr.address)
}

example()


