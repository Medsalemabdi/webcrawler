# Webcrawler

A simple Node.js CLI web crawler that scans a website, follows internal links, and prints a report showing how many times each page was linked.

> **Note**: This project is intended for learning and small test sites. Always respect a site’s terms of service and robots.txt.

## Features

- Crawls pages starting from a **base URL**
- Follows only links on the **same hostname** (internal links)
- Normalizes URLs so the same page is counted consistently
- Produces a simple console report: `Found X links to <page>`
- Includes Jest tests

## Getting started

### Prerequisites

- Node.js (recommended: v18+)
- npm (or yarn)

### Install

```bash
npm install
```

### Run the crawler

```bash
npm start -- https://example.com
```

You should see logs like:

- `starting crawl on https://example.com`
- `crawling https://example.com/...`

and then a report.

## Output

At the end of the crawl, a report is printed:

```
=========
REPORT
=========
Found 3 links to example.com/
Found 1 links to example.com/about
...
=========
END REPORT
=========
```

## Project structure

- `main.js` – CLI entry point
- `crawl.js` – crawler logic (URL normalization, HTML link extraction, recursion)
- `report.js` – sorts and prints the final report
- `*.test.js` – Jest tests

## How it works (high level)

1. `main.js` reads the base URL from the command line.
2. `crawlpage(baseUrl, currentUrl, pages)` crawls pages on the same hostname.
3. Each normalized URL is counted in the `pages` object.
4. `report.js` sorts pages by count and prints the report.

## Testing

```bash
npm test
```

## Notes / limitations

- The crawler currently fetches pages using Node’s built-in `fetch`.
- It follows links found in `<a>` tags.
- It does not yet implement rate limiting, concurrency control, robots.txt support, or depth limits.

## License

ISC
