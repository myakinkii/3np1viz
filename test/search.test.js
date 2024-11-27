const { search } = require("../lib")

test('simplest real case', () => {
    const result = search(5, false, 0)
    expect(result).toEqual([{ val: 1, parent: 1 }, { val: 5, parent: 1 }])
})

test('limit not enough', () => {
    expect(() => search(3, false, 5)()).toThrow("We're stuck! Consider increasing LIM");
})

test('limit enough for simple path', () => {
    const result = search(853, false, 100)
    expect(result).toEqual([{ val: 1, parent: 1 }, { val: 5, parent: 1 }, { val: 853, parent: 5 }])
})

test('simple tree up to 7', () => {
    const result = search(7, true, 100)
    expect(result).toEqual([
        { val: 1, parent: 1 }, { val: 3, parent: 5 }, { val: 5, parent: 1 },
        { val: 7, parent: 11 }, { val: 11, parent: 17 }, { val: 13, parent: 5 }, { val: 17, parent: 13 }
    ])
})

test('bigger tree up to 17', () => {
    const result = search(17, true, 100)
    expect(result).toEqual([
        { val: 1, parent: 1 }, { val: 3, parent: 5 }, { val: 5, parent: 1 }, { val: 7, parent: 11 },
        { val: 9, parent: 7 }, { val: 11, parent: 17 }, { val: 13, parent: 5 }, { val: 15, parent: 23 }, 
        { val: 17, parent: 13 }, { val: 23, parent: 35 }, { val: 35, parent: 53 }, { val: 53, parent: 5 }
    ])})