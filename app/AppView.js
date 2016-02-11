define(function (require) {

    var Backbone = require('backbone');
    return Backbone.View.extend({
        el: 'body',
        template: require('text!templates/main.html'),

        initialize: function () {
            this.render();
        },

        setRouter: function (router) {
            this.router = router;
        },

        setView: function (view, url) {
            this.$('.container').empty().append(view.$el);
            if (url && this.router) {
                this.router.navigate(url);
            }
        },

        setXML: function (view) {
            this.$('.container').append(view);
        },
        
        render: function () {
            this.$el.append(this.template);
            return this;
        }
    });
});
