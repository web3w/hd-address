'use strict';

let seed = require("../../../lib/utils/seed.hd")


it("getRandomSeed default", () => {
    let mnemo =  seed.getRandomSeed(128,"pwd") //hdData.mnemonic //
    console.log(mnemo)

    // {
    //     mnemonic: 'process main stamp fringe original unveil guard spawn sight muffin fragile frozen',
    //     seed: '5ba1a3a7de7e34d77fd3c59df7d9c821244a89acba5b44047bd5aeaa22093468c07076a21461cb3218471c8f7ed34a001edb9cfd2441ba71b53b1a245e8bc7ed',
    //     pwd: 'pwd'
    // }


    let mnemo1 =  seed.mnemonicToSeed('process main stamp fringe original unveil guard spawn sight muffin fragile frozen',"pwd")
    console.log(mnemo1)
})
