define(function (require) {
    'use strict';

    var Backbone = require('backbone'),
        self,
        today;

    return Backbone.Router.extend({
        initialize: function (options) {
            self = this;
            self.app = options.app;

        },

        routes: {
            'edi/:num/:id' : 'default'
        },

        default: function (num, id) {
            require(['../app/views/index'], function (Content) {
                self.app.setXML(new Content({ app: self.app, type: num, po: id }));
            });
        }

    });
});