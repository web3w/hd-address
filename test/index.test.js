'use strict';

let Address = require("../index")


let userId = 123456

// 0x833F5230f7443761AfC8282829989E25f0Fc0A71
it("ETH getAddress and ", async () => {
    let chain = new Address("ETH")
    let {address} = await chain.address.getAddress(userId)

    let foo = await chain.address.isAddress(address)
    console.log(foo)
})

it("BTC TEST getKeyPair", async () => {
    let chain = new Address("BTC", "TEST")
    let foo = await chain.getKeyPair(userId)
    console.log(foo)
})

it("BTC getAddressEx", async () => {
    let chain = new Address("BTC", "TEST")
    let foo = await chain.getAddressEx(userId)
    console.log(foo)
})


it("BTC getKeyPair", async () => {
    let chain = new Address("BTC", "BTC")
    let foo = await chain.getKeyPair(userId)

    console.log(foo.address)
    let priAddr = await chain.address.getAddressByPrivateKey(foo.pri)
    console.log(priAddr.address)
    let pubAddr = await chain.address.getAddressByPublicKey(foo.pub)
    console.log(pubAddr.address)

})

it("ETH getKeyPair", async () => {
    let chain = new Address("ETH")
    let foo = await chain.getKeyPair(userId)
    console.log(foo.address)
    let priAddr = await chain.address.getAddressByPrivateKey(foo.pri)
    console.log(priAddr.address)
    let pubAddr = await chain.address.getAddressByPublicKey(foo.pub)
    console.log(pubAddr.address)

    console.assert(pubAddr.address == "0x833F5230f7443761AfC8282829989E25f0Fc0A71")
})

it("TRX getKeyPair", async () => {
    let chain = new Address("TRX")
    let foo = await chain.getKeyPair(userId)
    console.log(foo.address)
    let priAddr = await chain.address.getAddressByPrivateKey(foo.pri)
    console.log(priAddr.address)
    let pubAddr = await chain.address.getAddressByPublicKey(foo.pub)
    console.log(pubAddr.address)
    console.assert(pubAddr.address == "TDmpo4ZwgpJ5aMfuqiK4mKcbY131STyybh")
    //
})

