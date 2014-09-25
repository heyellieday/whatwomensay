define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        TwitterUsersView    = require('app/views/TwitterUsers'),
        SproutUserView      = require('app/views/SproutUserInNav'),
        TwitterUserModel    = require('app/models/TwitterUser'),
        Handelbars          = require('hbs!partials/application'),
        SproutUserModel     = require('app/models/SproutUser'),
        sproutUser;

    return Backbone.View.extend({

        initialize: function () {
            this.TwitterUsers = new TwitterUserModel.TwitterUserCollection();
        },

        render: function () {
            var sproutUser = new SproutUserModel.SproutUser();
            sproutUser.fetch({
                success: function (data) {
                    var sproutUserView = new SproutUserView({model: sproutUser, el: $("#sprout-user")});
                    sproutUserView.render();
                }
            });
            this.$el.empty();
            this.$el.html(Handelbars());
            var usersView = new TwitterUsersView({collection: this.TwitterUsers, el: $(".users", this.el)});
            usersView.render();
            return this;
        },

        events: {
            
        },

    });

});