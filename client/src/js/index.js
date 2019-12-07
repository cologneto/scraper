import Scraper from './models/Scraper'
import ItemList from './models/ItemList'
import { renderItemForList } from './views/itemListView'
import { url } from './config'

import elements from './views/base'

const state = {};

document.addEventListener('DOMContentLoaded', async () => {
    const isItemsInDB = await itemListController()
    // TODO: Remove following rows and replace them with render function
    // TODO: for the button
    if(isItemsInDB) elements.scraperBtn.disabled = true

})

document.addEventListener('click', (e) => {
    console.log(e.target.classList);
})

const scraperController = async () => {
    state.scraper = new Scraper(url);

    await state.scraper.scrapeData();

    const html = state.scraper.convertTextToHTML();
    state.scraper.convertHTMLtoJSON(html);

    await state.scraper.postDataToServer()
};

const itemListController = async () => {
    state.itemList = new ItemList();

    await state.itemList.getAllItems();

    state.itemList.items.forEach((item) => renderItemForList(item));

    return state.itemList.items.length > 0
}

elements.scraperBtn.addEventListener('click', async e => {
    e.preventDefault()
    await scraperController();
    window.location.reload();
});