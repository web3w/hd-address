'use strict';

let BtcAddr = require("../../lib/btc.series.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("./base/data").hd
let hdIndx = hdData.index

it("BTC getAddress", async () => {
    let coin = new BtcAddr("BTC")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = await addrValid("BTC", address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.BTC, "address is diff")
})


it("BTC Testnet getAddress", async () => {
    let coin = new BtcAddr("BTC", "TEST")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = await addrValid("BTC", address, "TEST")
    console.assert(validAddress, "address invalid")
})


it("BCH getAddress", async () => {
    let coin = new BtcAddr("BCH")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = await addrValid("BCH", address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.BCH, "address is diff")
})

it("BCH TEST address", async () => {
    let coin = new BtcAddr("BCH", "TEST")
    let {address} = await coin.getAddress(userId)
    console.log(address)

    let foo = await coin.isAddress(address)
    console.log(foo)
    // mwXkNj4duSiP4C6xu2kjGujHQXgpW3Szsj
})

it("LTC getAddress", async () => {
    let coin = new BtcAddr("LTC")
    let {address} = await coin.getAddress(hdIndx)
    let validAddress = await addrValid("LTC", address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.LTC, "address is diff")
})

it("LTC Test address", async () => {
    let coin = new BtcAddr("LTC", "TEST")
    let {address} = await coin.getAddress(userId)
    console.log(address)

    let foo = await coin.isAddress(address)
    console.log(foo)
    // mfvxn82P5i8HqPCV5U1JhqVWBYyzTRrxhU
})


