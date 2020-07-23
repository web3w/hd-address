'use strict';

// data
let hdData = require("./lib/base/data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic

//  import
let hdAddress = require("../index")(mnemonic)


// valid
let addrValid = require("./benchmark/address.valid")


let getAddressTest = async (coinSymbol) => {
    let chain = hdAddress[coinSymbol]
    let {address} = await chain.getAddress(hdIndex)
    let validAddress = addrValid(chain.coin, address, chain.networkType)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData[coinSymbol], "address is diff")

}

it("BTC getAddress", async () => {
    let ok = await getAddressTest("BTC")
})


it("BTC TEST getAddress", async () => {
    let ok = await getAddressTest("BTC_TEST")
})

it("BCH getAddressKeyPair", async () => {
    let ok = await getAddressTest("BCH")
})


it("LTC getAddressKeyPair", async () => {
    let ok = await getAddressTest("LTC")
})


it("ETH getAddressKeyPair ", async () => {
    let ok = await getAddressTest("ETH")

})


it("TRX getAddressKeyPair", async () => {
    let ok = await getAddressTest("TRX")
})

