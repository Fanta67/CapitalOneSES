function submitSearchRequest(state, keywords, designation) {
  var container = document.getElementById('c2');

  var request = new XMLHttpRequest();
  var link = "https://developer.nps.gov/api/v1/parks";
  link += '?';
  if (state) link += 'stateCode=' + state + '&';
  if (designation || keywords.length != 0) {
    link += 'q=';
    if (keywords.length != 0) {
      keywords = keywords.join('%2C%20').split(' ').join('%20');
      link += keywords;
      if (designation) link += '%2C%20';
    }
    if (designation) link += designation;
    link += '&'
  }
  link += 'api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
  request.open('GET', link, true);

  request.onload = function () {
    var stateParks = JSON.parse(request.responseText);
    if (request.status == 200) {
      const p = document.createElement('p');
      var total = stateParks.total;
      if (total == 0) {
        p.textContent = 'No results found.';
      } else {
        p.textContent = 'Results 1-' + total + ' below. Click to see more details.';
      }
      p.align = "center";
      container.appendChild(p);
      stateParks.data.forEach(park => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        const a = document.createElement('a');
        a.href = "detail-view.html";
        a.href += "?park=" + park.parkCode;
        a.href += "&name=" + park.name;
        a.innerHTML = park.name;
        h1.appendChild(a);

        container.appendChild(card);
        card.appendChild(h1);
        const p = document.createElement('p');
        p.textContent = `${park.description}`;
        card.appendChild(p);
      });
    } else {
      alert("Invalid search.");
    }
    var temp = document.getElementById("loading");
    temp.parentNode.removeChild(temp);
  }
  request.send();
}

function getDetails(search) {
  var url = new URL(window.location.href);
  var state = url.searchParams.get("park");
  var container = document.getElementById('c2');
  var request = new XMLHttpRequest();
  var searchTerm;
  if (search == "visitorcenters") searchTerm = "Visitor Centers";
  else if (search == "campgrounds") searchTerm = "Campgrounds"
  var link = "https://developer.nps.gov/api/v1/";
  link += search;
  link += '?parkCode=' + state + '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
  request.open('GET', link, true);
  request.onload = function () {
    var response = JSON.parse(request.responseText);
    if (request.status == 200) {
      const h3 = document.createElement('h3');
      h3.textContent = searchTerm;
      container.appendChild(h3);
      if (response.total > 0) {
        response.data.forEach(elem => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.textContent = elem.name;

          container.appendChild(card);
          card.appendChild(h1);
          const p = document.createElement('p');
          p.textContent = `${elem.description}`;
          card.appendChild(p);
        });
      } else {
        const p = document.createElement('p');
        p.align = "center";
        p.textContent = "No " + searchTerm.toLowerCase() + " found";
        container.appendChild(p);
      }
      container.appendChild(document.createElement('br'));
    } else {
      alert("Invalid search.");
    }
  }
  request.send();
}

function putHeader() {
  var url = new URL(window.location.href);
  var name = url.searchParams.get("name");
  document.getElementById("header").textContent += name + '!';
}

function getResults() {
  var url = new URL(window.location.href);
  var state = url.searchParams.get("state");
  var keywords = url.searchParams.getAll("keywords");
  var designation = url.searchParams.get("designation");
  submitSearchRequest(state, keywords, designation);
}

function submit() {
  var state = document.getElementById("state").value;
  var keywords = document.getElementById("keywords").value.split(", ");
  var designation = document.getElementById("designation").value;
  var str = "results.html";
  str += "?";
  if (state != "") {
    str += "state=" + state + "&";
  }
  if (keywords != "") {
    for (var i = 0; i < keywords.length; i++) {
      str += "keywords=" + keywords[i] + "&";
    }
  }
  if (designation != "") {
    str += "designation=" + designation;
  }
  location.href = str;
}
