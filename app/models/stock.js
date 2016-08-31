define(['require', 'app/models/Base', 'app/models/stock_quantity'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/stock',

        relations: function () {
            return [
                {
                    key: 'stock:stock_quantity',
                    relatedModel: require('app/models/stock_quantity')
                }
           ];
        }
    });
});