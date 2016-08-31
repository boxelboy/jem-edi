define(['app/collections/Base', 'app/models/clients'], function (Base, clients) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/clients',
        rel: 'api:clients',
        model: clients
    });
});