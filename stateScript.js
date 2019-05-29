select = document.getElementById('state');

var file = new XMLHttpRequest();
file.open('GET', './stateCodes.txt', false);
file.onreadystatechange = function() {
  if (file.readyState == 4) {
    if (file.status == 200 || file.status == 0) {
      var text = file.responseText;
      var res = text.split("\n");
      for (i = 0; i < res.length; i++) {
        var state = res[i];
        var fields = state.split("\t");
        const opt = document.createElement('option');
        opt.textContent = fields[0];
        opt.value = fields[2];
        select.appendChild(opt);
      }
    }
  }
}

file.send();