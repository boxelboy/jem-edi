define(['app/collections/Base', 'app/models/purchase_order'], function (Base, purchase_order) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/purchase_orders',
        rel: 'api:purchase_orders',
        model: purchase_order
    });
});