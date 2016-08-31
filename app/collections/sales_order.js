define(['app/collections/Base', 'app/models/sales_order'], function (Base, sales_order) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/sales_order',
        rel: 'api:sales_order',
        model: sales_order
    });
});