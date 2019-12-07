export default class ItemList {
    constructor(){
        this.items = [];
    }

    async getAllItems() {
        function json2array(json){
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function(key){
                result.push(json[key]);
            });
            return result;
        }

        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
        this.items = json2array(data);
    }
}