'use strict';
let printReceipt=(inputs)=>{
    let itemCounts=buildItems(inputs);
    let itemTotals = buildItemTotals(itemCounts);
    let total = buildTotal(itemTotals);
    let string = printReceiptTxt(total);
    console.log(string);
};

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

let buildTotal = (itemTotals)=> {
    let total = 0;
    let discount = 0;
    for (let itemStatus of itemTotals) {
        total += itemStatus.subtotal;
        discount += itemStatus.itemDiscount;
    }
    return {list: itemTotals, total: total, discount: discount};
};

let printReceiptTxt = (total)=> {
    let dateDigitToString;
    dateDigitToString = num => num < 10 ? `0${num}` : num;
    let currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
    let string = '***<没钱赚商店>收据***';
    string+='\n打印时间：'+formattedDateString+'\n----------------------';
    for (let object of total.list) {
        string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
    }
    string += '\n' + '----------------------' + '\n' + '总计：' + total.total.toFixed(2) + '(元)' + '\n' + '节省：' + total.discount.toFixed(2) + '(元)' + '\n' + '**********************';
    return string;
};

