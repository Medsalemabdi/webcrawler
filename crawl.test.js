const { get } = require('http')
const {normalizeURL , getHtmlurls} = require('./crawl.js')
const {test , expect} = require('@jest/globals')


test('normalizeURL', ()=>{
    const input = 'https://boot.dev/loc/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/loc'

    expect(actual).toEqual(expected)
})

test('getHtmlurls',()=>{
    const baseUrl = 'https://boot.dev'
    const HTMLBody = `
<html>
    <body>
        <a href='https://boot.dev/loc/'>
            hello
        </a>
        <a href='/loc1/'>
            hello
        </a>
    </body>
</html>`

    const actual = getHtmlurls(HTMLBody,baseUrl)
    const expected = ["https://boot.dev/loc/","https://boot.dev/loc1/"]

    expect(actual).toEqual(expected)
})