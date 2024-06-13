const {normalizeURL} = require('./crawl.js')
const {test , expect} = require('@jest/globals')


test('normalizeURL', ()=>{
    const input = 'https://boot.dev/loc/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/loc'

    expect(actual).toEqual(expected)
})