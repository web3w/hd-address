'use strict';

// const hdAddress = require("hd-address")
const hdAddress = require("../index")

let hdIndex = 6677
const myselfMnemonic = "star star"

let example =  () => {
    let hd = hdAddress.HD(myselfMnemonic)
    let addr =  hd.BTC.getAddress(hdIndex)
    console.log("BTC",addr.address)
    addr =  hd.BTC_TEST.getAddress(hdIndex)
    console.log("BTC_TEST",addr.address)
    addr =  hd.BCH.getAddress(hdIndex)
    console.log("BCH",addr.address)
    addr =  hd.BCH_TEST.getAddress(hdIndex)
    console.log("BCH_TEST",addr.address)
    addr =  hd.LTC.getAddress(hdIndex)
    console.log("LTC",addr.address)
    addr =  hd.LTC_TEST.getAddress(hdIndex)
    console.log("LTC_TEST",addr.address)
    addr =  hd.ETH.getAddress(hdIndex)
    console.log("ETH",addr.address)
    addr =  hd.TRX.getAddress(hdIndex)
    console.log("TRX",addr.address)
}

example()


