// ui_table.js ブラウザUI用 JavaScript (index.htmlより呼ばれる)

/*eslint-env jquery, browser*/
$(function() {
	$("#add").click(function(e) {
		e.preventDefault(); // エラー

		var param = {};
		param.item1 = $("#item1").val() || ""; // 入力された文字の取得

		$.ajax({
			type : 'POST',
			data : JSON.stringify(param),
			contentType : 'application/json',
			url : '/',
			success : function(data) {
				console.log('add success: ' + JSON.stringify(data));
				showTable(data);
			},
			error : function(data) {
				console.log('error ' + JSON.stringify(data));
			}
		});

		// 入力項目名を空白に
		$("#item1").val('');
	}); // #add

	// サーバから取得したデータを、htmlテーブルに追加
	var showTable = function(data) {
		$("#tableItems").append("<tr></tr>").find("tr:last").append(

				"<td>" + data.date + "</td>").append(
				"<td>" + data.item1 + "</td>")
	};
});

/*

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
			console.log('app.js req.body: '+ options);
});

console.log('app.js req.body: ');

*/