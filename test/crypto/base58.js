const crypto = require("crypto");
const secp256k1 = crypto.createECDH("secp256k1");

// 32字节即256位的种子
const seed = crypto.randomBytes(32);
// 生成私钥
const priKey = crypto
    .createHash("sha256")
    .update(seed)
    .digest();

// 打印可读的16 进制字符串
console.log(priKey.toString("hex"));
secp256k1.setPrivateKey(priKey);
// 获取非压缩公钥
const pubKey = secp256k1.getPublicKey(undefined, "uncompressed");
console.log(pubKey.toString("hex"));

const sha256_result = crypto
    .createHash("sha256")
    .update(pubKey)
    .digest();
const ripemed160_result = crypto
    .createHash("ripemd160")
    .update(sha256_result)
    .digest();

console.log(ripemed160_result.toString("hex"))


const table = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const zero = 0n;
const base = 58n;

const bs58 = (buf) => {
    const hex = buf.toString("hex");
    let x = hex.length === 0 ? zero : BigInt("0x" + hex);
    let res = "";

    while (x > zero) {
        res = table[Number(x % base)] + res;
        x = x / base;
    }

    for (let i = 0; i < hex.length; i += 2) {
        if (hex[i] === "0" && hex[i + 1] === "0") {
            res = "1" + res;
        } else {
            break;
        }
    }
    return res;
};
let foo = bs58(ripemed160_result)
console.log(foo)
