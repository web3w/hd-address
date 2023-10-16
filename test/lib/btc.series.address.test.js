'use strict';

let walletHD = require("../../lib/utils/mnemonic.hd")
let BtcAddr = require("../../lib/btc.series.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("../data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)

let btcGetAddressTest =   (chain, coinSymbol) => {

    let {address,path} =   chain.getAddress(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.log(`address valid : ${validAddress} ${coinSymbol}  ${address} ${path}`)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address} ${path}`)
    console.assert(address == hdData[coinSymbol], `address is diff: ${coinSymbol}   ${address}`)
}

describe("BTC series", () => {
    // m/account'/change/address_index
    it("BTC getAddressByPath", async () => {
        let coin = new BtcAddr(hd, "BTC")
        // btcGetAddressTest(coin, "BTC")
        let {address, pub, pri, path}  = coin.getAddressByPath("m/1'/0/6677")
        console.log(`BTC getAddressByPath :  ${address} ${path}`)
        console.log(address, pub, pri, path)
    })

    it("BTC Testnet getAddress",   () => {
        let coin = new BtcAddr(hd, "BTC", "TEST")
          btcGetAddressTest(coin, "BTC_TEST")
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


