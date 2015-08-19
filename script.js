window.onload=function() {
    var gallery = document.getElementById("gallery");
    var xhr = new XMLHttpRequest();
    var cannonicalUrl = "https://api.nasa.gov/planetary/apod?concept_tags=True&api_key=vgiDUqm8Qkcmx1nujPPXNHNCILTZvDQ2iQtF3rNN&date="
    var date = new Date();

    // fetch the ten latests pictures
    for (var i = 0; i < 10; i++) {
        var requestUrl = cannonicalUrl + date.toISOString().substring(0,10);
        xhr.open("GET", requestUrl, false);
        xhr.send();
        var responseJSON = JSON.parse(xhr.responseText);

        // form an image object from the resources given by NASA
        var DOM_img = document.createElement("img");
        DOM_img.setAttribute("class","floated_img");
        DOM_img.src = responseJSON.url;
        DOM_img.title = responseJSON.title;
        DOM_img.alt = responseJSON.explanation;
        gallery.appendChild(DOM_img);

        // move one day into the past
        date.setDate(date.getDate()-1);
    };
}
