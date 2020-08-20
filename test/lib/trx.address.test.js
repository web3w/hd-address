'use strict';

let walletHD = require("../../lib/utils/mnemonic.hd")
let TrxAddr = require("../../lib/trx.address")
let addrValid = require("../benchmark/address.valid")
let hdData = require("../data").hd
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)

describe("Trx", () => {
    it("getAddress",  () => {
        let addr = new TrxAddr(hd)
        let {address} =  addr.getAddress(hdData.index)
        let validAddress =  addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.TRX, "address is diff")
    })

    // m/account'/change/address_index
    it(" getAddressByPath", () => {
        let addr = new TrxAddr(hd)
        let {address, pub, pri, path} = addr.getAddressByPath("m/0'/0/" + hdData.index)
        console.log(address, pub, pri, path)
        let validAddress = addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.TRX, "address is diff")

    })
})


