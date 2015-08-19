function restore() {
    document.body.removeChild(document.getElementById("overlay"));
}

function previousPhoto() {
    restore();
    expandPhoto.call(currentIMG.previousSibling);
}

function nextPhoto() {
    restore();
    expandPhoto.call(currentIMG.nextSibling);
}

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

    var para = document.createElement("h3");
    var title = document.createTextNode(currentIMG.getAttribute("title"));
    para.appendChild(title);
    overlaydiv.appendChild(para);

    // create nav div
    var nav = document.createElement("div");
    nav.setAttribute("class", "nav");
    overlaydiv.appendChild(nav);

    // if there is a previous photo, create a previous arrow
    if (currentIMG.previousSibling  instanceof HTMLImageElement) {
        var prev = document.createElement("a");
        prev.setAttribute("onclick","previousPhoto()");
        var textPrev = document.createTextNode("<");
        prev.appendChild(textPrev);
        nav.appendChild(prev);
    };

    // create a back to gallery button
    var gallery = document.createElement("a");
    gallery.setAttribute("onclick","restore()");
    var textGallery = document.createTextNode("Back to Gallery");
    gallery.appendChild(textGallery);
    nav.appendChild(gallery);

    // if there is a next photo, create a next arrow
    if (currentIMG.nextSibling  instanceof HTMLImageElement) {
        var frwd = document.createElement("a");
        frwd.setAttribute("onclick","nextPhoto()");
        var textFrwd = document.createTextNode(">");
        frwd.appendChild(textFrwd);
        nav.appendChild(frwd);
    };

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
