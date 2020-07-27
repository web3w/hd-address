let logInfo = async (hdCoin, hdIndex) => {
    let addr = await hdCoin.getAddress(hdIndex)
    console.log(`${hdCoin.coin}:"${addr.address}"`)
}

(async () => {
    let hdData = require("./data").hd
    let hdIndex = hdData.index
    const mnemonic = hdData.mnemonic
    let hdAddress = require("../index")

    let hd = hdAddress.HD(mnemonic)
    await logInfo(hd.BTC, hdIndex)
    await logInfo(hd.BTC_TEST, hdIndex)
    await logInfo(hd.BCH, hdIndex)
    await logInfo(hd.BCH_TEST, hdIndex)
    await logInfo(hd.LTC, hdIndex)
    await logInfo(hd.LTC_TEST, hdIndex)
    await logInfo(hd.ETH, hdIndex)
    await logInfo(hd.TRX, hdIndex)
})()
