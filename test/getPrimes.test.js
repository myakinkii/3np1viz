const { getPrimes, search } = require("../lib")

test('simplest real case', () => {
    const result = getPrimes([1, 5])
    expect(result).toEqual([1, 5])
})

test('some removed vals', () => {
    const result = getPrimes([1, 5, 7, 9, 11, 13, 15 ])
    expect(result).toEqual([1, 5, 7, 11, 13])
})

test('primes in a tree up to 17', () => {
    const result = search(17, true, 100, true)
    const primes = getPrimes(result.map(v => v.val))
    expect(primes).toEqual([1, 3, 5, 7, 11, 13, 17, 23, 53]) // have some extra primes
})