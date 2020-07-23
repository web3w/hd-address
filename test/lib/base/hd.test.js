'use strict';

let EthAddr = require("../../lib/base/eth.address")
let TrxAddr = require("../../../lib/trx.address")


let userId = 123456

// 0x833F5230f7443761AfC8282829989E25f0Fc0A71
it("Eth address", async () => {
    let coin = new EthAddr()
    let {address} = await coin.getAddress(userId)
    let validAddress =await coin.isAddress(address)
    console.assert(validAddress)
})


it("Trx address", async () => {
    let coin = new TrxAddr()
    let {address} = await coin.getAddress(userId)
    console.log(address)
    let validAddress =await coin.isAddress(address)
    console.assert(validAddress)
})
