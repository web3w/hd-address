# hd-address
[![NPM version](https://img.shields.io/npm/v/hd-address?style=flat-square)](https://www.npmjs.com/package/hd-address)

> An extensible HD Wallet Address management utility
>
 [中文说明](https://github.com/gisvr/hd-address/blob/master/README_CN.md)
 
 Please contact us if you have any special needs txdev6@gmail.com 

### Install
```
$ npm i hd-address
$ yarn add hd-address
```
### Reference 
* [HD Wallet (bip32)](https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png)
* [Mnemonic wordlists reference (bip39)](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md) 
* [HD Wallet coin type list (bip44)]( https://github.com/satoshilabs/slips/blob/master/slip-0044.md)  
> m / purpose' / coin_type' / account' / change / address_index
```js
                                                        / address 0
                coinType 0(btc) -- account 0 -- change 0  
              /                                         \ address 1
root -- BIP44 
              \
                coinType 60(eth) -- account 0 -- change 1 -- address 0
                          
```
## API
#### 1.HD Wallet private key API 
```javascript
const hdAddress = require("hd-address")  
// Generate mnemocie seed base58
const mnemocie = hdAddress.mnemocie.getRandomMnemocie()
const seed = hdAddress.seed.getRandomSeed()
const base58 = hdAddress.base58.getRandomBase58()

// Create Hd wallet
const hdWallet =new hdAddress.mnemocie(mnemocie)
const hdWallet =new hdAddress.seed(seed)
const hdWallet =new hdAddress.base58(base58)

// Generate keypair
hdWallet.getHdPath(coinTypeCode, index, account = 0, change = 0) 
hdWallet.getKeyPair(coinTypeCode, index, account, change) 
hdWallet.getCoinKeyPair(coin, index, account, change) 

// ChainCode
hdWallet.getChainCodeByPath(path)
hdWallet.getPublicKeyByChainCode(parentPub, chainCode, path)
hdWallet.getPrivateKeyByChainCode(parentPri, chainCode, path)

```

#### 2.Get coin address  API
```javascript
const hdAddress = require("hd-address")  
// Create a wallet with Coin Info
let hd = hdAddress.HD(mnemonic,hdAddress.keyType.mnemonic,pwd)
let hd = hdAddress.HD(seed,hdAddress.keyType.seed) 
let hd = hdAddress.HD(base58,hdAddress.keyType.base58) 

// Get coin info
hd.BTC.getCoinKeyPair(index, account, change)
hd.ETH.getCoinAddressKeyPair(index, account, change)
hd.TRX.getAddress(index, account, change)
hd.LTC.getAddressByPath(hdPath) 
hd.BCH.getAddressByPrivateKey(privateKey)
hd.BTC_TEST.getAddressByPublicKey(publicKey)
``` 

## Example
### Initialization
1.[Mnemonic Initialization](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.pwd.js) 
```javascript
    const mnemonic = hdAddress.mnemocie.getRandomMnemonic()    
    let hd = hdAddress.HD(mnemonic,hdAddress.keyType.mnemonic)  
```

2.[Seed Initialization](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 
```javascript
    const {seed} =hdAddress.mnemocie.getRandomSeed() 
    let hd = hdAddress.HD(seed,hdAddress.keyType.seed)  
```

3.[Base58 Initialization](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 

```javascript
    const {base58} =hdAddress.mnemocie.getRandomBase58() 
    let hd = hdAddress.HD(base58,hdAddress.keyType.base58) //v3.1
```

### Get coin address info

1.[Get BTC ETH TRX address example](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.js) 
```javascript
    let hdIndex=6677
    let btcAddr =  hd.BTC.getAddress(hdIndex)
    console.log("BTC",btcAddr.address)
    let ethAddr =  hd.ETH.getAddress(hdIndex)
    console.log("ETH",ethAddr.address)
    let trxAddr =  hd.TRX.getAddress(hdIndex)
    console.log("TRX",trxAddr.address)
```

2.Get address by path
```javascript
    let hdpath = "m/0'/1/1" // account/change/index
    let {address, pub, pri, path} = hd.BTC.getAddressByPath(hdpath)
    console.log(address, pub, pri, path) 
```

3.[Get keypair](https://github.com/gisvr/hd-address-example/blob/master/address/address.keypair.js)
```js
  let {address, path, pri, pub} =  hd.BTC.getCoinAddressKeyPair(hdIndex)
  console.log(address, path)
```
4.Get address using private key or public key
```js
  let priAddr =  hd.BTC.getAddressByPrivateKey(pri)
  console.assert(priAddr.address == address)

  let pubAddr =  hd.BTC.getAddressByPublicKey(pub)
  console.assert(pubAddr.address == address)
```

### Generate safe secret key

1.[Get Random Mnemonic](https://github.com/gisvr/hd-address-example/blob/master/mnemonic_safe/mnemonic.js) 
```javascript
    let wordList = hdAddress.mnemonic.wordLists.CN
    let strength = hdAddress.mnemonic.strength.high 
    let cnMnemo = hdAddress.mnemonic.getRandomMnemonic(strength, wordList)
    let isMnemo = hdAddress.mnemonic.validateMnemonic(cnMnemo) 
    console.log(isMnemo)
```

2.Get Random base58
```javascript
    let strength = hdAddress.base58.strength.high 
    let base58 = hdAddress.mnemonic.getRandombase58(strength)
```
 
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

# Testing

```js
  mocha 
```

# License

[Apache-2.0 License](./LICENSE)

