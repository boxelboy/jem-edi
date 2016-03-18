define(['require', 'app/models/Base', 'app/models/invoice_line_items'], function (require, Base) {
    'use strict';
    return Base.extend({
        urlRoot: 'http://localhost:32767/api/BusinessMan/invoice',

        relations: function () {
            return [
                {
                    key: 'invoice:invoice_line_items',
                    relatedModel: require('app/models/invoice_line_items')
                }
            ];
        }
    });
});