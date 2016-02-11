define(['require', 'app/models/Base', 'app/models/sales_order_line_items', 'app/models/stock'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: 'http://localhost:32767/api/BusinessMan/purchase_order_line_items',

        relations: function () {
            return [
                 {
                    key: 'purchase_order_line_items:sales_order_line_items',
                    relatedModel: require('app/models/sales_order_line_items')
                },               {
                    key: 'purchase_order_line_items:stock',
                    relatedModel: require('app/models/stock')
                }
            ];
        }
    });
});