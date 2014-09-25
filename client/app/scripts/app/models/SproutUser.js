define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        serverUrl   = require('app/serverUrl'),

        SproutUser = Backbone.Model.extend({

        url: serverUrl + "/api/sprout-user",

        initialize: function () {
            
        }

    }),

    originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        SproutUser: SproutUser
    };

});