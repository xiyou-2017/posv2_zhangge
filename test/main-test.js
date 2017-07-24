'use strict';

describe('buildItems', ()=> {
    let inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
    it('should return right itemCounts', ()=> {
        const itemCounts = [
            {
                item: new Item('ITEM000001', '雪碧', '瓶', 3.00),
                count: 5
            },
            {
                item: new Item('ITEM000003', '荔枝', '斤', 15.00),
                count: 2
            },
            {
                item: new Item('ITEM000005', '方便面', '袋', 4.50),
                count: 3
            }
        ];
        expect(buildItems(inputs)).toEqual(itemCounts);
    })
});
describe('buildItemTotals', ()=> {
    let itemCounts = [
        {
            item: new Item('ITEM000001', '雪碧', '瓶', 3.00),
            count: 5
        },
        {
            item: new Item('ITEM000003', '荔枝', '斤', 15.00),
            count: 2
        },
        {
            item: new Item('ITEM000005', '方便面', '袋', 4.50),
            count: 3
        }
    ];
    it('should return right itemTotals', ()=> {
        const itemTotals = [{
            cartItem: {
                item: new Item('ITEM000001', '雪碧', '瓶', 3.00),
                count: 5
            },
            subtotal: 12.00,
            itemDiscount: 3.00
        },
            {
                cartItem: {
                    item: new Item('ITEM000003', '荔枝', '斤', 15.00),
                    count: 2
                },
                subtotal: 30.00,
                itemDiscount: 0.00
            },
            {
                cartItem: {
                    item: new Item('ITEM000005', '方便面', '袋', 4.50),
                    count: 3
                },
                subtotal: 9.00,
                itemDiscount: 4.50
            }
        ];
        expect(buildItemTotals(itemCounts)).toEqual(itemTotals);
    })
});