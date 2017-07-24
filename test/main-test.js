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