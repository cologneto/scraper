import { serverURL } from "../config";

export default class Scraper {
    constructor(url){
        this.url = url;
        this.items = [];
    }

    async scrapeData() {
        const response = await fetch(this.url)
        this.data = await response.text();
    }

    async postDataToServer(){
        await fetch(`${serverURL}save-items`, {
            method: 'post',
            body: JSON.stringify(this.items),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}