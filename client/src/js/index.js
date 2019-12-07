import Scraper from './models/Scraper'
import ItemList from './models/ItemList'
import { renderItemForList } from './views/itemListView'
import { url } from './config'

import elements from './views/base'

const state = {};

const scraperController = async () => {
    state.scraper = new Scraper(url);
    state.itemList = new ItemList();

    await state.scraper.scrapeData();

    const html = state.scraper.convertTextToHTML();
    state.scraper.convertHTMLtoJSON(html);

    // await state.scraper.postDataToServer()
    await state.itemList.getAllItems();

    state.itemList.items.forEach((item) => renderItemForList(item));


};

elements.scraperBtn.addEventListener('click', e => {
    e.preventDefault()
    scraperController();
});