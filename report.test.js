const {sortpages} = require('./report.js')
const {test , expect} = require('@jest/globals')


test('sortpages ', ()=>{
    const input = {
        'https://boot.dev':1 ,
        'https://boot.dev/path1/':2 ,
        'https://boot.dev/path2/':3 , 
    }
    const actual = sortpages(input)
    const expected = [
        ['https://boot.dev/path2/',3] ,
        ['https://boot.dev/path1/',2],
        ['https://boot.dev',1]
    ]

    expect(actual).toEqual(expected)
})