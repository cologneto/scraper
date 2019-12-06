import Scraper from './models/Scraper'
import { url } from './config'

const scraper = new Scraper(url);
console.log(scraper);




// scrapeData().then((html) => {
//     var parser = new DOMParser();
//     var doc = parser.parseFromString(html, 'text/html');
//     console.log(doc)
// });