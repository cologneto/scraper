import Scraper from "./models/Scraper";
import ItemList from "./models/ItemList";
import {
  renderItemForList,
  deleteItemFromListView,
  updateItemFromListView
} from "./views/itemListView";
import { url } from "./config";
import elements from "./views/base";
import Item from "./models/Item";
import { renderItemModal, deleteItemModalFromDOM } from "./views/itemView";
import { helper } from "./models/base";

const state = {};

const scraperController = async () => {
  state.scraper = new Scraper(url);

  try {
    await state.scraper.scrapeData();
    const html = helper.convertTextToHTML(state.scraper.data);
    state.scraper.items = helper.convertHTMLtoArrayOfObjects(html);
    await state.scraper.postDataToServer();
  } catch (err) {
    alert("Something went wrong with scraping");
  }
};

const itemController = async (id, isEdit) => {
  state.item = new Item();
  state.item.id = id;
  try {
    await state.item.getItem();
  } catch (e) {
    alert("Error From item controller");
  }

  if (isEdit) {
    renderItemModal(state.item);
  } else {
    try {
      deleteItemFromListView(state.item.id);
      state.itemList.updateList(state.item);
      await state.itemList.deleteItem(state.item);

      if (state.itemList.items.length === 0) {
        location.reload();
      }
    } catch (err) {
      console.log(err);
      alert("Cannot delete item");
    }
  }
};

const itemListController = async () => {
  try {
    state.itemList = new ItemList();
    await state.itemList.getAllItems();
    state.itemList.items.forEach(item => renderItemForList(item));
  } catch (err) {
    alert("Something went wrong with retrieving items list");
  }

  return state.itemList.items.length > 0;
};

elements.scraperBtn.addEventListener("click", async e => {
  e.preventDefault();
  await scraperController();
  location.reload();
});

document.addEventListener("DOMContentLoaded", async () => {
  const isItemsInDB = await itemListController();
  if (isItemsInDB) elements.scraperBtn.disabled = true;
});

document.addEventListener("click", async e => {
  const targetTagName = e.target.tagName;
  const targetClList = e.target.classList;
  let id = "";

  if (targetTagName === "BUTTON") {
    if (targetClList.contains("btn-edit")) {
      id = e.target.parentNode.getAttribute("data-biid");
      await itemController(id, true);
    } else if (targetClList.contains("btn-del")) {
      id = e.target.parentNode.getAttribute("data-biid");
      await itemController(id, false);
    } else if (targetClList.contains("btn-update")) {
      try {
        const modelVal = document.querySelector(".mval").value;
        const prodCodeVal = document.querySelector(".pcval").value;

        state.item.model = modelVal;
        state.item.prodCode = prodCodeVal;

        await state.item.updateItem();
        updateItemFromListView(state.item.id, state.item);
        deleteItemModalFromDOM();
      } catch (e) {
        alert("Cannot update item.");
      }
    } else if (targetClList.contains("btn-cancel")) {
      document.querySelector(".item-modal-container").remove();
    }
  }
});
