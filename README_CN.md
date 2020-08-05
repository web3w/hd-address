# hd-address
[![NPM version](https://img.shields.io/npm/v/hd-address?style=flat-square)](https://www.npmjs.com/package/hd-address)

一个可扩展的HD钱包地址管理程序

[示例](https://github.com/gisvr/hd-address-example)  
[English Doc](https://github.com/gisvr/hd-address/blob/master/README.md)
### 安装
```
npm i hd-address
```
### 参考规范 
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
 
## HD Wallet 初始化
### 使用主记词初始化: [example](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.pwd.js) 
```javascript
    const hdAddress = require("hd-address")  
    const mnemonic = hdAddress.mnemocie.getRandomMnemonic() 
    const pwd = "star"  
    let hd = hdAddress.HD(mnemonic,hdAddress.keyType.mnemonic,pwd) //支持密码
```

### 使用种子初始化: [example](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 

```javascript
    const hdAddress = require("hd-address")
    const {seed} =hdAddress.mnemocie.getRandomSeed() 

    let hd = hdAddress.HD(seed,hdAddress.keyType.seed) //v3.0
```

### 使用Base58初始化: [example](https://github.com/gisvr/hd-address-example/blob/master/init/seed.js) 

```javascript
    const hdAddress = require("hd-address")  
    const base58 =hdAddress.mnemocie.getRandomSeed() 
    let hd = hdAddress.HD(base58,hdAddress.keyType.base58) //v3.1
```

##  基本使用

### **获取随机助记词 :** [example](https://github.com/gisvr/hd-address-example/blob/master/mnemonic_safe/mnemonic.js) 
```javascript
    // 默认
    let mnemo = hdAddress.mnemocie.getRandomMnemonic() 
    // 中文助记词
    let wordList = hdAddress.mnemonic.wordLists.zh
    let strength = hdAddress.mnemonic.strength.high //强度
    const cnMnemo = hdAddress.mnemonic.getRandomMnemonic(strength, wordList)
    console.log(cnMnemo)
    // 验证助记词(是否随机安全)
    const isMnemo = hdAddress.mnemonic.validateMnemonic(cnMnemo) 
    console.log(isMnemo)
```

### **获取随机种子和Base58密钥 :** [example](https://github.com/gisvr/hd-address-example/blob/master/mnemonic_safe/mnemonic.js) 
```javascript
    let seed = hdAddress.seed.getRandomSeed()  
    console.log(seed)
    let base58 = hdAddress.base58.getRandomBase58()  
    console.log(base58)
```

### **获取 BTC ETH TRX 地址 :** [example](https://github.com/gisvr/hd-address-example/blob/master/init/mnemonic.js) 
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

### **获取密钥对和对应的HD路径:** [example](https://github.com/gisvr/hd-address-example/blob/master/address/address.keypair.js)
```js
  let hdIndex=6677
  let {address, path, pri, pub} =  hd.BTC.getCoinAddressKeyPair(hdIndex)
  console.log(address, path)
```
### **通过公钥或者私钥获取对应币种的地址**
```js
  let priAddr =  hd.BTC.getAddressByPrivateKey(pri)
  console.assert(priAddr.address == address)

  let pubAddr =  hd.BTC.getAddressByPublicKey(pub)
  console.assert(pubAddr.address == address)
```

##  进阶使用
### **EOS 币种扩展:** [example](https://github.com/gisvr/hd-address-example/blob/master/extension/eos.address.js)
可以通过实现AddressClass的方式来自己扩展hd-address支持的币种
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
### **通过chain code 获取地址:** [example](https://github.com/gisvr/hd-address-example/blob/master/chaincode/chaincode.js)
使用链码可以做分级授权管理，通过chain code对相关地址授权查看或者交易。
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

### **通过path获取对应的地址:** 
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

## 捐赠地址
```js
"BTC": "1HthGRdzxunKAiMSazDdL8PZhE4qWpeBNK", 
"BCH": "12owPGh3cXLk8HevCEx5fZAMPqZPBgvgmX",
"LTC": "LchXCPCtYTKUvksjf5RvkZhCwvYQrYewaa",
"ETH": "0x4E04823FDF08E862201a4cfA595dc1Ec72AdF3Ab",
"TRX": "TZFH9KReZpsWZZ9Q2bVyXGQtmvVL3PV8gE",
```
