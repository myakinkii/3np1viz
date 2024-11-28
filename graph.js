try {
    require('dotenv').config()
} catch (e){
    console.error(e.message) // not a critical error though
}

const { trace, search, getPrimes } = require("./lib")

const TRACE = +process.env.TRACE // magic parameter to run sequence for a number instead of searching
const SEARCH = +process.env.SEARCH || 7 // target number
const LIM = +process.env.LIM || 500 * SEARCH // max value to be added to graph
const ALL = !!process.env.ALL // also search for all numbers below target
const SKIP = !!process.env.SKIP // only return nodes that lead to search targets

try {
    console.log("graph { \n")

    const result = TRACE ? trace(TRACE, ALL) : search(SEARCH, ALL, LIM, SKIP)

    const now=Date.now()
    getPrimes(result.map(v => v.val)).forEach(p => console.log(`${p} [color=green]`))
    console.log("\n")
    console.error(`getPrimes took ${(Date.now()-now)/1000}s`)

    result.forEach(v => console.log(`${v.val} -- ${v.parent}`))

} catch (e) {
    console.error(e.message) // this goes to stderr to still have properly working pipe
} finally {
    console.log("\n}")
}