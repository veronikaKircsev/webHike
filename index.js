window.addEventListener("load", fetchImageNameList);

document.addEventListener("keydown", function (event){
    const textIn = document.getElementById("search").value.toLowerCase();
    if (event.key === 'Enter'){
        window.location.href = "detail/detail.html?param="+ encodeURIComponent(textIn);

    }
});

var lastScroll = 0;

window.onscroll = function() {
    const fixedElement = document.querySelector('.search');
    const logo = document.querySelector('.logo');
    const nav = document.getElementById('navBar');


    // Distance from the top of the document to the top of the fixed element
    var distanceToTop = fixedElement.offsetTop;

    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
    console.log(currentScroll +'current ' + lastScroll + 'last');

    // Check if the user has scrolled past the top of the fixed element
    if (window.scrollY > distanceToTop) {
        if (currentScroll > 0 && lastScroll >= currentScroll) {
            lastScroll = currentScroll;
            fixedElement.classList.add('searchFix');
            logo.classList.add('logoHidden');
            nav.classList.add('fixedNav');
        } else {
            lastScroll = currentScroll;
            fixedElement.classList.remove('searchFix');
            nav.classList.remove('fixedNav');

        }
    } else {
        lastScroll = currentScroll;
        fixedElement.classList.remove('searchFix');
        logo.classList.remove('logoHidden');
        nav.classList.remove('fixedNav');

    }
};