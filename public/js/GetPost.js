var fs = require('fs');
var querystring = require('querystring');
var url = require('url');

var server = http.createServer(function(req, res) {
	// '/'にアクセス index.html(テスト用のGET/POSTフォーム)を表示
	if (req.url === '/' && req.method === 'GET') {
		// index.htmlを読み込む
		fs.readFile(__dirname + '/index.html', {
			encoding : 'utf8'
		}, function(err, html) {
			// ファイルの読み込みに失敗したらエラーのレスポンスを返す
			if (err) {
				res.statusCode = 500;
				res.end('Error!');
			}
			// ファイルの読み込みが成功したらHTMLを返す
			else {
				res.setHeader('Content-Type', 'text/html');
				res.end(html);
			}
		});
	}
	// '/postPage'にアクセス かつ POSTリクエストだったら
	else if (req.url === '/postPage' && req.method === 'POST') {
		var data = '';
		// readableイベントが発火したらデータにリクエストボディのデータを追加
		req.on('readable', function(chunk) {
			data += req.read();
		});
		// リクエストボディをすべて読み込んだらendイベントが発火する。
		req.on('end', function() {
			// パースする
			querystring.parse(data);
			res.end(data);
		});
	}
	// '/getPage'にアクセス かつ GETリクエストだったら
	else if (req.url.indexOf('/getPage?') == 0 && req.method === 'GET') {
		var str = '';
		// パースする
		var data = url.parse(req.url, true).query;
		// 連想配列から取り出す
		for ( var key in data) {
			str += key + '=' + data[key] + '&';
		}
		res.end(str);
	} else {
		res.statusCode = 404;
		res.end('NotFound');
	}
});

// localhostの8000番ポートでサーバーを起動する
server.listen(8000);