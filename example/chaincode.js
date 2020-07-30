'use strict';

// const hdAddress = require("hd-address")
const hdAddress = require("../index")

let hdIndex = 6677
const myselfMnemonic = "star star"
let hd = hdAddress.HD(myselfMnemonic)


let getPublicKeyByChainCode = () => {
    let hdPath = "m/44'/0'/1'"
    let {pub, chainCode} = hd.hdWallet.getPathChainCode(hdPath)
    console.log(hdPath, "chainCode", chainCode.toString("hex"))

    let childPath = "m/1/" + hdIndex
    let child = hd.hdWallet.getPublicKeyByChainCode(pub, chainCode, childPath)
    console.log(childPath, child.pub.toString("hex"))

    let testPath = "m/44'/0'/1'/1/" + hdIndex
    let test = hd.hdWallet.getPathChainCode(testPath)
    console.log(testPath, test.pub.toString("hex"))
}

let getPrivateKeyByChainCode = () => {
    let hdPath = "m/44'/0'/1'"
    let {pri, chainCode} = hd.hdWallet.getPathChainCode(hdPath)
    console.log(hdPath, "chainCode", chainCode.toString("hex"))

    let childPath = "m/1/" + hdIndex
    let child = hd.hdWallet.getPrivateKeyByChainCode(pri, chainCode, childPath)
    console.log(childPath, child.pub.toString("hex"))
    console.log("privite", childPath, child.pri.toString("hex"))

    let testPath = "m/44'/0'/1'/1/" + hdIndex
    let test = hd.hdWallet.getPathChainCode(testPath)
    console.log(testPath, test.pub.toString("hex"))
    console.log("privite", testPath, test.pri.toString("hex"))
}

getPublicKeyByChainCode()
