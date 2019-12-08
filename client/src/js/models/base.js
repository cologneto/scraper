export default {
    elContainerTagAttr: '[data-price]',
    imageTag: 'img',
    textContainerClass: '.prod-caption',
    prodCodeTag: 'p',
    modelTag: 'a'
}

export const helper = {
    json2array(json){
        let result = [];
        const keys = Object.keys(json);
        keys.forEach(function(key){
            result.push(json[key]);
        });
        return result;
    }
}
