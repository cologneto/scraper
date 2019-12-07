import elements from './base';

export const renderItemForList = item => {
    const markup = `
        <div class="item-container" data-itemid="${item.id}">
            <div class="image-container">
                <img src="${item.imageURL}" alt="${item.model}">
            </div>
            <div class="model-container">${item.model}</div>
            <div class="prod-code-container">${item.prodCode}</div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `
    elements.itemsContainer.insertAdjacentHTML('beforeend', markup);
}

