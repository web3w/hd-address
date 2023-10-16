'use strict';


import addrValid from "./benchmark/address.valid.js"

// data
import hdData from "./data/index.js"

import Address from "../index.js"

const hdIndex = hdData.hd.index
const mnemonic = hdData.hd.mnemonic


const hdAddress = Address.HD(mnemonic)

// // valid


let getAddressTest = async (coinSymbol, network) => {

    let chain = hdAddress[coinSymbol]
    let { address } = await chain.getAddress(hdIndex)

    let p2pkh = await chain.getAddress(hdIndex)
    let p2wpkh = await chain.getNativeSegwitAddress(hdIndex)
    let p2sh_p2wpkh = await chain.getNestedSegwitAddress(hdIndex)
    let p2tr = await chain.getTopRootAddress(hdIndex)
    debugger
    // const p2tr = getNestedSegwitAddress
    let validAddress = addrValid(coinSymbol, address)
    console.assert(validAddress, `address invalid : ${coinSymbol}  ${address}`)
    console.assert(address == hdData[coinSymbol], `address is diff: ${coinSymbol}   ${address}`)
}

(async () => {
    let ok = await getAddressTest("BTC")
    // debugger
    // const ll = btc.p2pkh(PubKey)

    debugger

})()
