var execBtn = document.getElementById("execute");
var outputElm = document.getElementById('output');
var errorElm = document.getElementById('error');
var commandsElm = document.getElementById('commands');

var worker = new Worker("worker.sql-wasm.js");
worker.onerror = error;
worker.postMessage({ action: 'open' });

function error(e) {
  console.log(e);
  errorElm.style.height = '2em';
  errorElm.textContent = e.message;
}

function noerror() {
  errorElm.innerHTML = '';
  // errorElm.style.height = '0';
}

function execute(commands, target) {  
  // console.log(commands)

  worker.onmessage = function (event) {
    var results = event.data.results;
    console.log(results);
    
    if (!results) {
      error({message: event.data.error});
      return;
    }

    target.innerHTML = "";
    var div = document.createElement('div');
    div.className = "tableFixHead";
    div.style.margin = '8px';

    for (var i = 0; i < results.length; i++) {
      div.appendChild(tableCreate(results[i].columns, results[i].values));
    }
    
    target.appendChild(div);
  }
  worker.postMessage({ action: 'exec', sql: commands });
  target.textContent = "Fetching results...";
}

var tableCreate = function () {
  function valconcat(vals, tagName) {
    if (vals.length === 0) return '';
    var open = '<' + tagName + '>', close = '</' + tagName + '>';
    return open + vals.join(close + open) + close;
  }
  
  return function (columns, values) {
    var tbl = document.createElement('table');
    tbl.className = "table table-striped";

    var html = '<thead>' + valconcat(columns, 'th') + '</thead>';
    var rows = values.map(function (v) { return valconcat(v, 'td'); });
    html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
    tbl.innerHTML = html;
    return tbl;
  }
}();

execBtn.addEventListener("click", () => {
  noerror()
  execute(editor.getValue() + ';', outputElm);
}, true);

var editor = CodeMirror.fromTextArea(commandsElm, {
  mode: 'text/x-mysql',
  viewportMargin: Infinity,
  indentWithTabs: true,
  smartIndent: true,
  lineNumbers: true,
  matchBrackets: true,
  autofocus: true
});

