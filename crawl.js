const { link } = require('fs')
const {JSDOM} = require('jsdom')

function normalizeURL(url){
    const urlobj = new URL(url)
    const hostpath = `${urlobj.hostname}${urlobj.pathname}`
    if (hostpath.length>0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0,-1)
    }
    return hostpath
}

function getHtmlurls(HTMLBody,baseUrl){
    const urls = []
    const dom = new JSDOM(HTMLBody)
    const linktags = dom.window.document.querySelectorAll('a')
    for (const link of linktags){
        if (link.href.slice(0 , 1) === '/'){
            try{
                const urlobj = new URL(`${baseUrl}${link.href}`)
                urls.push(`${baseUrl}${link.href}`)
            }catch(err){
                console.log(`${err.message}`)
            }
        }else{
            try{
                const urlobj = new URL(`${link.href}`)
                urls.push(link.href)
            }catch(err){
                console.log(`${err.message}`)
            }
            
        }
    }
    return urls
}

module.exports = {
    normalizeURL ,
    getHtmlurls
}