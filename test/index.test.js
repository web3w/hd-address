'use strict';

let Address = require("../index")
let addrValid = require("./benchmark/address.valid")
let hdData = require("./lib/base/data").hd
let hdIndex = hdData.index

let getKeyPairTest = async (coinSymbol) => {
    let chain = new Address(coinSymbol)
    let {address, pri, pub} = await chain.getKeyPair(hdIndex)
    let validAddress = addrValid(chain.address.coin, address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData[coinSymbol], "address is diff")

    let priAddr = await chain.address.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], "address is diff")

    let pubAddr = await chain.address.getAddressByPublicKey(pub)
    console.assert(pubAddr.address == hdData[coinSymbol], "address is diff")
}

it("BTC getKeyPair", async () => {
    let ok =await getKeyPairTest("BTC")
})


it("BTC TEST getKeyPair", async () => {
    let chain = new Address("BTC", "TEST")
    let {address} = await chain.getKeyPair(hdIndex)
    let validAddress = addrValid(chain.address.coin, address, "TEST")
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.BTC_TEST, "address is diff")
})

it("BCH getKeyPair", async () => {
    let ok =await getKeyPairTest("BCH")
})


it("LTC getKeyPair", async () => {
    let ok =await getKeyPairTest("LTC")
})



it("ETH getKeyPair ", async () => {
    let ok =await getKeyPairTest("ETH")

})


it("TRX getKeyPair", async () => {
    let ok =await getKeyPairTest("TRX")
})

