define(['app/collections/Base', 'app/models/invoice_line_items'], function (Base, invoice_line_items) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/invoice_line_items',
        rel: 'api:invoice_line_items',
        model: invoice_line_items
    });
});