import { helper } from './base'
import {serverURL} from "../config";

export default class ItemList {
    constructor(){
        this.items = [];
    }

    async getAllItems() {
        try {
            const response = await fetch(`${serverURL}items`);
            const data = await response.json();
            this.items = helper.json2array(data);
        } catch (e) {
            alert(e);
        }

    }
}