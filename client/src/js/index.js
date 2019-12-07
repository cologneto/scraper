import Scraper from './models/Scraper'
import { url } from './config'

import elements from './views/base'

const state = {};

const scraperController = async () => {
    state.scraper = new Scraper(url);

    await state.scraper.scrapeData();

    const html = state.scraper.convertTextToHTML();
    state.scraper.convertHTMLtoJSON(html);
};

elements.scraperBtn.addEventListener('click', e => {
    e.preventDefault()
    scraperController();
});