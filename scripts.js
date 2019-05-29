//TODO: MAKE THIS A SEPARATE SCRIPT/PAGE SO IT RELOADS WITH NEW SUBMISSION
  function submitSearchRequest() {
    var state = document.getElementById("state").value;
    container = document.getElementById('c1');

    var request = new XMLHttpRequest();
    var link = "https://developer.nps.gov/api/v1/parks";
    link += '?stateCode=' + state;
    link += '&limit=50';
    link += '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
    request.open('GET', link, true);

    request.onload = function () {
      var stateParks = JSON.parse(request.responseText);
      if (request.status == 200) {
        const p = document.createElement('p');
        var total = stateParks.total;
        p.textContent = 'Results 1-' + total + ' below.'
        p.align = "center";
        container.appendChild(p);
        stateParks.data.forEach(park => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.textContent = park.name;

          const p = document.createElement('p');
          park.description = park.description.substring(0, 500);
          p.textContent = `${park.description}`;

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          /*const p = document.createElement("p");
          p.textContent = park.name;
          container.appendChild(p);*/
        });
      } else {
        alert("Invalid search.");
      }
    }
    request.send();
  }
