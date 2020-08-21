'use strict';

module.exports = class Address {
    constructor(hd, coin) {
        this.HD = hd
        this.coin = coin
    }

    getCoinKeyPair(index, account, change) {
        // getCoinKeyPair(this.coin, index, account, change)
        return this.HD.getCoinKeyPair(this.coin, index, account, change);
    }

    getCoinAddressKeyPair(index, account, change) {
        let {path, pri, pub} = this.getCoinKeyPair(index, account, change);
        let {address} = this.getAddressByPublicKey(pub)
        return {address, path, pri: pri.toString("hex"), pub: pub.toString("hex")};
    };

    getAddress(index, account, change) {
        console.log(this.coin, "Please implement  getAddress method")
    }

    // m/account'/change/address_index
    getAddressByPath(hdPath) {
        let {index, account, change} = this.getPath(hdPath)
        return this.getCoinAddressKeyPair(index, account, change);
    };

    getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "Please implement  getAddressByPrivateKey method")
    }

    getAddressByPublicKey(publicKey) {
        console.log(this.coin, "Please implement  getAddressByPublicKey method")
    }

    getPath(hdPath) {
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
        return path
    }


}
