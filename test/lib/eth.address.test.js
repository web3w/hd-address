'use strict';

let EthAddr = require("../../lib/eth.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("./base/data").hd

it("Eth getAddress", async () => {
    let addr = new EthAddr()
    let {address} = await addr.getAddress(hdData.index)
    let validAddress = addrValid(addr.coin, address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.ETH, "address is diff")
})
