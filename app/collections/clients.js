define(['app/collections/Base', 'app/models/clients'], function (Base, clients) {
    'use strict';

    return Base.extend({
        url: 'http://localhost:32767/api/BusinessMan/clients',
        rel: 'api:clients',
        model: clients
    });
});