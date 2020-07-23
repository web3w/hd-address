let verify = require("hd-address-verify")

module.exports = (coin, address, network) => {
    coin = coin && coin.toUpperCase()
    let isAddress = false
    switch (coin) {
        case "BTC":
            isAddress = verify.BTC(address)
            break;
        case "BTC_TEST":
            isAddress = verify.BTC_TEST(address)
            break;
        case "BCH":
            isAddress = verify.BCH(address)
            break;
        case "BCH_TEST":
            isAddress = verify.BCH_TEST(address)
            break;
        case "LTC":
            isAddress = verify.LTC(address)
            break;
        case "LTC_TEST":
            isAddress = verify.LTC_TEST(address)
            break;
        case "ETH":
            isAddress = verify.ETH(address)
            break;
        case "TRX":
            isAddress = verify.TRX(address)
            break;
    }
    return isAddress
}

