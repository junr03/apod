function expandPhoto() {
    // keep a global variable of current img expanded
    currentIMG = this;

    // create the overlay div
    var overlay = document.createElement("div");
    overlay.setAttribute("id","overlay");
    overlay.setAttribute("class", "overlay");
    document.body.appendChild(overlay);

    // create the div to hold the picture, and title
    var overlaydiv = document.createElement("div");
    overlaydiv.setAttribute("class", "overlaydiv");
    overlay.appendChild(overlaydiv);

    // create the image
    var img = document.createElement("img");
    img.setAttribute("id","img");
    img.src = currentIMG.getAttribute("src");
    img.setAttribute("class","overlayimg");
    overlaydiv.appendChild(img);

    // create title
    var para = document.createElement("h3");
    var title = document.createTextNode(currentIMG.getAttribute("title"));
    para.appendChild(title);
    overlaydiv.appendChild(para);

    // create description div, and description
    var overlaydesc = document.createElement("div");
    overlaydesc.setAttribute("class", "overlaydesc");
    overlay.appendChild(overlaydesc);

    var desc = document.createElement("blockquote");
    var description = document.createTextNode(currentIMG.getAttribute("alt"));
    desc.appendChild(description);
    overlaydesc.appendChild(desc);
}

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

    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick=expandPhoto;
    }
}
