define(['app/collections/Base', 'app/models/invoice'], function (Base, invoice) {
    'use strict';

    return Base.extend({
        url: 'http://localhost:32767/api/BusinessMan/invoice',
        rel: 'api:invoice',
        model: invoice
    });
});