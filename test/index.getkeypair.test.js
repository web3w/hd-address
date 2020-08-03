'use strict';

let hdData = require("./data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic

let hdAddress = require("../index").HD(mnemonic)


let addrValid = require("./benchmark/address.valid")


let getCoinAddressKeyPairTest = async (coinSymbol) => {
    let chain = hdAddress[coinSymbol]
    let {address, pri, pub} = await chain.getCoinAddressKeyPair(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `KeyPai address is diff: ${coinSymbol}   ${address}`)

    let priAddr = await chain.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], `ByPrivateKey address is diff: ${coinSymbol}   ${priAddr.address}`)

    let pubAddr = await chain.getAddressByPublicKey(pub)
    console.assert(pubAddr.address == hdData[coinSymbol], `ByPublicKey address is diff: ${coinSymbol}   ${address}`)
}

describe("getCoinAddressKeyPair", () => {

    it("BTC getCoinAddressKeyPair", async () => {
        let ok = await getCoinAddressKeyPairTest("BTC")
    })


    it("BTC TEST getCoinAddressKeyPair", async () => {
        let ok = await getCoinAddressKeyPairTest("BTC_TEST")
    })

    it("BCH getCoinAddressKeyPair", async () => {
        let ok = await getCoinAddressKeyPairTest("BCH")
    })


    it("LTC getCoinAddressKeyPair", async () => {
        let ok = await getCoinAddressKeyPairTest("LTC")
    })


    it("ETH getCoinAddressKeyPair ", async () => {
        let ok = await getCoinAddressKeyPairTest("ETH")

    })


    it("TRX getCoinAddressKeyPair", async () => {
        let ok = await getCoinAddressKeyPairTest("TRX")
    })
})

