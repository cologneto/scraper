import elements from './base';

export const renderItemForList = item => {
    const markup = `
        <div class="item-container" data-itemid="${item._id}">
            <div class="image-container">
                <img src="${item.imageURL}" alt="${item.model}">
            </div>
            <div class="model-container">${item.model}</div>
            <div class="prod-code-container">${item.prodCode}</div>
            <div data-biid="${item._id}">
                <button name="edit" class="btn-edit">Edit</button>
                <button class="btn-del">Delete</button>
            </div>
        </div>
    `
    elements.itemsContainer.insertAdjacentHTML('beforeend', markup);
}

export const deleteItemFromListView = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

export const updateItemFromListView = (id, item) => {
    const itemCon = document.querySelector(`[data-itemid="${id}"]`);
    itemCon.querySelector('.model-container').innerHTML = item.model;
    itemCon.querySelector('.prod-code-container').innerHTML = item.prodCode;
};