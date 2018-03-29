//Referenecs : https://jsfiddle.net/ondras/o3tzx1px/
//creating excel sheet

for (let i=0; i<6; i++) { /* build the table */
	let row = document.querySelector("table").insertRow()
	for (let j=0; j<6; j++) {
		let letter = String.fromCharCode("A".charCodeAt(0)+j-1)
		row.insertCell().innerHTML = i&&j ? `<input id=${letter}${i} />` : i||letter
	}
}


let keys = Array.from(document.querySelectorAll("input")).map(i => i.id) // spread not in Edge

function valueOf(key) { /* recursively compute a value */
	let val = localStorage[key] || ""
	if (val[0] == "=") {
		let f = new Function(...keys, `return eval("${val.substr(1)}")`)
		return f(...keys.map(key => ({valueOf: _ => valueOf(key)}))).valueOf()
	} else {
		return isNaN(parseFloat(val)) ? val : parseFloat(val)
	}
}

(window.update = _ => keys.forEach(key => { /* update all fields */
	try { document.getElementById(key).value = valueOf(key) } catch (e) {}
}))()

window.addEventListener("focus", e => e.target.value = localStorage[e.target.id] || "", true)
window.addEventListener("blur", e => (localStorage[e.target.id] = e.target.value, update()), true)


// function to add row in spreadsheet
function appendRow() {
	// adding a row to the spreadsheet
	var tbl = document.getElementById('my-table'), // table reference
		row = tbl.insertRow(tbl.rows.length),      // append table row
		i;
	 var k = tbl.rows.length - 1; 
	// insert table cells to the new row
	for (i = 0; i < tbl.rows[0].cells.length; i++) {
		var ltr = String.fromCharCode("A".charCodeAt(0)+i-1);
		 row.insertCell(-1).innerHTML = k&&i ? "<input id='"+ ltr+k +"'/>" : k||ltr;  
	}
}

// function to add column in spreadsheet
function appendCol() {
var tbl = document.getElementById('my-table'), // table reference
            i;
            var letter = String.fromCharCode("A".charCodeAt(0)+tbl.rows[0].cells.length-1);
            var j = tbl.rows[0].cells.length;
        // open loop for each row and append cell
        for (i = 0; i < tbl.rows.length; i++) {
            tbl.rows[i].insertCell(-1).innerHTML = i&&j ? "<input id='"+ letter+i +"'/>" : i||letter;
        }
}

// function to delete row
function deleteRow() {
	var tbl = document.getElementById('my-table'), // table reference
		lastRow = tbl.rows.length - 1;             // set the last row index
	tbl.deleteRow(lastRow);
}

// function to delete column
function deleteCol() {
	var tbl = document.getElementById('my-table'), // table reference
		lastCol = tbl.rows[0].cells.length - 1,    // set the last column index
		i, j;
	// delete cells with index greater then 0 (for each row)
	for (i = 0; i < tbl.rows.length; i++) {
		tbl.rows[i].deleteCell(lastCol);
	}
}
 

// References: https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
// function ot export spreadsheet to CSV File
function exportTableToCSV(filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");

	for (var i = 1; i < rows.length; i++) {
		var row = [];
		var cols = rows[i].querySelectorAll("td, th");

		for (var j = 1; j < cols.length; j++)
		row.push(cols[j].querySelector("input").value);

		csv.push(row.join(","));
	}

	// Download CSV file
	downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
	var csvFile;
	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], { type: "text/csv" });

	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	document.body.appendChild(downloadLink);

	// Click download link
	downloadLink.click();
}

