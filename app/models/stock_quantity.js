define(['require', 'app/models/Base'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/stock_quantity',

        relations: function () {
            return [];
        }
    });
});