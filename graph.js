try {
    require('dotenv').config()
} catch (e){
    console.error(e.message) // not a critical error though
}

const { search, getPrimes } = require("./lib")

const SEARCH = +process.env.SEARCH || 127 // target number
const ALL = !!process.env.ALL // search for all numbers below target
const LIM = +process.env.LIM || 500 * SEARCH // heuristics to optimize search time (and tree size)

try {
    console.log("graph { \n")

    const result = search(SEARCH, ALL, LIM)

    getPrimes(result.map(v => v.val)).forEach(p => console.log(`${p} [color=green]`))
    console.log("\n")

    result.forEach(v => console.log(`${v.val} -- ${v.parent}`))

} catch (e) {
    console.error(e.message) // this goes to stderr to still have properly working pipe
} finally {
    console.log("\n}")
}