import {serverURL} from "../config";

export default class Item {
    constructor(id, imageURL, model, prodCode) {
        this.id = id
        this.imageURL = imageURL
        this.model = model
        this.prodCode = prodCode
    }

    async getItem() {
        try {
            const response = await fetch(`${serverURL}item/${this.id}`)
            const data = await response.json();
            this.model = data.model;
            this.imageURL = data.imageURL;
            this.prodCode = data.prodCode;
        } catch (e) {
            alert(e);
        }
    }

    async updateItem() {
        try {
            const response = await fetch(`${serverURL}item/${this.id}`, {
                method: 'put',
                body: JSON.stringify(this),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.text()
            console.log(data)
        } catch(e) {
            alert(e)
        }

    }

    async deleteItem() {
        try {
            const response = await fetch(`${serverURL}item/${this.id}`, {
                method: 'delete',
                body: JSON.stringify(this),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            alert(response.text())
        } catch(e) {
            alert(e)
        }
    }
}