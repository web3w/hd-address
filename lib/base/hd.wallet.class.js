'use strict';

import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';
const bip32 = BIP32Factory(ecc)
 
const coin_type = {
    "BTC": {
        "code": 0,
        "purpose": 44
    },
    "BTC_P2WPKH": {
        "code": 0,
        "purpose": 84
    },
    "BTC_P2SH_P2WPKH": {
        "code": 0,
        "purpose": 49
    },
    "BTC_P2TR": {
        "code": 0,
        "purpose": 86
    },
    "BTC_P2PKH": {
        "code": 0,
        "purpose": 44
    },
    "TEST": {
        "code": 1
    },
    "LTC": {
        "code": 2
    },
    "ETH": {
        "code": 60
    },
    "XRP": {
        "code": 144
    },
    "BCH": {
        "code": 145
    },
    "EOS": {
        "code": 194
    },
    "TRX": {
        "code": 195
    },
    "OMNI": {
        "code": 200
    }
}
let CoinType = coin_type
let hdRoot

// m/44'/0'/1'
let getChainCode = (root, path) => {
    const child = root.derivePath(path)
    let pri = child.privateKey //buffer
    let pub = child.publicKey //buffer
    let chainCode = child.chainCode //buffer
    return { pri, pub, chainCode };
}

let strength = {
    low: 128,
    mid15: 160,
    mid18: 192,
    high: 256,
}
// 原理簡介：
// 1.生成HD Wallets錢包的時候除了會生成主私鑰（master private key）和主公鑰（master public key），還會生成一個chain code。
// 2.利用master private key + chain code可以得到指定的子私鑰（sub private key）；
// 3.利用 master public key + chain code可以得到指定的子公鑰（sub-public key）；
// 4.HD Wallets 還引入了extended的概念，以方便使用。
//   即：擴展型私鑰extended private key包含了private key和chain code；擴展型公鑰extended public key包含了public key 和 chain code
// 5.每個private/public key可以派生出2^32個sub-private/public key,編號用index表示。而所有派生出來的sub-private/public keyy可以繼續派生2^32個sub-sub private/public key，一直持續下去…… 這就有了層級（dept）的概念。
// 6.編號（index）和層級（dept）就構成了路徑（PATH），就像我們的資料夾路徑，不過這裡的節點名都是數字。m(根節點)的派生出來的子節點的路徑是m/0到m/2^32-1，而m/0派生出來的子節點是m/0/0到m/0/2^32-1 。
// 7.從上面幾點很容易理解，假設要得到m/0/0的公開金鑰，只需要m/0的公開金鑰即可，而非一定需要m的公開金鑰（即主公鑰）。私鑰同理。
class HdWallet {
    constructor(root) {
        hdRoot = root
        this.coinType = CoinType
    }

    /**
     * BIP44 提出了5層的路徑建議 m / purpose' / coin_type' / account' / change / address_index
     * purporse' 固定是 44'，代表使用 BIP44。
     * coin_type' 用來表示不同幣種，例如 Bitcoin 就是 0'，Ethereum 是 60'
     * account' 顧名思義，是帳戶的意思。從0’開始。可以理解為Bitcoin-QT中的錢包
     * change：找零。一般使用0對外收款，1接受每次交易的找零
     * address_index: 位址索引
     */
    // #TODO path 44
    getHdPath(coinTypeCode, index, account = 0, change = 0,purpose=44) {
        let hdPath = `m/${purpose}'/${coinTypeCode}'/${account}'/${change}`
        if (/^[0-9]+'?$/.test(index)) {
            hdPath = hdPath + '/' + index;
        } else {
            throw "index must be a numeric type"
        }
        return hdPath
    }

    getKeyPair(coinTypeCode, index, account, change,purpose=44) {
        const path = this.getHdPath(coinTypeCode, index, account, change,purpose)
        const child = hdRoot.derivePath(path)
        let pri = child.privateKey //buffer
        let pub = child.publicKey //buffer
        return { path, pri, pub }
    }

    getCoinKeyPair(coin, index, account, change) {
        let _coinType = this.coinType && this.coinType[coin]
        let coinTypeCode = _coinType ? _coinType.code : 1 //coinType["TEST"].code
        return this.getKeyPair(coinTypeCode, index, account, change)
    }

    // m/44'/0'/1'
    getChainCodeByPath(path) {
        // const root = bip32.fromSeed(seedBuff) // 可加入网络信息 得到wif 格式的私钥
        return getChainCode(hdRoot, path)
    }

    getPublicKeyByChainCode(parentPub, chainCode, path) {
        const root = bip32.fromPublicKey(parentPub, chainCode) // 可加入网络信息 得到wif 格式的私钥
        const child = root.derivePath(path)
        let pub = child.publicKey //buffer
        return { pub };
    }

    getPrivateKeyByChainCode(parentPri, chainCode, path) {
        const root = bip32.fromPrivateKey(parentPri, chainCode) // 可加入网络信息 得到wif 格式的私钥
        const child = root.derivePath(path)
        let pri = child.privateKey //buffer
        let pub = child.publicKey //buffer
        return { pri, pub };
    }

    // --------  static ----
    static getChainCodeByRoot(root, path) {
        return getChainCode(root, path)
    }

};

HdWallet.strength = strength
export default HdWallet


