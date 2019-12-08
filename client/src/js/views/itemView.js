import { elements } from './base';

export const renderItemModal = (item) => {
    const markup = `
        <div class="item-modal-container">
            <div class="item-modal">
                <div class="img-container">
                    <img src="${item.imageURL}" alt="${item.model}">
                </div>
                <div class="model-container">
                    <input type="text" class="mval" value="${item.model}">             
                </div>
                <div class="prodCode-container">
                    <input type="text" class="pcval" value="${item.prodCode}">             
                </div>
                <div class="btn-container">
                    <button class="btn-update">Update</button>
                    <button class="btn-cancel">Cancel</button>
                </div>      
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
};

