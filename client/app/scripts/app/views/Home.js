define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Handlebars          = require('hbs!partials/Home');

    return Backbone.View.extend({

        render: function () {
            this.$el.html(Handlebars());
            return this;
        }

    });

});