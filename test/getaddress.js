'use strict';

// data
let hdData = require("./data").hd
let hdIndex = hdData.index
const mnemonic = hdData.mnemonic

//  import
let hdAddress = require("../index").HD(mnemonic)


// valid
let addrValid = require("./benchmark/address.valid")


let getAddressTest = async (coinSymbol, network) => {
     
    let chain = hdAddress[coinSymbol]
    let { address } = await chain.getAddress(hdIndex)
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `address is diff: ${coinSymbol}   ${address}`)
}

(async () => {
    debugger
    let ok =await getAddressTest("BTC")

    debugger
    
})()
