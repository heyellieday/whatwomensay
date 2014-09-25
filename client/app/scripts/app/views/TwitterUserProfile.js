define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Handlebars          = require('hbs!partials/TwitterUserProfile');

    return Backbone.View.extend({

        render: function () {
            this.$el.html(Handlebars(this.model.attributes));
            return this;
        },
        twitterListsCheck: function (user_id) {
            require(["app/views/TwitterLists", "app/models/TwitterList"], function (TwitterListsView, models ) {
                $( "#lists" ).toggleClass("hidden");
                $( "#lists-header" ).toggleClass("hidden");
                if (!$( "#lists" ).hasClass( "hidden" )){
                    var twitterLists = new models.TwitterListCollection;
                    twitterLists.fetch({
                        success: function (data) {
                            var listView = new TwitterListsView({collection: twitterLists, el: $("#lists")});
                            listView.render(user_id);
                        }
                    }); 
                }
            });
        }
    });

});