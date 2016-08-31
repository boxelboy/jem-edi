define(['app/collections/Base', 'app/models/trading_companies'], function (Base, clients, trading_companies) {
    'use strict';

    return Base.extend({
        url: '/api/BusinessMan/trading_companies',
        rel: 'api:trading_companies',
        model: trading_companies
    });
});