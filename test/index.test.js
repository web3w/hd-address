let hdAddress = require("../index")

let logInfo = (hdCoin, hdIndex) => {
    let addr = hdCoin.getAddress(hdIndex)
    console.log(`${hdCoin.coin}:"${addr.address}"`)
}

let getAddress = (hd) => {
    let hdIndex = 6677
    logInfo(hd.BTC, hdIndex)
    logInfo(hd.BTC_TEST, hdIndex)
    logInfo(hd.BCH, hdIndex)
    logInfo(hd.BCH_TEST, hdIndex)
    logInfo(hd.LTC, hdIndex)
    logInfo(hd.LTC_TEST, hdIndex)
    logInfo(hd.ETH, hdIndex)
    logInfo(hd.TRX, hdIndex)
}
const mnemonic = "star star star star star star"
const pwd = "star"
const seed = "03d0be996b63e90c7625dd3f5319c3bc11669d3d35ae5dc345595e5e59be74084f"
const base58 = "xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi"

describe("address init", () => {

    it(" getRandomMnemonic", () => {
        const mnemonic = hdAddress.mnemonic.getRandomMnemonic()
        let hd = hdAddress.HD(mnemonic)
        getAddress(hd)
    })

    it(" from mnemonic str", () => {
        let hd = hdAddress.HD(mnemonic, hdAddress.keyType.mnemonic, pwd)
        getAddress(hd)
    })

    it(" getRandomSeed", () => {
        const {seed} = hdAddress.seed.getRandomSeed()
        let hd = hdAddress.HD(seed, hdAddress.keyType.seed)
        getAddress(hd)
    })

    it(" from seed string", () => {
        // Seed should be at least 128 bits and most 512 bits
        const seedBuf = Buffer.from(seed, "hex")
        let hd = hdAddress.HD(seedBuf, hdAddress.keyType.seed)
        getAddress(hd)
    })

    it(" getRandomBase58", () => {
        const {base58} = hdAddress.base58.getRandomBase58()
        let hd = hdAddress.HD(base58, hdAddress.keyType.base58)
        getAddress(hd)
    })


    it("from base58 str", () => {
        let hd = hdAddress.HD(base58, hdAddress.keyType.base58)
        getAddress(hd)
    })

    it(" getHDWallet", () => {
        const {root} = hdAddress.seed.mnemonicToSeed(mnemonic)
        let hd = hdAddress.HD(root, hdAddress.keyType.root)
        let {path, pub} = hd.wallet.getCoinKeyPair("BTC", 0, 0, 0)
        console.log(path)
        let {address} = hd.TRX.getAddress(1)
        console.log(address)
    })

})
