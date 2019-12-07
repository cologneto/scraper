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
                model: textContainer.querySelector(tagsClassesAttr.modelTag).innerHTML.trim(),
                prodCode:textContainer.querySelector(tagsClassesAttr.prodCodeTag).innerHTML
            }

            arr[arr.length] = obj;
        })

        this.items = arr;
        // this.postDataToServer();
    }
    postDataToServer(){
        fetch('http://localhost:3001/save-items', {
            method: 'post',
            body: JSON.stringify(this.items),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function(response) {
        })
    }

}


// scrapeData().then((html) => {
//     var parser = new DOMParser();
//     var doc = parser.parseFromString(html, 'text/html');
//     console.log(doc)
// });