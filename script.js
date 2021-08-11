var scrollFunc = function() {
    disDiv = document.getElementById("about-disappearingDiv");
    skillsDiv = document.getElementById("about-skillsDiv");
    var y = window.scrollY;
    if (y >= (window.screen.height * 0.9) && y <  (window.screen.height * 1.7)) {
        disDiv.style.opacity = 1;
    } else {
        skillsDiv.style.opacity = 0;
        disDiv.style.opacity = 0;
    }

    if (y >= (window.screen.height) && y < (window.screen.height * 1.7)) {
        skillsDiv.style.opacity = 1;
    }
};

var loadFunc = function() {
    disDiv = document.getElementById("about-disappearingDiv");
    padDiv = document.getElementById("about-paddingDiv");
    padDiv.style.height = disDiv.clientHeight * 2;
};

function eraseAllFigures() {
    var x = document.querySelectorAll(".galleryItemCol");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.opacity = "0";
        x[i].style.display = "none";
    }
}

function selectFigure(className) {
    eraseAllFigures();
    var x = document.querySelectorAll(className);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
        x[i].style.opacity = "1";
    }
}

window.addEventListener("scroll", scrollFunc);
window.addEventListener("load", loadFunc);


