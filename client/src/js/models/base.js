import Item from "./Item";

const elContainerTagAttr = "[data-price]";
const imageTag = "img";
const textContainerClass = ".prod-caption";
const prodCodeTag = "p";
const modelTag = "a";

export const helper = {
  json2array(json) {
    let result = [];
    const keys = Object.keys(json);
    keys.forEach(function(key) {
      result.push(json[key]);
    });
    return result;
  },

  convertTextToHTML(txt) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(txt, "text/html");

    return doc;
  },

  convertHTMLtoArrayOfObjects(html) {
    const mainContainers = html.querySelectorAll(elContainerTagAttr);
    let arr = [];
    mainContainers.forEach(e => {
      const textContainer = e.querySelector(textContainerClass);
      const item = new Item();

      (item.imageURL = e.querySelector(imageTag).src),
        (item.model = textContainer.querySelector(modelTag).innerHTML.trim()),
        (item.prodCode = textContainer.querySelector(prodCodeTag).innerHTML);

      arr[arr.length] = item;
    });

    return arr;
  }
};
