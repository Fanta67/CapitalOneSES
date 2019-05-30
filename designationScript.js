select = document.getElementById('designation');

var file = new XMLHttpRequest();
file.open('GET', './designations.txt', false);
file.onreadystatechange = function() {
  if (file.readyState == 4) {
    if (file.status == 200 || file.status == 0) {
      var text = file.responseText;
      var res = text.split("\n");
      for (i = 0; i < res.length - 1; i++) {
        var designation = res[i];
        const opt = document.createElement('option');
        opt.textContent = designation;
        opt.value = designation.split(" ")[0];
        select.appendChild(opt);
      }
    }
  }
}

file.send();
