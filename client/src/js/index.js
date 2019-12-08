import Scraper from './models/Scraper'
import ItemList from './models/ItemList'
import { renderItemForList } from './views/itemListView'
import { url } from './config'

import elements from './views/base'
import Item from "./models/Item";

const state = {};

document.addEventListener('DOMContentLoaded', async () => {
    const isItemsInDB = await itemListController()
    // TODO: Remove following rows and replace them with render function
    // TODO: for the button
    if(isItemsInDB) elements.scraperBtn.disabled = true

});

document.addEventListener('click', async (e) => {
    const target = e.target;
    let id;
    if(target.tagName === "BUTTON"){
        if(target.classList.contains('btn-edit')) {
            console.log("EDIT")
            id = target.parentNode.getAttribute('data-biid');

        } else if(target.classList.contains('btn-del')){
            console.log("DELETE");
            id =  target.parentNode.getAttribute('data-biid');
        }

        await itemController(id)
    }

});

const itemController = async (id) => {
    state.item = new Item();

    state.item.id = id;

    await state.item.getItem();

    console.log(state.item);
}

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