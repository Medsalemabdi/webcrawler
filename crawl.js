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

async function crawlpage(baseUrl ,currentUrl ,pages){
    const objbaseUrl = new URL(baseUrl)
    const objCurrentUrl= new URL(currentUrl)
    if (objbaseUrl.hostname !== objCurrentUrl.hostname){
        return pages
    }
    const ncurrentUrl = normalizeURL(currentUrl)
    if (pages[ncurrentUrl]>0){
        pages[ncurrentUrl]++
        return pages
    }

    pages[ncurrentUrl] = 1
    console.log(`crawling ${currentUrl}`)

    try{
        const respobj = await fetch(baseUrl)

        if (respobj.status >399){
            console.log(`error with status ${respobj.status}`)
            return pages
        }
        const ctype = respobj.headers.get('content-type')

        if (!ctype.includes('text/html')){
            console.log(`content type is not html`)
            return pages
        }
        
        const HTMLBody = await respobj.text()
        const nextUrls = getHtmlurls(HTMLBody,baseUrl)

        for (const nextUrl of nextUrls){
            pages = await crawlpage(baseUrl,nextUrl,pages)
            
        }
        


    }catch (err){
        console.log(`${err.message}`)
    }

    return pages
}

module.exports = {
    normalizeURL ,
    getHtmlurls , 
    crawlpage
}