import { zip } from "./zip"

describe('zip', () => {
    it('can zip an array', () => {
        expect(zip(['computer', 'music'], ['programming', 'composition']))
            .toEqual([['computer', 'programming'], ['music', 'composition']])
    })

    it('can convert a zipped array to an object using Object.fromEntries', () => {
        expect(Object.fromEntries(zip(['computer', 'music'], ['programming', 'composition'])))
            .toEqual({ computer: 'programming', music: 'composition' })
    })
})