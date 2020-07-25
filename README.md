# hd-address
[![NPM version](https://img.shields.io/npm/v/hd-address?style=flat-square)](https://www.npmjs.com/package/hd-address)

HD wallet address generation utility.

## Install
```
npm i hd-address
```
## Usage
### Reference 
[Mnemonic wordlists reference (bip39)](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md)   
[Hd coin type list (bip44)]( https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
 

### Client Initialization

```javascript
const mnemonic = "star star star star star star"
const hd = require("../index")(mnemonic)
```

### Basic Usage

**Get BTC ETH TRX address :**
 [example](./test/example.js) 
```javascript
 let hdIndex=6677
 let btcAddr = await hd.BTC.getAddress(hdIndex)
 console.log("BTC",btcAddr.address)

 let ethAddr = await hd.ETH.getAddress(hdIndex)
 console.log("ETH",ethAddr.address)

 let trxAddr = await hd.TRX.getAddress(hdIndex)
 console.log("TRX",trxAddr.address)
```

**Get keypair**   [get keypair example](./test/index.getkeypair.test.js)
```js
 let {address, pri, pub} = await hd.BTC.getAddressKeyPair(hdIndex)
```

**Get address using private key or public key**
```js
  let priAddr = await hd.BTC.getAddressByPrivateKey(pri)
  console.assert(priAddr.address == address)

  let pubAddr = await hd.BTC.getAddressByPublicKey(pub)
  console.assert(pubAddr.address == address)
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
