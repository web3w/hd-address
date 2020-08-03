'use strict';

let hdData = require("./data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic

let hdAddress = require("../index").HD(mnemonic)


let addrValid = require("./benchmark/address.valid")


let getCoinAddressKeyPairTest = (coinSymbol) => {
    let chain = hdAddress[coinSymbol]
    let {address, pri, pub} = chain.getCoinAddressKeyPair(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `KeyPai address is diff: ${coinSymbol}   ${address}`)

    let priAddr = chain.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], `ByPrivateKey address is diff: ${coinSymbol}   ${priAddr.address}`)

    let pubAddr = chain.getAddressByPublicKey(pub)
    console.assert(pubAddr.address == hdData[coinSymbol], `ByPublicKey address is diff: ${coinSymbol}   ${address}`)
}

describe("getCoinAddressKeyPair", () => {

    it("BTC getCoinAddressKeyPair", () => {
        getCoinAddressKeyPairTest("BTC")
    })


    it("BTC TEST getCoinAddressKeyPair", async () => {
        getCoinAddressKeyPairTest("BTC_TEST")
    })

    it("BCH getCoinAddressKeyPair", async () => {
        getCoinAddressKeyPairTest("BCH")
    })


    it("LTC getCoinAddressKeyPair", async () => {
        getCoinAddressKeyPairTest("LTC")
    })


    it("ETH getCoinAddressKeyPair ", async () => {
        getCoinAddressKeyPairTest("ETH")

    })


    it("TRX getCoinAddressKeyPair", async () => {
        getCoinAddressKeyPairTest("TRX")
    })
})

