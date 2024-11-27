
const search = (target, searchAll, limit) => {

    const makeChildNodeFor = function* (n) {
    
        let base = n * Math.pow(2, n == 1 ? 3 : 1) // 4 - 2 - 1 is an infinite loop
        if ((base - 1) % 3 != 0) base *= 2 // double if 2^1 mod 3 was 2
    
        let res
        while (true) {
            res = (base - 1) / 3
            base *= 4 // every second power of 2 gives us new result
            yield res
        }
    }
    
    const addNode = (child, parent) => {
        nodes[child] = {
            gen: makeChildNodeFor(child),
            val: child,
            parent: child == parent ? null : nodes[parent],
            marked: false
        }
    }
    
    const markPath = (obj) => {
        obj.marked = true
        if (obj.parent && !obj.parent.marked) markPath(obj.parent)
    }

    const nodes = {}

    addNode(1,1)

    let stop
    while (!stop) {
        const cached = Object.entries(nodes)

        const foundOdds = Object.keys(nodes).filter(v => v <= target).length
        if (searchAll && foundOdds == (target + 1) / 2) break

        for (const [key, value] of cached) {
            if (key % 3 == 0) continue // a dead end (will never beget anything new)
            const tick = value.gen.next()
            const found = tick.value
            if (found < limit || found == target) addNode(found, key)
            if (searchAll && found <= target && nodes[found]) markPath(nodes[found])
            if (!searchAll && found == target) {
                markPath(nodes[found])
                stop = true
                break
            }
        }
        if (Object.keys(nodes).length == cached.length) throw Error("We're stuck! Consider increasing LIM")
    }

    return Object.values(nodes).filter(v => v.marked).map( v => ({  // only those who lead to dudes we searched
        val: v.val,
        parent: v.parent ? v.parent.val : v.val
    }))
}

const getPrimes = (primes) => {
    
    const max = primes[primes.length - 1] // consider primes to be sorted
    
    let prime = 3
    while (prime < max) { // and as we dont have all primes in array, we will iterate to max
        for (let i = 0; i < primes.length; i++) {
            if (primes[i] % prime == 0 && primes[i] / prime > 1) { // simplest sieve O(n^2)
                primes.splice(i, 1) // not so cool (
                i-- // cuz element was removed
            }
        }
        prime += 2 // only odd
    }
    return primes
}

module.exports = {
    search,
    getPrimes
}