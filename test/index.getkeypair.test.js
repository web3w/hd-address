'use strict';

let hdData = require("./lib/base/data").hd
let hdIndex = hdData.index
const mnemonic= hdData.mnemonic

let hdAddress = require("../index")(mnemonic)


let addrValid = require("./benchmark/address.valid")


let getAddressKeyPairTest = async (coinSymbol) => {
    let chain = hdAddress[coinSymbol]
    let {address, pri, pub} = await chain.getAddressKeyPair(hdIndex)
    let validAddress = addrValid(chain.coin, address,chain.networkType)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData[coinSymbol], "address is diff")

    let priAddr = await chain.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], "address is diff")

    let pubAddr = await chain.getAddressByPublicKey(pub)
    console.assert(pubAddr.address == hdData[coinSymbol], "address is diff")
}

it("BTC getAddressKeyPair", async () => {
    let ok =await getAddressKeyPairTest("BTC")
})


it("BTC TEST getAddressKeyPair", async () => {
    let ok =await getAddressKeyPairTest("BTC_TEST")
})

it("BCH getAddressKeyPair", async () => {
    let ok =await getAddressKeyPairTest("BCH")
})


it("LTC getAddressKeyPair", async () => {
    let ok =await getAddressKeyPairTest("LTC")
})



it("ETH getAddressKeyPair ", async () => {
    let ok =await getAddressKeyPairTest("ETH")

})


it("TRX getAddressKeyPair", async () => {
    let ok =await getAddressKeyPairTest("TRX")
})

