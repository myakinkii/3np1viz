try {
    require('dotenv').config()
} catch (e){
    console.error(e.message) // not a critical error though
}

const { search, getPrimes } = require("./lib")

const SEARCH = +process.env.SEARCH || 7 // target number
const LIM = +process.env.LIM || 500 * SEARCH // max value to be added to graph
const ALL = !!process.env.ALL // also search for all numbers below target
const SKIP = !!process.env.SKIP // only return nodes that lead to search targets

try {
    console.log("graph { \n")

    const result = search(SEARCH, ALL, LIM, SKIP)

    getPrimes(result.map(v => v.val)).forEach(p => console.log(`${p} [color=green]`))
    console.log("\n")

    result.forEach(v => console.log(`${v.val} -- ${v.parent}`))

} catch (e) {
    console.error(e.message) // this goes to stderr to still have properly working pipe
} finally {
    console.log("\n}")
}