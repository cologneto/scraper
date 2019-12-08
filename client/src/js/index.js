import Scraper from './models/Scraper'
import ItemList from './models/ItemList'
import { renderItemForList } from './views/itemListView'
import { url } from './config'

import elements from './views/base'
import Item from "./models/Item";
import {renderItemModal} from "./views/itemView";

const state = {};

document.addEventListener('DOMContentLoaded', async () => {
    const isItemsInDB = await itemListController()
    // TODO: Remove following rows and replace them with render function
    // TODO: for the button
    if(isItemsInDB) elements.scraperBtn.disabled = true

});

document.addEventListener('click', async (e) => {
    const targetTagName = e.target.tagName;
    const targetClList = e.target.classList;
    let id = ""

    if(targetTagName === "BUTTON") {
        if(targetClList.contains('btn-edit')) {
            id = e.target.parentNode.getAttribute('data-biid')
            await itemController(id, true)
            console.log("EDIT ITEM")
        } else if(targetClList.contains('btn-del')) {
            id = e.target.parentNode.getAttribute('data-biid')
            await itemController(id, false)
            console.log("DELETE ITEM")
        }
    }
});

const itemController = async (id, isEdit) => {
    state.item = new Item();
    state.item.id = id;

    await state.item.getItem()

    const close = () => {
        console.log('close');
    }

    const update = () => {
        console.log('update');
    }

    if(isEdit) {
        renderItemModal(state.item, close, update);
    }

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