var theRunner = (function($){
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

  function valconcat(vals, tagName) {
    if (vals.length === 0) return '';
    var open = '<' + tagName + '>', close = '</' + tagName + '>';
    return open + vals.join(close + open) + close;
  }

  function tableCreate(columns, values) {
    var tbl = document.createElement('table');
    tbl.className = "table table-striped";

    var html = '<thead>' + valconcat(columns, 'th') + '</thead>';
    var rows = values.map(function (v) { return valconcat(v, 'td'); });
    html += '<tbody>' + valconcat(rows, 'tr') + '</tbody>';
    tbl.innerHTML = html;
    return tbl;
  };

  function getSetupScript(filename) {
    const urlTarget = window.location.protocol + "//" + window.location.host + '/sql/' + filename;

    $.ajax({
      type: 'GET',
      url: urlTarget,
      success: function(data) {
        $("#setup").val(data);

        const setupEle = document.getElementById('setup');
        CodeMirror.fromTextArea(setupEle, {
          mode: 'text/x-mysql',
          autoRefresh:true,
          viewportMargin: Infinity,
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          matchBrackets: true,
          autofocus: true
        });

        const tablesElm = document.getElementById('tables');
        execute(data, tablesElm);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(`[${xhr.status}] ${xhr.responseText}`);
      },
    });
  }

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

  function setupFiles() {
    var url = new URL(window.location.href);
    var file = url.searchParams.get("file");
    if (file) {
      getSetupScript(file)
    }
  }

  $(document).ready(function() {
    $("#toggle").on("click", function() {
      $(".sidenav").toggleClass("activeside");
      $(".main").toggleClass("activemain");
      $(".main").toggleClass("col-sm-6 col-sm-12");
      $("#eyes").toggleClass("glyphicon glyphicon-eye-close glyphicon glyphicon-eye-open")
    });  

    setupFiles();
  });

})(jQuery);