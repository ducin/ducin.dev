var slides = {
    "architect-frontend": "slides.com/ducin/architects-guide-to-frontend-frameworks",
    "ioc-js": "slides.com/ducin/the-many-meanings-of-ioc-in-javascript",
    "rxjs-streams": "slides.com/ducin/everything-is-a-stream",
    "5-architectures": "slides.com/ducin/5-architectures-of-asynchronous-javascript",
    "async-await": "slides.com/ducin/async-functions-awaiting-you",
    "typescript": "slides.com/ducin/javascript-plus-java-equals-typescript",
    "backend-less-development": "slides.com/ducin/backend-less-development"
}

$(document).ready(function(){

    function getLink(slideURL){
        return '<a href="http://' + slideURL + '">slides</a>';
    }

    function getEmbeddedSlides(slideURL){
        return '<iframe src="//' + slideURL + '/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }

    var width = $(window).width();
    var displayFn = (width < 500) ? getLink : getEmbeddedSlides;
    for (var talkCode in slides){
        var slideURL = slides[talkCode];
        $('#slides-' + talkCode).html(displayFn(slideURL));
    }
});
