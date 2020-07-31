'use strict';

// const hdAddress = require("hd-address")
const hdAddress = require("../index")

let hdIndex = 6677
const myselfMnemonic = "star star"
let hd = hdAddress.HD(myselfMnemonic)

let example =  () => {
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

let getRandomMnemonic = ()=>{
    let mnemo = hd.wallet.getRandomMnemonic()
    console.log(mnemo)
    let isMnemo = hd.wallet.validateMnemonic(mnemo)
    console.log(isMnemo)
}

let getChineseMnemonic = ()=>{
    let wordList = hd.wallet.wordlists.zh
    let strength = hd.wallet.strength.low
    let mnemo = hd.wallet.getRandomMnemonic(strength, wordList)
    console.log(mnemo)
    let isMnemo = hd.wallet.validateMnemonic(mnemo, wordList)
    console.log(isMnemo)
}

example()
console.log("----------getRandomMnemonic----------")
getRandomMnemonic()
console.log("----------getChineseMnemonic----------")
getChineseMnemonic()

