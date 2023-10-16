'use strict';

export default class Address {
    constructor(hd, coin) {
        this.HD = hd
        this.coin = coin
    }

    getCoinKeyPair(index, account, change, purpose = 44) {
        // getCoinKeyPair(this.coin, index, account, change) 
        return this.HD.getCoinKeyPair(this.coin, index, account, change, purpose);
    }

    getCoinAddressKeyPair(index, account, change, purpose = 44) {
        
        let { path, pri, pub } = this.getCoinKeyPair(index, account, change, purpose = 44);
        let { address } = this.getAddressByPublicKey(pub)
        return { address, path, pri: pri.toString("hex"), pub: pub.toString("hex") };
    };

    getAddress(index, account, change) {
        console.log(this.coin, "Please implement  getAddress method")
    }

    // m/account'/change/address_index
    getAddressByPath(hdPath) {
        let coin = this.coin
        let { index, account, change, purpose } = this.getPath(hdPath, coin)
        return this.getCoinAddressKeyPair(index, account, change, purpose);
    };

    getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPrivateKey method")
    }

    getAddressByPublicKey(publicKey) {
        console.log(this.coin, "Please implement  getAddressByPublicKey method")
    }

    getPath(hdPath, coin) {
        let pathParm = hdPath.split("/").reverse()
        let path = {}
        pathParm.map((val, i) => {
            val = val.trim()
            if (/^[0-9]+'?$/.test(val)) {
                if (i == 0) {
                    path.index = val
                } else if (i == 1) {
                    path.change = val
                } else if (i == 2) {
                    path.account = val.replace(/(\s*['])/g, "");
                }
            }
            if (i > 3) {
                throw "path length >4"
            }
        })
        let purpose = 44
        if (coin == "BTC_P2WPKH") {
            purpose = 84
        } else if (coin == "BTC_P2SH_P2WPKH") {
            purpose = 49
        } else if (coin == "BTC_P2TR") {
            purpose = 86
        } else if (coin == "BTC_P2PKH") {
            purpose = 44
        }

        path.purpose = purpose
        return path
    }


}
