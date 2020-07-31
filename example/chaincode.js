'use strict';

// const hdAddress = require("hd-address")
const hdAddress = require("../index")

let hdIndex = 6677
const myselfMnemonic = "star star"
let hd = hdAddress.HD(myselfMnemonic)


let getPublicKeyByChainCode = () => {
    let hdPath = "m/44'/0'/1'"
    let {pub, chainCode} = hd.wallet.getPathChainCode(hdPath)
    console.log(hdPath, "chainCode", chainCode.toString("hex"),"\n")

    let childPath = "m/1/" + hdIndex
    let child = hd.wallet.getPublicKeyByChainCode(pub, chainCode, childPath)
    let childAaddr = hd.BTC.getAddressByPublicKey(child.pub)
    console.log(childPath, child.pub.toString("hex"),"BTC Address",childAaddr.address)

    let testPath = "m/44'/0'/1'/1/" + hdIndex
    let test = hd.wallet.getPathChainCode(testPath)
    let testAaddr = hd.BTC.getAddressByPublicKey(child.pub)
    console.log(testPath, test.pub.toString("hex"),"BTC Address",testAaddr.address)
}

let getPrivateKeyByChainCode = () => {
    let hdPath = "m/44'/0'/1'"
    let {pri, chainCode} = hd.wallet.getPathChainCode(hdPath)
    console.log(hdPath, "chainCode", chainCode.toString("hex"))

    let childPath = "m/1/" + hdIndex
    let child = hd.wallet.getPrivateKeyByChainCode(pri, chainCode, childPath)
    console.log(childPath, child.pub.toString("hex"))
    console.log("privite", childPath, child.pri.toString("hex"))

    let testPath = "m/44'/0'/1'/1/" + hdIndex
    let test = hd.wallet.getPathChainCode(testPath)
    console.log(testPath, test.pub.toString("hex"))
    console.log("privite", testPath, test.pri.toString("hex"))
}

getPublicKeyByChainCode()
