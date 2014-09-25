define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Handlebars          = require('hbs!partials/SproutUserInNav');

    return Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.model.on("change", this.render, this);
        },

        render: function () {
            if (this.model.attributes.id != "") { $( "#login" ).addClass("hidden"); }
            this.$el.html(Handlebars(this.model.attributes));
            return this;
        }
        
    });

});