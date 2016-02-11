define(['require', 'app/models/Base', 'app/models/sales_order_line_items', 'app/models/purchase_order', 'app/models/clients'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: 'http://localhost:32767/api/BusinessMan/sales_orders',

        relations: function () {
            return [
                {
                    key: 'sales_order:sales_order_line_items',
                    relatedModel: require('app/models/sales_order_line_items')
                },
                {
                    key: 'sales_order:purchase_order',
                    relatedModel: require('app/models/purchase_order')
                },
                {
                    key: 'sales_order:clients',
                    relatedModel: require('app/models/clients')
                }
            ];
        }
    });
});