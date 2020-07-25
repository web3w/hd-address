'use strict';

let EthAddr = require("../../lib/base/eth.address")
let TrxAddr = require("../../../lib/trx.address")

let hdData = require("../../data").hd

let userId = hdData.index

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
