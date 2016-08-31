define(['require', 'app/models/Base', 'app/models/purchase_order_line_items', 'app/models/clients', 'app/models/sales_order', 'app/models/trading_companies'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/purchase_orders',

        relations: function () {
            return [
                {
                    key: 'purchase_orders:purchase_order_line_items',
                    relatedModel: require('app/models/purchase_order_line_items')
                },
                {
                    key: 'purchase_orders:client',
                    relatedModel: require('app/models/clients')
                },
                {
                    key: 'purchase_orders:sales_order',
                    relatedModel: require('app/models/sales_order')
                },
                {
                    key: 'purchase_orders:trading_company',
                    relatedModel: require('app/models/trading_companies')
                }
            ];
        }
    });
});