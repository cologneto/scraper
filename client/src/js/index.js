import Scraper from './models/Scraper'
import ItemList from './models/ItemList'
import { renderItemForList } from './views/itemListView'
import { url } from './config'

import elements from './views/base'
import Item from "./models/Item";
import {renderItemModal} from "./views/itemView";
import { helper } from "./models/base";

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
            await itemController(id, true);

        } else if(targetClList.contains('btn-del')) {
            id = e.target.parentNode.getAttribute('data-biid')
            await itemController(id, false)

        } else if(targetClList.contains('btn-update')){
            try{
                const modelVal = document.querySelector('.mval').value;
                const prodCodeVal = document.querySelector('.pcval').value;
                state.item.model = modelVal;
                state.item.prodCode = prodCodeVal;
                await state.item.updateItem();

                location.reload();
            }catch (e) {
                alert(e)
                console.error("Error from update");
            }
        } else if(targetClList.contains('btn-cancel')){
            document.querySelector('.item-modal-container').remove();
        }
    }
});

const itemController = async (id, isEdit) => {
    state.item = new Item();
    state.item.id = id;
    try {
        await state.item.getItem()
    } catch (e) {
        alert(e)
        console.error('Error From item controller')
    }

    if(isEdit) {
        renderItemModal(state.item);
    } else {
        await state.item.deleteItem();
        location.reload();
    }

}

const scraperController = async () => {
    state.scraper = new Scraper(url);

    try{
        await state.scraper.scrapeData();
        // data to html doc
        const html = helper.convertTextToHTML(state.scraper.data);
        // data to array of json
        state.scraper.items = helper.convertHTMLtoArrayOfObjects(html);

        await state.scraper.postDataToServer()
    } catch(err) {
        alert('Something went wrong with scraping')
    }

};

const itemListController = async () => {

    try {
        state.itemList = new ItemList();

        await state.itemList.getAllItems();

        state.itemList.items.forEach((item) => renderItemForList(item));
    } catch(err) {
        alert("Something went wrong with retrieving items list")
    }

    return state.itemList.items.length > 0
}

elements.scraperBtn.addEventListener('click', async e => {
    e.preventDefault()
    await scraperController();
    window.location.reload();
});