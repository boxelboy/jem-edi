define(['require', 'app/models/Base'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: '/api/BusinessMan/invoice_line_items',

        relations: function () {
            return [];
        }
    });
});