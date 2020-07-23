'use strict';

let walletHD = require("../../lib/wallet.hd")
let BtcAddr = require("../../lib/btc.series.address")
let verify = require("hd-address-verify")
let hdData = require("./base/data").hd
let hdIndx = hdData.index
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)


it("BTC getAddress", async () => {
    let coin = new BtcAddr(hd, "BTC")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = verify.BTC(address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.BTC, "address is diff")
})


it("BTC Testnet getAddress", async () => {
    let coin = new BtcAddr(hd, "BTC", "TEST")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = verify.BTC_TEST(address)
    console.assert(validAddress, "address invalid")
})


it("BCH getAddress", async () => {
    let coin = new BtcAddr(hd, "BCH")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = verify.BCH("BCH", address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.BCH, "address is diff")
})

it("BCH TEST address", async () => {
    let coin = new BtcAddr(hd, "BCH", "TEST")
    let {address} = await coin.getAddress(userId)
    console.log(address)

    let foo = await verify.BCH_TEST(address)
    console.log(foo)
    // mwXkNj4duSiP4C6xu2kjGujHQXgpW3Szsj
})

it("LTC getAddress", async () => {
    let coin = new BtcAddr(hd, "LTC")
    let {address} = await coin.getAddress(hdIndx)
    console.log(address)
    let validAddress = verify.LTC(address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.LTC, "address is diff")
})

it("LTC Test address", async () => {
    let coin = new BtcAddr(hd, "LTC", "TEST")
    let {address} = await coin.getAddress(hdIndx)
    console.log(address)

    let foo =  verify.LTC_TEST(address)
    console.log(foo)
})


