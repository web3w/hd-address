// let hdPath =  "m/1/1"
let hdPath = "m/1' / change / 6677     "

let parm = hdPath.split("/")
console.log(parm)

let path = {}
let foo = parm.reverse()

console.log(foo)
foo.map((val, i) => {
    val = val.trim()
    if (/^[0-9]+'?$/.test(val)) {
        if (i == 0) {
            path.index = val
        } else if (i == 1) {
            path.change = val
        } else if (i == 2) {
            path.account = val.replace(/(\s*['])/g,"");
        }
    }
    if(i>3){
        throw "path length >4"
    }
})

console.log(path.index, path.change, path.account)