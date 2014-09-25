define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        serverUrl   = require('app/serverUrl')

    var TwitterList = Backbone.Model.extend({

        urlRoot: serverUrl + "/api/lists",

        initialize: function () {
            
        }

    }),

    TwitterListCollection = Backbone.Collection.extend({

        model: TwitterList,

        url: function() {
            return serverUrl + '/api/lists';
        },
        parse: function(response) {
            var twitterLists= [];
            for(var list in response){
                    twitterLists.push(response[list]);
            }
            return twitterLists;
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
        TwitterList: TwitterList,
        TwitterListCollection: TwitterListCollection
    };

});