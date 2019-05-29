function submitSearchRequest() {
  var state = document.getElementById("state").value;
  var request = new XMLHttpRequest();
  var link = "https://developer.nps.gov/api/v1/visitorcenters";
  link += '?stateCode=' + state;
  link += '&limit=50';
  link += '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
  request.open('GET', link, true);
  request.onreadystatechange = function () {
    alert("2");
    // Begin accessing JSON data here
    var stateParks = JSON.parse(request.responseText);
    alert("Hello wtf");
    if (request.status == 200) {
      stateParks.data.forEach(center => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = center.name;

        const p = document.createElement('p');
        center.description = center.description.substring(0, 500);
        p.textContent = `${center.description}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }
}
