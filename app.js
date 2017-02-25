var express = require('express');  	// this server use the libraly "express"
var cfenv = require('cfenv');      	// cfenv provides the way to accsess to the cloud foundary environment
var app = express();				// create a new express server
var appEnv = cfenv.getAppEnv();		// get the app environment from Cloud Foundry
var bodyParser = require('body-parser');	// POSTパラメータ取得用 body-parser設定 (express4から必要)

app.use(express.static(__dirname + '/public'));	// serve the files out of ./public as our main files
app.use(bodyParser.urlencoded({	extended : true}));
app.use(bodyParser.json());






app.post('/', function(req, res) {

	//--peerに対してjsonを投げる--//

	var request = require('request');
	var options = {
			url : "https://b23476f36d234c06aff5e3f1822e3c03-vp0.us.blockchain.ibm.com:5003/chaincode",
			headers : {
				"Content-type" : "application/json",
			},
			json : {
				"jsonrpc" : "2.0",
				"method" : "query",
				"params" : {
				"type" : 1,
				"chaincodeID" : {
					"name" : "59d5075e7146d8df37bdcb0c289c293c66ee2a56c0f8d833410ff7cd8d3dd6c65ff0c6966c1914109ed7e04423bc73967b7c693fbeb383bb1a057c75b37e2674"
				},
				"ctorMsg" : {
				"function" : "query",
				"args" : [ "a" ]
			},
			"secureContext" : "user_type1_0"
		},
		"id" : 0
			}
	};

	//--peerに対してjsonを投げる--//
	var data = function () {

        	return request.post(options, function(error, response, body) {

        	}).body;
        };

    console.log(data());


	request.post(options, function(error, response, body) {
		console.log("statusCode:"+JSON.stringify(response.statusCode)+"\n"+JSON.stringify(body));
	});

	res.send(data);
	console.log("クライアント宛データ"+data());

});


/*

//--peerに対してjsonを投げる--//

var request = require('request');
var options = {
	url : "https://b23476f36d234c06aff5e3f1822e3c03-vp0.us.blockchain.ibm.com:5003/chaincode",
	headers : {
		"Content-type" : "application/json",
	},
	json : {
		"jsonrpc" : "2.0",
		"method" : "query",
		"params" : {
			"type" : 1,
			"chaincodeID" : {
				"name" : "59d5075e7146d8df37bdcb0c289c293c66ee2a56c0f8d833410ff7cd8d3dd6c65ff0c6966c1914109ed7e04423bc73967b7c693fbeb383bb1a057c75b37e2674"
			},
			"ctorMsg" : {
				"function" : "query",
				"args" : [ "a" ]
			},
			"secureContext" : "user_type1_0"
		},
		"id" : 0
	}
};

//--peerに対してjsonを投げる--//

request.post(options, function(error, response, body) {
	console.log("statusCode:"+JSON.stringify(response.statusCode)+"\n"+JSON.stringify(body));
});

*/

app.listen(appEnv.port, '0.0.0.0', function() {
	console.log("server starting on " + appEnv.url);
});
