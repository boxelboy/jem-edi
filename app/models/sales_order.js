define(['require', 'app/models/Base', 'app/models/sales_order_line_items', 'app/models/purchase_order', 'app/models/clients', 'app/models/invoice', 'app/models/branches'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/sales_order',

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
                },
                {
                    key: 'sales_order:invoice',
                    relatedModel: require('app/models/invoice')
                },
                {
                    key: 'sales_order:branch',
                    relatedModel: require('app/models/branches')
                }
            ];
        }
    });
});