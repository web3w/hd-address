'use strict';


const bip39 = require('bip39');
const bip32 = require('bip32');
const conf = require("../../conf/hd")

let mnemonicStr = conf.default_mnemonic //It's public
const CoinType = conf.coin_type

let getHdPath = (coin, index, account = 1, change = 0,) => {
    let _coinType = CoinType[coin]
    let coinTypeCode = _coinType ? _coinType.code : 1 //coinType["TEST"].code
    return `m/44'/${coinTypeCode}'/${account}'/${change}/${index}`
}

let getAddressKeyPair = (seedBuff, path) => {
    const root = bip32.fromSeed(seedBuff) // 可加入网络信息 得到wif 格式的私钥
    const child = root.derivePath(path)
    let pri = child.privateKey //buffer
    let pub = child.publicKey //buffer
    return {pri, pub};
}
/**
 * BIP44 提出了5層的路徑建議 m / purpose' / coin_type' / account' / change / address_index
 * purporse' 固定是 44'，代表使用 BIP44。
 * coin_type' 用來表示不同幣種，例如 Bitcoin 就是 0'，Ethereum 是 60'
 * account' 顧名思義，是帳戶的意思。從0’開始。可以理解為Bitcoin-QT中的錢包
 * change：找零。一般使用0對外收款，1接受每次交易的找零
 * address_index: 位址索引
 * @returns {Promise<void>}
 */
module.exports = class HD {
    constructor(mnemonic) {
        if (mnemonic) {
            mnemonicStr = mnemonic
        } else {
            console.warn("-----------  the mnemonic is public, please init mnemonic  ------------")
        }
    }

    async getCoinKeyPair(coin, index, account, change) {
        const seed = await bip39.mnemonicToSeed(mnemonicStr)
        const path = getHdPath(coin, index, account, change)
        return getAddressKeyPair(seed, path)
    }

    // m/44'/0'/1'
    async getPathChainCode(path) {
        const seed = await bip39.mnemonicToSeed(mnemonicStr)
        const root = bip32.fromSeed(seed) // 可加入网络信息 得到wif 格式的私钥
        const child = root.derivePath(path)
        let pri = child.privateKey //buffer
        let pub = child.publicKey //buffer
        let chainCode = child.chainCode //buffer
        return {pri, pub, chainCode};
    }

    async getPublicKeyByChainCode(parentPub, chainCode, path) {
        const root = bip32.fromPublicKey(parentPub, chainCode) // 可加入网络信息 得到wif 格式的私钥
        const child = root.derivePath(path)
        let pri = child.privateKey //buffer
        let pub = child.publicKey //buffer
        return {pri, pub};
    }

    async getSeedKey() {
        const seed = await bip39.mnemonicToSeed(mnemonicStr)
        return seed.toString("hex");
        // let priKeyBuff = Buffer.from(seedKey, "hex")
    }
};
// 原理簡介：
// 1.生成HD Wallets錢包的時候除了會生成主私鑰（master private key）和主公鑰（master public key），還會生成一個chain code。
// 2.利用master private key + chain code可以得到指定的子私鑰（sub private key）；
// 3.利用 master public key + chain code可以得到指定的子公鑰（sub-public key）；
// 4.HD Wallets 還引入了extended的概念，以方便使用。即：擴展型私鑰extended private key包含了private key和chain code；擴展型公鑰extended public key包含了public key 和 chain code
// 5.每個private/public key可以派生出2^32個sub-private/public key,編號用index表示。而所有派生出來的sub-private/public keyy可以繼續派生2^32個sub-sub private/public key，一直持續下去…… 這就有了層級（dept）的概念。
// 6.編號（index）和層級（dept）就構成了路徑（PATH），就像我們的資料夾路徑，不過這裡的節點名都是數字。m(根節點)的派生出來的子節點的路徑是m/0到m/2^32-1，而m/0派生出來的子節點是m/0/0到m/0/2^32-1 。
// 7.從上面幾點很容易理解，假設要得到m/0/0的公開金鑰，只需要m/0的公開金鑰即可，而非一定需要m的公開金鑰（即主公鑰）。私鑰同理。


