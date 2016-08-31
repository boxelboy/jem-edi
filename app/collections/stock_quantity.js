define(['app/collections/Base', 'app/models/stock_quantity'], function (Base, stock_quantity) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/stock_quantity',
        rel: 'api:stock_quantity',
        model: stock_quantity
    });
});