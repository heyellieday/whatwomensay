define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        TwitterListView     = require('app/views/TwitterList'),
        serverUrl   = require('app/serverUrl');

    return Backbone.View.extend({

        render: function (user_id) {
            this.$el.empty();
            var el = this.el;
            var $el = this.$el;
            console.log(user_id);
            _.each(this.collection.models, function (twitterList) {
                $.ajax({
                    type: 'GET',
                    url: serverUrl + "/api/is/user/" + user_id + "/in/list/"+ twitterList.attributes.id_str,
                    dataType: 'jsonp',
                    success: function(data){
                        $el.append(new TwitterListView({model: twitterList}).render(data).el);
                        $("#"+twitterList.attributes.id_str).click(function(){
                            console.log("saw click");
                            if ($("#"+twitterList.attributes.id_str).hasClass("true")){
                                $("#"+twitterList.attributes.id_str).removeClass("true");
                                $.ajax({
                                    type: 'GET',
                                    url: serverUrl + "/api/twitter/remove/user/" + user_id + "/in/list/"+ twitterList.attributes.id_str,
                                    dataType: 'jsonp',
                                    success: function(data){
                                    }
                                }); 
                            }else {
                                $("#"+twitterList.attributes.id_str).addClass("true");
                                $.ajax({
                                    type: 'GET',
                                    url: serverUrl + "/api/twitter/add/user/" + user_id + "/in/list/"+ twitterList.attributes.id_str,
                                    dataType: 'jsonp',
                                    success: function(data){
                                    }
                                }); 
                            }  
                        }); 
                    }
                }); 
            }, this);
            return this;
        }
    });

});