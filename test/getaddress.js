'use strict';


import addrValid from "./benchmark/address.valid.js"

// data
import testData from "./data/index.js"

import Address from "../index.js"

const hdData = testData.hd
const hdIndex = hdData.index
const mnemonic = hdData.mnemonic


const hdAddress = Address.HD(mnemonic)

// // valid


let getAddressTest = async (coinSymbol, network) => {
    debugger

    let chain = hdAddress[coinSymbol]



    let { address, pri, pub } =   chain.getAddress(hdIndex)

    let priAddr = chain.getAddressByPrivateKey(pri)
    console.assert(priAddr.address == hdData[coinSymbol], `ByPrivateKey address is diff: ${coinSymbol}   ${priAddr.address}`)

    // let pubAddr = chain.getAddressByPublicKey(pub)
    // console.assert(pubAddr.address == hdData[coinSymbol], `ByPublicKey address is diff: ${coinSymbol}   ${address}`)


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
