define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Handlebars          = require('hbs!partials/TwitterList');

    return Backbone.View.extend({

        tagName: "div",

        initialize: function () {
            this.model.on("change", this.render, this);
        },

        render: function (isUserInList) {
            this.model.attributes["isUserInList"] = isUserInList;
            console.log(isUserInList);
            this.$el.html(Handlebars(this.model.attributes));
            return this;
        }
        
    });

});