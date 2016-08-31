define(['app/collections/Base', 'app/models/purchase_order_line_items'], function (Base, purchase_order_line_items) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/purchase_order_line_items',
        rel: 'api:purchase_order_line_items',
        model: purchase_order_line_items
    });
});