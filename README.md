# hd-address
[![NPM version](https://img.shields.io/npm/v/hd-address?style=flat-square)](https://www.npmjs.com/package/hd-address)

HD wallet address generation utility.

### Getting started
### Install
```
npm i hd-address
```
### Reference 
[HD Wallet (bip32)](https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png)

[Mnemonic wordlists reference (bip39)](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md) 

[HD Wallet coin type list (bip44)]( https://github.com/satoshilabs/slips/blob/master/slip-0044.md)  
m / purpose' / coin_type' / account' / change / address_index
```js
                                                        / address 0
                coinType 0(btc) -- account 0 -- change 0  
              /                                         \ address 1
root -- BIP44 
              \
                coinType 60(eth) -- account 0 -- change 1 -- address 0
                          
```
 
## Initialization
### Mnemonic Initialization
 [example](./example/mnemonic.js) 
```javascript
const mnemonic = "star star star star star star"
//const hd = require("hd-address")(mnemonic) //v2.0
let hd = require("hd-address").HD(mnemonic) //v3.0
```

### Seed Initialization 
 [example](./example/seed.js) 

```javascript
const seed ="03d0be996b63e90c7625dd3f5319c3bc11669d3d35ae5dc345595e5e59be74084f"
const hdAddress = require("hd-address")
// Seed should be at least 128 bits and most 512 bits
let seedBuf = Buffer.from(seed, "hex")
let hd = hdAddress.HD(seedBuf,hdAddress.keyType.seed) //v3.0
```


## Basic Usage

### **Get BTC ETH TRX address :**
 [example](./example/mnemonic.js) 
```javascript
 let hdIndex=6677
 let btcAddr = await hd.BTC.getAddress(hdIndex)
 console.log("BTC",btcAddr.address)

 let ethAddr = await hd.ETH.getAddress(hdIndex)
 console.log("ETH",ethAddr.address)

 let trxAddr = await hd.TRX.getAddress(hdIndex)
 console.log("TRX",trxAddr.address)
```

### **Get keypair**   [get keypair example](./test/index.getkeypair.test.js)
```js
 let {address, pri, pub} = await hd.BTC.getAddressKeyPair(hdIndex)
```

### **Get address using private key or public key**
```js
  let priAddr = await hd.BTC.getAddressByPrivateKey(pri)
  console.assert(priAddr.address == address)

  let pubAddr = await hd.BTC.getAddressByPublicKey(pub)
  console.assert(pubAddr.address == address)
```

## Advanced Usage
### **extension**  [example](./example/extension/index.js) 
```js 
const AddressClass =  require("hd-address").AddressClass //v3.0

module.exports = class EosAddress extends AddressClass {
    constructor(hd) {
        let coin = "EOS"
        super(hd, coin);
    }

    async getAddress(index) {
        console.log(this.coin, " implement  getAddress method")
    }

    async getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "  implement  getAddressByPrivateKey method")
    }

    async getAddressByPublicKey(privateKey) {
        console.log(this.coin, "  implement  getAddressByPublicKey method")
    }
}
```

# Testing

```shell
mocha 
```

# License

[Apache-2.0 License](./LICENSE)

### Donor Address
```js
"BTC": "1HthGRdzxunKAiMSazDdL8PZhE4qWpeBNK", 
"BCH": "12owPGh3cXLk8HevCEx5fZAMPqZPBgvgmX",
"LTC": "LchXCPCtYTKUvksjf5RvkZhCwvYQrYewaa",
"ETH": "0x4E04823FDF08E862201a4cfA595dc1Ec72AdF3Ab",
"TRX": "TZFH9KReZpsWZZ9Q2bVyXGQtmvVL3PV8gE",
```
