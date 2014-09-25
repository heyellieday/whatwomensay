define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        ApplicationView   = require('app/views/Application'),
        HomeView    = require('app/views/Home'),


        $body = $('body'),
        applicationView = new ApplicationView({el: $("#application") }).render(),
        $content = $("#content", applicationView.el),
        homeView = new HomeView({el: $content});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "twitter-user/:user_id": "TwitterUserProfile"
        },

        home: function () {
        	require(["app/views/TwitterUsers", "app/models/TwitterUser"], function (TwitterUsersView, models) {
            	var twitterUsers = new models.TwitterUserCollection;
            	twitterUsers.fetch({
                    success: function (data) {
                        var view = new TwitterUsersView({collection: data, el: $content});
                        view.render();
                    }
                });
            });
        },

        TwitterUserProfile: function (user_id) {
            require(["app/views/TwitterUserProfile", "app/models/TwitterUser"], function (TwitterUserView, models) {
            	var twitterUsers = new models.TwitterUserCollection;
            	twitterUsers.fetch({
                    success: function (data) {
                    	var twitterUser = twitterUsers.findWhere({ screen_name: user_id });
                        var view = new TwitterUserView({model: twitterUser, el: $content});
                        view.render();
                        $("#checkLists").click(function(){
                        	view.twitterListsCheck(user_id);
                        });
                      
                    }
                });
            });
        }

    });

});