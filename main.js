const {crawlpage} = require('./crawl.js')

async function main(){
    if (process.argv.length < 3){
        console.log('no link provided')
        process.exit(1)
    }
    
    if (process.argv.length > 3){
        console.log('too many arguments')
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    console.log(`starting crawl on ${baseUrl}`)
    const pages = await crawlpage(baseUrl,baseUrl,{})
    
    for (const page of Object.entries(pages)){
        console.log(page)
        
    }
}


main()