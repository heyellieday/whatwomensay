define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        serverUrl   = require('app/serverUrl'),

    TwitterUserInList = Backbone.Model.extend({

        urlRoot: serverUrl + "/api/users/lookup",

        initialize: function () {
            
        }

    }),

    TwitterUserInListCollection = Backbone.Collection.extend({

        model: TwitterUserInList,

        initialize: function (models, options) {
            this.list_owner = "SproutHomework";
            this.list_id = options.list_id;
        },

        url: function() {
            return serverUrl + '/api/lists/' + this.list_id + '/members/owned/' + this.list_owner;
        },
        parse: function(response) {
            var twitterUsersInList= [];
            for(var user in response){
                    twitterUsersInList.push(response[user]);
            }
            return twitterUsersInList;
        }   

    });

    var originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        TwitterUserInList: TwitterUserInList,
        TwitterUserInListCollection: TwitterUserInListCollection
    };

});