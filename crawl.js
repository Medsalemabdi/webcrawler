function normalizeURL(url){
    const urlobj = new URL(url)
    const hostpath = `${urlobj.hostname}${urlobj.pathname}`
    if (hostpath.length>0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0,-1)
    }
    return hostpath
}

module.exports = {
    normalizeURL
}