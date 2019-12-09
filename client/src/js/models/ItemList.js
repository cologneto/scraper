import { helper } from './base'
import {serverURL} from "../config";

export default class ItemList {
    constructor(){
        this.items = [];
    }

    async getAllItems() {
        const response = await fetch(`${serverURL}items`);
        const data = await response.json();
        this.items = helper.json2array(data);
    }

    deleteItem(id) {
        this.items.splice(this.items.findIndex(i => i.id === id ), 1);
    }
}