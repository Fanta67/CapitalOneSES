//Retrieve search results
function submitSearchRequest(state, keywords, designation) {
  var container = document.getElementById('c2');

  //submit search request to API
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

  //load results
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
      //create cards for each park found
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

//Retrieve detailed information on a single park
function getDetails(search) {
  var url = new URL(window.location.href);
  var state = url.searchParams.get("park");
  var container = document.getElementById(search);
  var request = new XMLHttpRequest();

  //get search term with proper caps and spaces
  var searchTerm;
  if (search == "visitorcenters") searchTerm = "Visitor Centers";
  else if (search == "campgrounds") searchTerm = "Campgrounds";
  else if (search == "alerts") searchTerm = "Alerts";
  else if (search == "articles") searchTerm = "Articles";
  else if (search == "events") searchTerm = "Events";
  else if (search == "newsreleases") searchTerm = "News Releases";
  else if (search == "lessonplans") searchTerm = "Lesson Plans";
  else if (search == "people") searchTerm = "People";
  else if (search == "places") searchTerm = "Places";

  //submit search request to API
  var link = "https://developer.nps.gov/api/v1/";
  link += search;
  link += '?parkCode=' + state + '&api_key=oeKLO4WwSs82lEaiPseSaWyx462T696oefty2fUS';
  request.open('GET', link, true);

  //load results for each search
  request.onload = function () {
    var response = JSON.parse(request.responseText);
    if (request.status == 200) {
      const h4 = document.createElement('h4');
      h4.textContent = searchTerm;
      container.appendChild(h4);
      if (response.total > 0) {
        response.data.forEach(elem => {
          const card = document.createElement('div');
          card.className = 'card';

          const h1 = document.createElement('h1');
          if (search == "visitorcenters" || search == "campgrounds") {
            h1.textContent = elem.name;
          } else {
            h1.textContent = elem.title;
          }

          container.appendChild(card);
          card.appendChild(h1);
          const p = document.createElement('p');

          //create cards differently based on search parameter and JSON response format
          if (search == "visitorcenters" || search == "campgrounds" || search == "alerts") {
            p.textContent = `${elem.description}`;
          } else if (search == "events") {
            p.innerHTML = `${elem.description}`;
            const p2 = document.createElement('p');
            p2.textContent = ' Starts: ' + elem.datestart + ' at ' + elem.times[0].timestart;
            p2.align = "center";
            p2.style = "font-weight: bold";
            p.appendChild(p2);
          } else {
              if (search == "newsreleases") {
                p.textContent = `${elem.abstract}`;
              } else if (search == "lessonplans"){
                p.textContent = `${elem.questionobjective}`;
              } else {
                p.textContent = `${elem.listingdescription}`;
              }
              const span = document.createElement('span');
              span.textContent = ' Read more ';
              const a = document.createElement('a');
              a.href = `${elem.url}`;
              a.textContent = 'here.';
              span.appendChild(a);
              p.appendChild(span);
          }
          card.appendChild(p);
        });
      } else {
        //if no info found for search for this park
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

//Get park name from url, put countdown timer to wait for API requests
function putHeader() {
  var url = new URL(window.location.href);
  var name = url.searchParams.get("name");
  document.getElementById("header").textContent += name + '!';
  document.title = name + " - National Park Service Information Kiosk"

  //count down
  var timeleft = 9;
  var downloadTimer = setInterval(function(){
    var countdown = document.getElementById("countdown");
    countdown.textContent = "Please allow up to " + timeleft + " more seconds for page content to load.";
    timeleft -= 1;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      countdown.textContent = "Done loading! :)"
    }
  }, 1000);
}

//Get all details needed
function loadDetails() {
  getDetails("visitorcenters");
  getDetails("campgrounds");
  getDetails("alerts");
  getDetails("articles");
  getDetails("events");
  getDetails("newsreleases");
  getDetails("lessonplans");
  getDetails("people");
  getDetails("places");
}

//Get search parameters from url
function getResults() {
  var url = new URL(window.location.href);
  var state = url.searchParams.get("state");
  var keywords = url.searchParams.getAll("keywords");
  var designation = url.searchParams.get("designation");
  submitSearchRequest(state, keywords, designation);
}

//Pass filter parameters to url of results page
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
