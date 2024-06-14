

function sortpages(pages){
    const arrpages = Object.entries(pages)
    arrpages.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]

        return b[1] - a[1]
    })

    return arrpages
}

function printReport(pages) {
    console.log('=========')
    console.log('REPORT')
    console.log('=========')

    const sortedPages = sortpages(pages)

    for (const page of sortedPages){
        const url = page[0]
        const count = page[1]

        console.log(`Found ${count} links to ${url}`)
    }

    console.log('=========')
    console.log('END REPORT')
    console.log('=========')


}
module.exports = {
    sortpages,
    printReport
}