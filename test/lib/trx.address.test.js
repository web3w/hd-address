'use strict';

let TrxAddr = require("../../lib/trx.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("./base/data").hd

it("Trx getAddress", async () => {
    let addr = new TrxAddr()
    let {address} = await addr.getAddress(hdData.index)
    let validAddress = await addrValid(addr.coin, address)
    console.assert(validAddress, "address invalid")
    console.assert(address == hdData.TRX, "address is diff")
})

