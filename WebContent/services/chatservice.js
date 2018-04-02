/**
 * Chat Service
 */

app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});

	app.directive('ngFocus', function() {
	  return function(scope, element, attrs) {
	    element.bind('click', function() {
	      $('.' + attrs.ngFocus)[0].focus();
	    });
	  };
	});

	app.factory('socket', function($rootScope) {
	  alert('app factory')
	    var socket = new SockJS('/proj2middleware/chatmodule');
	    var stompClient = Stomp.over(socket);
	    stompClient.connect('', '', function(frame) {
	    	alert('in connect function in service')
	      $rootScope.$broadcast('sockConnected', frame);
	    });

	    return {
	      stompClient: stompClient
	    };
	});







/*
'use strict';

app.service('chatService', ['$http', '$q', function($http, $q,){



    var service = {}; 
    var listener = $q.defer();
    var socket = {
        client: null,
        stomp: null
    }; 

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "http://localhost:8083/proj2middleware/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";

    service.send = sendMessage;
    service.receive = receive; 
    
    function receive () {
        //The only thing this function does is returning the deferred used to send messages at.
        return listener.promise;
    };



    function sendMessage(message) { 
        //sends the message as a JSON object
        //generates id
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            message: message,
        }));
    }

     var reconnect = function () {
        //When the connection to the Websocket server is lost, it will call the reconnect() function which will attempt to initialize the connection again after 30 seconds.
        $timeout(function () {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };



    var getMessage = function (data) {
        //will translate the Websocket data body to the model required by the controller.
        var message = JSON.parse(data);
        var out = {};
        out.message = message.message;
        out.time = new Date(message.time);
        return out;
    };

    var startListener = function () {
        //will listen to the /topic/message topic on which all messages will be received
        socket.stomp.subscribe(service.CHAT_TOPIC, function (data) {
            listener.notify(getMessage(data.body));
            //will then send the data to the deferred which will be used by the controllers
        });
    };

    var initialize = function() {
        //this is done for setting up the service.
        socket.client = new SockJS(service.SOCKET_URL);
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, startListener);
        socket.stomp.onclose = reconnect;
        //will set up the SockJS Websocket client and use it for the Stomp.js websocket client.

    }

    initialize();
        
    return service;   

}])















*//**
 * 
 *//*
app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});

	app.directive('ngFocus', function() {
	  return function(scope, element, attrs) {
	    element.bind('click', function() {
	      $('.' + attrs.ngFocus)[0].focus();
	    });
	  };
	});
app.factory('ChatService',function($rootScope){
	var socket=new SockJS("/proj2middleware/chatmodule")
	var stompClient=Stomp.over(socket);
	console.log(stompClient)
	//When browser connects with websocket successfully
	//broadcast that event to the event Id 'sockConnected'
	stompClient.connect('','',function(frame){
		alert('in connect function in service')
		$rootScope.$broadcast('sockConnected',frame)
		
	})
	return{
		stompClient:stompClient
	}
})





































//This filter is used to display chat messages in reverse order ie from last index to 0 , latest message first
app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});

	app.directive('ngFocus', function() {
	  return function(scope, element, attrs) {
	    element.bind('click', function() {
	      $('.' + attrs.ngFocus)[0].focus();
	    });
	  };
	});

	app.factory('ChatService', function($rootScope) {
	  alert('app factory')
	    var socket = new SockJS('/proj2middleware/chatmodule');
	    var stompClient = Stomp.over(socket);
	    stompClient.connect('', '', function(frame) {
	      $rootScope.$broadcast('sockConnected', frame);
	    });

	    return {
	      stompClient: stompClient
	    };
	});*/