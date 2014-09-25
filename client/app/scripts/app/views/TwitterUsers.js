define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        TwitterUserTemplate = require('app/views/TwitterUserItem');

    return Backbone.View.extend({

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function (twitterUser) {
                this.$el.append(new TwitterUserTemplate({model:twitterUser}).render().el);
            }, this);
            return this;
        }
    });

});