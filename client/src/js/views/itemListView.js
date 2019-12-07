import elements from './base';

export const renderItemForList = item => {
    const markup = `
        <div class="item-container" data-itemid="${item.id}">
            <div class="image-container">
                <img src="${item.imageURL}" alt="${item.model}">
            </div>
            <div class="model-container">${item.model}</div>
            <div class="prod-code-container">${item.prodCode}</div>
            <div data-biid="${item.id}">
                <button class="btn-edit">Edit</button>
                <button class="btn-del">Delete</button>
            </div>
        </div>
    `
    elements.itemsContainer.insertAdjacentHTML('beforeend', markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};