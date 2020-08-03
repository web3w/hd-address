'use strict';

let mnemonic = require("../../../lib/utils/mnemonic.hd")


it("getRandomMnemonic default", () => {
    let mnemo =  mnemonic.getRandomMnemonic() //hdData.mnemonic //
    console.log(mnemo)
    let isMnemo = mnemonic.validateMnemonic(mnemo)
    console.log(isMnemo)
    if (isMnemo) {
        let en = mnemonic.mnemonicToEntropy(mnemo)
        console.log(en)
        let mnemoDcode = mnemonic.entropyToMnemonic(en)
        console.log(mnemoDcode)
    }
})

it("getRandomMnemonic Chinese", () => {
    let wordList = mnemonic.getWordLists().zh
    let mnemo = mnemonic.getRandomMnemonic(128, wordList)
    console.log(mnemo)
    let isMnemo = mnemonic.validateMnemonic(mnemo, wordList)
    console.log(isMnemo)

})

