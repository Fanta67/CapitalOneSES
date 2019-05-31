function submitSearchRequest(state, keywords, designation) {
  var request = new XMLHttpRequest();
  var link = "https://developer.nps.gov/api/v1/parks";
  link += '?stateCode=' + state;
  for (var i = 0; i < keywords.length; i++) {
    link += '&q=' + keywords[i];
  }
  link += '&q=' + designation;
  link += '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
  request.open('GET', link, true);
  request.onreadystatechange = function () {
    // Begin accessing JSON data here
    var stateParks = JSON.parse(request.responseText);
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
