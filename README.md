# hd-address
[![NPM version](https://img.shields.io/npm/v/hd-address?style=flat-square)](https://www.npmjs.com/package/hd-address)

An extensible HD Wallet Address management utility
 
[example](https://github.com/gisvr/hd-address-example)   
[中文文档](https://github.com/gisvr/hd-address/blob/master/README_CN.md)
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
### Mnemonic Initialization: [example](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.pwd.js) 
```javascript
    const hdAddress = require("hd-address")  
    const mnemonic = hdAddress.mnemocie.getRandomMnemonic() 
    const pwd = "star"  
    let hd = hdAddress.HD(mnemonic,hdAddress.keyType.mnemonic,pwd) //v3.1
```

### Seed Initialization: [example](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 

```javascript
    const hdAddress = require("hd-address")
    const {seed} =hdAddress.mnemocie.getRandomSeed() 
    // Seed should be at least 128 bits and most 512 bits
    // let seedBuf = Buffer.from(seed, "hex")
    let hd = hdAddress.HD(seed,hdAddress.keyType.seed) //v3.0
```

### Base58 Initialization: [example](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 

```javascript
    const hdAddress = require("hd-address")  
    const {base58} =hdAddress.mnemocie.getRandomBase58() 
    let hd = hdAddress.HD(base58,hdAddress.keyType.base58) //v3.1
```

## Basic Usage

### **Get Random Mnemonic :** [example](https://github.com/gisvr/hd-address-example/blob/master/mnemonic_safe/mnemonic.js) 
```javascript
    // default
    let mnemo = hdAddress.mnemocie.getRandomMnemonic() 
    // Mnemonic
    let wordList = hdAddress.mnemonic.wordLists.zh
    let strength = hdAddress.mnemonic.strength.high 
    let cnMnemo = hdAddress.mnemonic.getRandomMnemonic(strength, wordList)
    console.log(cnMnemo)
    // Mnemonic(is safe)
    let isMnemo = hdAddress.mnemonic.validateMnemonic(cnMnemo) 
    console.log(isMnemo)
```
### **Get Random seed or base58 :** [example](https://github.com/gisvr/hd-address-example/blob/master/mnemonic_safe/mnemonic.js) 
```javascript
    let {seed} = hdAddress.seed.getRandomSeed()  
    console.log(seed)
    let {base58} = hdAddress.base58.getRandomBase58()  
    console.log(base58)
```
### **Get BTC ETH TRX address :** [example](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.js) 
```javascript
    let hdIndex=6677
    let btcAddr =  hd.BTC.getAddress(hdIndex)
    console.log("BTC",btcAddr.address)
    
    let ethAddr =  hd.ETH.getAddress(hdIndex)
    console.log("ETH",ethAddr.address)
    
    let trxAddr =  hd.TRX.getAddress(hdIndex)
    console.log("TRX",trxAddr.address)
 
    let hdpath = "m/0'/1/1" // account/change/index
    let {address, pub, pri, path} = hd.BTC.getAddressByPath(hdpath)
    console.log(address, pub, pri, path) 
```

### **Get keypair:** [example](https://github.com/gisvr/hd-address-example/blob/master/address/address.keypair.js)
```js
  let {address, path, pri, pub} =  hd.BTC.getCoinAddressKeyPair(hdIndex)
  console.log(address, path)
```
### **Get address using private key or public key**
```js
  let priAddr =  hd.BTC.getAddressByPrivateKey(pri)
  console.assert(priAddr.address == address)

  let pubAddr =  hd.BTC.getAddressByPublicKey(pub)
  console.assert(pubAddr.address == address)
```

## Advanced Usage
### **EOS extension:** [example](https://github.com/gisvr/hd-address-example/blob/master/extension/eos.address.js)
You can extend hd-address by implementing AddressClass
```javascript

const AddressClass =  require("hd-address").AddressClass //v3.0

module.exports = class EosAddress extends AddressClass {
    constructor(hd) {
        let coin = "EOS"
        super(hd, coin);
    }

    getAddress(index) {
        console.log(this.coin, "implement  getAddress method")
    }

    getAddressByPrivateKey(privateKey) {
        console.log(this.coin, "implement  getAddressByPrivateKey method")
    }

    getAddressByPublicKey(privateKey) {
        console.log(this.coin, "implement  getAddressByPublicKey method")
    }
}
```
### **Get address using chain code:** [example](https://github.com/gisvr/hd-address-example/blob/master/chaincode/chaincode.js)
Chain Code can do hierarchical authorization management
```js
    let hdPath = "m/44'/0'/1'"
    let {pub, chainCode} = hd.wallet.getChainCodeByPath(hdPath)
    console.log(hdPath, "chainCode", chainCode.toString("hex"),"\n")

    // pubKey + chainCode +childPath =>  address
    let childPath = "m/1/" + hdIndex
    let child = hd.wallet.getPublicKeyByChainCode(pub, chainCode, childPath)
    let childAaddr = hd.BTC.getAddressByPublicKey(child.pub)
    console.log(childPath, child.pub.toString("hex"),"BTC Address",childAaddr.address)

    //path =>  address
    let testPath = "m/44'/0'/1'/1/" + hdIndex
    let test = hd.wallet.getChainCodeByPath(testPath)
    let testAaddr = hd.BTC.getAddressByPublicKey(test.pub)
    console.log(testPath, test.pub.toString("hex"),"BTC Address",testAaddr.address)
```

### **Get address by path:** 
```js
    let hdpath = "m/0'/1/1" //account/change/index
    let {address, pub, pri, path} = hd.BTC.getAddressByPath(hdpath)
    console.log(address, pub, pri, path) 
```
# Testing

```js
  mocha 
```

# License

[Apache-2.0 License](./LICENSE)

## Donor Address
```js
"BTC": "1HthGRdzxunKAiMSazDdL8PZhE4qWpeBNK", 
"BCH": "12owPGh3cXLk8HevCEx5fZAMPqZPBgvgmX",
"LTC": "LchXCPCtYTKUvksjf5RvkZhCwvYQrYewaa",
"ETH": "0x4E04823FDF08E862201a4cfA595dc1Ec72AdF3Ab",
"TRX": "TZFH9KReZpsWZZ9Q2bVyXGQtmvVL3PV8gE",
```
