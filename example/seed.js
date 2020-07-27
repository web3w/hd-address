'use strict';

let hdIndex = 6677
// const myselfSeed = "8ff665b9eb37082688f3933e985466570de7d37d92720b065728eefa75ae8cb47a00fb41b821c203442ce26b357f58bdb995a30cf418da2c7bc836186f6ea5cb"
const myselfSeed = "03d0be996b63e90c7625dd3f5319c3bc11669d3d35ae5dc345595e5e59be74084f"
const hdAddress = require("../index")
// 16(128bits)< seed.length<64(512bits)

let example = async () => {
    let seedBuf = Buffer.from(myselfSeed, "hex")
    let hd = hdAddress.HD(seedBuf, hdAddress.keyType.seed)
    let addr = await hd.BTC.getAddress(hdIndex)
    console.log("BTC", addr.address)
    addr = await hd.BTC_TEST.getAddress(hdIndex)
    console.log("BTC_TEST", addr.address)
    addr = await hd.BCH.getAddress(hdIndex)
    console.log("BCH", addr.address)
    addr = await hd.BCH_TEST.getAddress(hdIndex)
    console.log("BCH_TEST", addr.address)
    addr = await hd.LTC.getAddress(hdIndex)
    console.log("LTC", addr.address)
    addr = await hd.LTC_TEST.getAddress(hdIndex)
    console.log("LTC_TEST", addr.address)
    addr = await hd.ETH.getAddress(hdIndex)
    console.log("ETH", addr.address)
    addr = await hd.TRX.getAddress(hdIndex)
    console.log("TRX", addr.address)
}

example()
