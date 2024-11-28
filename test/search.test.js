const { search, trace } = require("../lib")

test('simplest real case', () => {
    const result = search(5, false, 0)
    expect(result).toEqual([{ val: 1, parent: 1, pow: 2 }, { val: 5, parent: 1, pow: 4 }])
})

test('limit not enough', () => {
    const result = search(3, false, 5) // ok
    expect(result.length).toBe(3)
    expect(() => search(3, false, 3)()).toThrow("We're stuck! Consider increasing LIM");
})

test('path to 11 with all the nodes we generated', () => {
    const result = search(11, false, 500 * 11)
    expect(result).toEqual([
        { val: 1, parent: 1, pow: 1, pow: 2 }, { val: 3, parent: 5, pow: 1 }, { val: 5, parent: 1, pow: 4 },
        { val: 11, parent: 17, pow: 1 }, { val: 13, parent: 5, pow: 3 }, { val: 17, parent: 13, pow: 2 },
        { val: 21, parent: 1, pow: 6 }, { val: 53, parent: 5, pow: 5 }, { val: 69, parent: 13, pow: 4 },
        { val: 85, parent: 1, pow: 8 }, { val: 113, parent: 85, pow: 2 }, { val: 213, parent: 5, pow: 7 },
        { val: 341, parent: 1, pow: 10 }, { val: 1365, parent: 1, pow: 12 }
    ])
})

test('path to 11 with some nodes skipped due to limit', () => {
    const result = search(11, false, 100)
    expect(result).toEqual([
        { val: 1, parent: 1, pow: 2 }, { val: 3, parent: 5, pow: 1 }, { val: 5, parent: 1, pow: 4 },
        { val: 11, parent: 17, pow: 1 }, { val: 13, parent: 5, pow: 3 }, { val: 17, parent: 13, pow: 2 },
        { val: 21, parent: 1, pow: 6 }, { val: 53, parent: 5, pow: 5 }, { val: 69, parent: 13, pow: 4 },
        { val: 85, parent: 1, pow: 8 }
    ])
})

test('path to 9 where default 500*9 limit is less than max potential number we generate', () => {
    const resultAll = search(9, false, 500 * 100)
    expect(resultAll.length).toBe(32)

    const resultSkipped = search(9, false, 500 * 9)
    expect(resultSkipped.length).toBe(30)
})

test('simple tree up to 7', () => {
    const result = search(7, true, 100, true)
    expect(result).toEqual([
        { val: 1, parent: 1, pow: 2 }, { val: 3, parent: 5, pow: 1 }, { val: 5, parent: 1, pow: 4 },
        { val: 7, parent: 11, pow: 1 }, { val: 11, parent: 17, pow: 1 }, { val: 13, parent: 5, pow: 3 },
        { val: 17, parent: 13, pow: 2 }
    ])
})

test('bigger tree up to 17', () => {
    const result = search(17, true, 100, true)
    expect(result).toEqual([
        { val: 1, parent: 1, pow: 2 }, { val: 3, parent: 5, pow: 1 }, { val: 5, parent: 1, pow: 4 },
        { val: 7, parent: 11, pow: 1 }, { val: 9, parent: 7, pow: 2 }, { val: 11, parent: 17, pow: 1 },
        { val: 13, parent: 5, pow: 3 }, { val: 15, parent: 23, pow: 1 }, { val: 17, parent: 13, pow: 2 },
        { val: 23, parent: 35, pow: 1 }, { val: 35, parent: 53, pow: 1 }, { val: 53, parent: 5, pow: 5 }
    ])
})

test('trace and search provide same path up to 127 single target', () => {
    const resultUp = search(127, false, 500 * 127, true)
    const resultDown = trace(127, false)
    expect(resultUp).toEqual(resultDown)
})

test('trace and search provide same tree up to 127 ', () => {
    const resultUp = search(127, true, 500 * 127, true)
    const resultDown = trace(127, true)
    expect(resultUp).toEqual(resultDown)
})

test('limit not enough for trace', () => {
    const result = trace(3, false, 5) // ok
    expect(result.length).toBe(3)
    expect(() => trace(3, false, 3)()).toThrow("We're stuck! Consider increasing LIM");
})