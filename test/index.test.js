let logInfo = (hdCoin, hdIndex) => {
    let addr = hdCoin.getAddress(hdIndex)
    console.log(`${hdCoin.coin}:"${addr.address}"`)
}

(async () => {
    let hdData = require("./data").hd
    let hdIndex = hdData.index
    const mnemonic = hdData.mnemonic
    let hdAddress = require("../index")

    let hd = hdAddress.HD(mnemonic)
    logInfo(hd.BTC, hdIndex)
    logInfo(hd.BTC_TEST, hdIndex)
    logInfo(hd.BCH, hdIndex)
    logInfo(hd.BCH_TEST, hdIndex)
    logInfo(hd.LTC, hdIndex)
    logInfo(hd.LTC_TEST, hdIndex)
    logInfo(hd.ETH, hdIndex)
    logInfo(hd.TRX, hdIndex)
})()
