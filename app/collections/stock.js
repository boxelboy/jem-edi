define(['app/collections/Base', 'app/models/stock'], function (Base, stock) {
    'use strict';

    return Base.extend({
        url: 'http://localhost:32767/api/BusinessMan/stock',
        rel: 'api:stock',
        model: stock
    });
});