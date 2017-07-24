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

let buildItemTotals = (itemCount)=> {
    return itemCount.map(cartItem=> {
        let promotionType = getPromotionType(cartItem);
        let {subtotal, itemDiscount} = discount(promotionType, cartItem);
        return {cartItem, subtotal, itemDiscount};
    })
};

let getPromotionType = (cartItem)=> {
    let promotions = Promotion.all();
    let promotion = promotions.find((promotion)=>promotion.barcodes.includes(cartItem.item.barcode));
    return promotion ? promotion.type : ' ';
};

let discount = (promotionType, cartItem)=> {
    let freeItemCount = 0;
    if (promotionType === "BUY_TWO_GET_ONE_FREE") {
        freeItemCount = parseInt(cartItem.count / 3);
    }
    let itemDiscount = cartItem.item.price * freeItemCount;
    let subtotal = cartItem.item.price * (cartItem.count - freeItemCount);
    return {subtotal, itemDiscount};
};

