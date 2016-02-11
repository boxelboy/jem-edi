define(['require', 'app/models/Base', 'app/models/sales_order'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: 'http://localhost:32767/api/BusinessMan/sale_orders_line_items',

        relations: function () {
            return [
                {
                    key: 'sales_order_line_items:sales_order',
                    relatedModel: require('app/models/sales_order')
                },
            ];
        }
    });
});