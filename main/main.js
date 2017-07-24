'use strict';
let buildItems = (inputs)=> {
    let itemCounts = [];
    let allItems = Item.all();
    for (let input of inputs) {
        let splitInput = input.split('-');
        let barcode = splitInput[0];
        let count = parseFloat(splitInput[1] || 1);
        let cartItem = itemCounts.find(cartItem=>cartItem.item.barcode === barcode);
        if (cartItem) {
            cartItem.count += count;
        }
        else {
            let item = allItems.find(item=>item.barcode === barcode);
            itemCounts.push({item, count: count});
        }
    }
    return itemCounts;
};


