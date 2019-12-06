import {url} from "../config";

export default class Scraper {
    constructor(url){
        this.url = url;
    }

    async scrapeData() {
        try {
            await fetch(this.url).then(async (response) => {
                this.html = response.text();
            });
        } catch (e) {
            alert(e)
        }
    }
}