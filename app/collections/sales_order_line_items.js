define(['app/collections/Base', 'app/models/sales_order_line_items'], function (Base, sales_order_line_items) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/sales_order_line_items',
        rel: 'api:sales_order_line_items',
        model: sales_order_line_items
    });
});