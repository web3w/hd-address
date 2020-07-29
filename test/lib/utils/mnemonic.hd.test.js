'use strict';

let HDWallet = require("../../../lib/utils/mnemonic.hd")

let hdData = require("../../data").hd_pwd

let hd = new HDWallet(hdData.mnemonic, hdData.pwd)

it("getPathChainCode", () => {
    let child = hd.getPathChainCode('m/0/0')
    console.log(child.pub.toString("hex"))
})


it("getRandomMnemonic default", () => {
    let mnemo =  hd.getRandomMnemonic() //hdData.mnemonic //
    console.log(mnemo)
    let isMnemo = hd.validateMnemonic(mnemo)
    console.log(isMnemo)
    if (isMnemo) {
        let en = hd.mnemonicToEntropy(mnemo)
        console.log(en)
        let mnemoDcode = hd.entropyToMnemonic(en)
        console.log(mnemoDcode)
    }
})

it("getRandomMnemonic Chinese", () => {
    let wordList = hd.wordlists.zh
    let mnemo = hd.getRandomMnemonic(hd.strength.low, wordList)
    console.log(mnemo)
    let isMnemo = hd.validateMnemonic(mnemo, wordList)
    console.log(isMnemo)

    // let en = hd.mnemonicToEntropy(mnemo)
})

