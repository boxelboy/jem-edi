define(['app/collections/Base', 'app/models/branches'], function (Base, branches) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/branches',
        rel: 'api:branches',
        model: branches
    });
});