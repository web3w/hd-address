'use strict';

let HDWallet = require("../../../lib/utils/base58.hd")

let hdData = require("../../data").hd
let key = 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi'
let node =new HDWallet(key)

let child = node.getPathChainCode('m/0/0')

console.log(child.pub.toString("hex"))