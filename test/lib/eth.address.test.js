'use strict';

let walletHD = require("../../lib/utils/mnemonic.hd")
let EthAddr = require("../../lib/eth.address")
let addrValid = require("../benchmark/address.valid")

let hdData = require("../data").hd
const mnemonic = hdData.mnemonic
let hd = new walletHD(mnemonic)

describe("ETH", () => {
    it("Eth getAddress", () => {
        let addr = new EthAddr(hd)
        let {address} = addr.getAddress(hdData.index)
        let validAddress = addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.ETH, "address is diff")

    })

    // m/account'/change/address_index
    it("Eth getAddressByPath", () => {
        let addr = new EthAddr(hd)
        let {address, pub, pri, path} = addr.getAddressByPath("m/20'/0/" + 3)
        console.log(address, pub, pri, path)
        let validAddress = addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.ETH, "address is diff")

    })

    it("Eth getAddressByPrivateKey", () => {
        let addr = new EthAddr(hd)
        let {address, pub} = addr.getAddressByPrivateKey("93b1302f88019cfd120f83677274447ae76112be7e31b6aee59928fbb9a12584")
        console.log(address, pub.toString("hex"))
        let validAddress = addrValid(addr.coin, address)
        console.assert(validAddress, "address invalid")
        console.assert(address == hdData.ETH, "address is diff")

    })


})

