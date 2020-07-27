'use strict';

let hdData = require("./data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic

let hdAddress = require("../index").HD(mnemonic)


let addrValid = require("./benchmark/address.valid")


let getAddressKeyPairTest = async (coinSymbol) => {
    let chain = hdAddress[coinSymbol]
    let {address, pri, pub} = await chain.getAddressKeyPair(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `KeyPai address is diff: ${coinSymbol}   ${address}`)

    let priAddr = await chain.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], `ByPrivateKey address is diff: ${coinSymbol}   ${priAddr.address}`)

    let pubAddr = await chain.getAddressByPublicKey(pub)
    console.assert(pubAddr.address == hdData[coinSymbol], `ByPublicKey address is diff: ${coinSymbol}   ${address}`)
}

describe("getAddressKeyPair", () => {

    it("BTC getAddressKeyPair", async () => {
        let ok = await getAddressKeyPairTest("BTC")
    })


    it("BTC TEST getAddressKeyPair", async () => {
        let ok = await getAddressKeyPairTest("BTC_TEST")
    })

    it("BCH getAddressKeyPair", async () => {
        let ok = await getAddressKeyPairTest("BCH")
    })


    it("LTC getAddressKeyPair", async () => {
        let ok = await getAddressKeyPairTest("LTC")
    })


    it("ETH getAddressKeyPair ", async () => {
        let ok = await getAddressKeyPairTest("ETH")

    })


    it("TRX getAddressKeyPair", async () => {
        let ok = await getAddressKeyPairTest("TRX")
    })
})

