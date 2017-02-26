// ui_table.js ブラウザUI用 JavaScript (index.htmlより呼ばれる)

/*eslint-env jquery, browser*/
$(function() {
	$("#get").click(
			function() {
				$("#tableItems").append("<tr></tr>").find("tr:last").append(
						"<td>" + "senzaki" + "</td>").append(
						"<td>" + "ryota" + "</td>")
			})
})