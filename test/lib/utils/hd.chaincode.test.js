'use strict';

let HDWallet = require("../../../lib/utils/mnemonic.hd")

let hdData = require("../../data").hd

let hdIndex = hdData.index

it("HD getPublicKeyByChainCode", async () => {
    let hd = new HDWallet()
    let hdPath = "m/44'/0'/1'"
    let {pub,chainCode} =  hd.getPathChainCode(hdPath)
    console.log(hdPath,"chainCode",chainCode.toString("hex"))

    let childPath= "m/1/"+hdIndex
    let child = hd.getPublicKeyByChainCode(pub,chainCode,childPath)
    console.log(childPath,child.pub.toString("hex"))

    let testPath= "m/44'/0'/1'/1/"+hdIndex
    let test = hd.getPathChainCode(testPath)
    console.log(testPath,test.pub.toString("hex"))
})

it("HD getPrivateKeyByChainCode", async () => {
    let hd = new HDWallet()
    let hdPath = "m/44'/0'/1'"
    let {pri,chainCode} =  hd.getPathChainCode(hdPath)
    console.log(hdPath,"chainCode",chainCode.toString("hex"))

    let childPath= "m/1/"+hdIndex
    let child = hd.getPrivateKeyByChainCode(pri,chainCode,childPath)
    console.log(childPath,child.pub.toString("hex"))
    console.log("privite",childPath,child.pri.toString("hex"))

    let testPath= "m/44'/0'/1'/1/"+hdIndex
    let test = hd.getPathChainCode(testPath)
    console.log(testPath,test.pub.toString("hex"))
    console.log("privite",testPath,test.pri.toString("hex"))
})


