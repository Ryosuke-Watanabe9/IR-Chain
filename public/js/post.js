/*eslint-env node */
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

request.post(options, function(error, response, body) {
});

/*
var obj = {
	"jsonrpc" : "2.0",
	"method" : "query",
	"params" : {
		"type" : 1,
		"chaincodeID" : {
			"name" : "59d5075e7146d8df37bdcb0c289c293c66ee2a56c0f8d833410ff7cd8d3dd6c65ff0c6966c1914109ed7e04423bc73967b7c693fbeb383bb1a057c75b37e2674"
		},
		"ctorMsg" : {
			"function" : "a",
			"args" : [ "string" ]
		},
		"secureContext" : "user_type1_0"
	},
	"id" : 0
};

var options = {
	url : "https://b23476f36d234c06aff5e3f1822e3c03-vp0.us.blockchain.ibm.com:5003",
	headers : {
		"Content-Type" : "application/json"
	},
	json : true,
	body : JSON.stringify(obj)
};

request.post(options, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body.name);
	} else {
		console.log("error: " + response.statusCode);
	}
});
/*
 * { "jsonrpc": "2.0", "method": "query", "params": { "type": 1, "chaincodeID": {
 * "name": "string" }, "ctorMsg": { "function": "string", "args": [ "string" ] },
 * "secureContext": "string" }, "id": 0 }
 */