'use strict';

let walletHD = require("../../lib/utils/mnemonic.hd")
let TrxAddr = require("../../lib/trx.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("../data").hd
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)

describe("Trx", () => {
    it("getAddress", async () => {
        let addr = new TrxAddr(hd)
        let {address} = await addr.getAddress(hdData.index)
        let validAddress = await addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.TRX, "address is diff")
    })
})


