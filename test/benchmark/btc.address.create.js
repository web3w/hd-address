'use strict';
const bitcoinjs = require("bitcoinjs-lib")

let userId = 123456

// testnet
function getAddressBtc(publicKey, network) {
    return bitcoinjs.payments.p2sh({
        redeem: bitcoinjs.payments.p2wpkh({pubkey: publicKey, network}),
        network: network
    }).address
}