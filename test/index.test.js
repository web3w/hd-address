let logInfo = async (chain, hdIndex) => {
    let coin = chain.coin
    console.log(coin)
    let addr = await chain.getAddress(hdIndex)
    console.log(`${coin}:"${addr.address}"`)
}

(async () => {
    let hdData = require("./lib/base/data").hd
    let hdIndex = hdData.index
    const mnemonic = hdData.mnemonic
    let hdAddress = require("../index")

    let foo = hdAddress(mnemonic)
    await logInfo(foo.BTC, hdIndex)
    await logInfo(foo.BTC_TEST, hdIndex)
    await logInfo(foo.BCH, hdIndex)
    await logInfo(foo.LTC, hdIndex)
    await logInfo(foo.ETH, hdIndex)
    await logInfo(foo.TRX, hdIndex)
})()
