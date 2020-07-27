'use strict';

let walletHD = require("../../lib/utils/mnemonic.hd")
let BtcAddr = require("../../lib/btc.series.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("../data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)

let btcGetAddressTest = async (chain, coinSymbol) => {

    let {address} = await chain.getAddress(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `address is diff: ${coinSymbol}   ${address}`)
}

describe("BTC series", () => {
    it("BTC getAddress", async () => {
        let coin = new BtcAddr(hd, "BTC")
        await btcGetAddressTest(coin, "BTC")
    })


    it("BTC Testnet getAddress", async () => {
        let coin = new BtcAddr(hd, "BTC", "TEST")
        await btcGetAddressTest(coin, "BTC_TEST")
    })


    it("BCH getAddress", async () => {
        let coin = new BtcAddr(hd, "BCH")
        await btcGetAddressTest(coin, "BCH")
    })

    it("BCH TEST address", async () => {
        let coin = new BtcAddr(hd, "BCH", "TEST")
        await btcGetAddressTest(coin, "BCH_TEST")
    })

    it("LTC getAddress", async () => {
        let coin = new BtcAddr(hd, "LTC")
        await btcGetAddressTest(coin, "LTC")
    })

    it("LTC Test address", async () => {
        let coin = new BtcAddr(hd, "LTC", "TEST")
        await btcGetAddressTest(coin, "LTC_TEST")
    })
})


