//TODO: MAKE THIS A SEPARATE SCRIPT/PAGE SO IT RELOADS WITH NEW SUBMISSION
  function submitSearchRequest(state, searchType) {
    container = document.getElementById('c2');

    var request = new XMLHttpRequest();
    var link = "https://developer.nps.gov/api/v1/";
    link += searchType;
    link += '?stateCode=' + state;
    link += '&limit=50';
    link += '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
    request.open('GET', link, true);

    request.onload = function () {
      var stateParks = JSON.parse(request.responseText);
      if (request.status == 200) {
        const p = document.createElement('p');
        var total = stateParks.total;
        if (total == 0) {
          p.textcontent = 'No results found.';
        } else {
          p.textContent = 'Results 1-' + total + ' below.';
        }
        p.align = "center";
        container.appendChild(p);
        stateParks.data.forEach(park => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.textContent = park.name;

          container.appendChild(card);
          card.appendChild(h1);
          if (park.description.length > 0) {
            const p = document.createElement('p');
            park.description = park.description.substring(0, 500);
            p.textContent = `${park.description}`;
            card.appendChild(p);
          }
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
