define(['require', 'app/models/Base', 'app/models/sales_order', 'app/models/stock'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/sales_order_line_items',

        relations: function () {
            return [
               {
                    key: 'sales_order_line_items:stock',
                    relatedModel: require('app/models/stock')
                }
            ];
        }
    });
});