import tagsClassesAttr from './base'

export default class Scraper {
    constructor(url){
        this.url = url;
    }

    async scrapeData() {
        try {
            const response = await fetch(this.url)
            this.html = await response.text();
        } catch (e) {
            alert(e)
        }
    }

    convertTextToHTML() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.html, 'text/html');

        return doc
    }

    convertHTMLtoJSON(html){
        const mainContainers = html.querySelectorAll(tagsClassesAttr.elContainerTagAttr);
        let arr = []
        mainContainers.forEach((e) => {
            const textContainer = e.querySelector(tagsClassesAttr.textContainerClass)
            const obj = {
                imageURL: e.querySelector(tagsClassesAttr.imageTag).src,
                model: textContainer.querySelector(tagsClassesAttr.modelTag),
                prodCode:textContainer.querySelector(tagsClassesAttr.prodCodeTag)
            }

            arr[arr.length] = obj;
        })

       return arr;
    }
}


// scrapeData().then((html) => {
//     var parser = new DOMParser();
//     var doc = parser.parseFromString(html, 'text/html');
//     console.log(doc)
// });