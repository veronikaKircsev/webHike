function fetchShortList(filter) {
    fetch('http://localhost:30000/hike-db')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('dHike');
            list.innerHTML = ''; // Clear existing list items, if any

            data.forEach(item => {
                if (item.name.toLowerCase().includes(filter) || item.region.toLowerCase().includes(filter) || item.location.toLowerCase().includes(filter)) {
                    let base64 = item.image;
                    const name = document.createElement('div');


                    name.textContent = item.name;
                    name.className = "dHikeName";
                    const hike = document.createElement('div');
                    const length = document.createElement('div');
                    const leng = document.createElement('div');
                    length.className = "dLength";
                    const km = item.length;
                    leng.textContent = km + ' km ';
                    let leIcon;
                    if (10 <= km && km <= 25){
                        leIcon = "../image/walking-orange.png";
                    } else if (km < 10) {
                        leIcon = "../image/walking-green.png";
                    } else if (km > 25) {
                        leIcon = "../image/walking-red.png";
                    }

                    const himg = new Image();
                    himg.style.height = "20px";
                    himg.src = leIcon;
                    length.style.display = "flex";
                    length.style.alignItems = "center";
                    length.appendChild(himg);
                    length.appendChild(leng);

                    const technique = document.createElement('div');
                    const tech = document.createElement('div');
                    tech.textContent = 'Technique';
                    tech.style.fontSize = "10px";
                    const hills = document.createElement('div');
                    const t = item.technique;
                    let tIcon;
                    if (t === 3){
                        tIcon = "../image/technique-orange.png";
                    } else if (t < 3) {
                        tIcon = "../image/technique-green.png";
                    } else {
                        tIcon = "../image/technique-red.png"
                    }
                    for (let i = 1; i < t; i++){
                        const hill = new Image();
                        hill.style.height = "20px";
                        hill.src = tIcon;
                        hills.appendChild(hill);
                    }
                    technique.appendChild(hills);
                    technique.appendChild(tech);
                    technique.className = 'technique';
                    const duration = document.createElement('div');
                    const dur = item.duration.slice(0, 5);
                    const time = item.duration.slice(0, 2);
                    let dIcon;
                    if (3 <= time && time <= 5) {
                        dIcon = "../image/time-orange.png";
                    } else if (time < 3){
                        dIcon = "../image/time-green.png";
                    } else if (time > 5) {
                        dIcon = "../image/time-red.png";
                    }
                    const du = document.createElement('div');
                    const clock = new Image();
                    clock.style.height = "15px";
                    clock.src = dIcon;
                    du.textContent = dur;
                    duration.appendChild(clock);
                    duration.appendChild(du);
                    duration.style.display = "flex";
                    duration.style.alignItems = "center";
                    duration.className = "duration";
                    const img = new Image();
                    img.src = base64;
                    hike.className = "dhike";
                    //hike.appendChild(name);
                    //hike.appendChild(img);
                    const tag = document.createElement('a');
                    tag.className = "hikeTag";
                    tag.href = `../hike/hike.html?selectedElement=${item.name}`;
                    tag.title = item.name;
                    tag.appendChild(name);
                    tag.appendChild(img);
                    const container = document.createElement('div');
                    container.className = "hikeContainer";
                    //hike.appendChild(tag);
                    const region = document.createElement('div');
                    region.textContent = item.region;
                    hike.appendChild(region);
                    const location = document.createElement('div');
                    const loc = document.createElement('div');
                    loc.className = 'location';
                    const locimg = new Image();
                    locimg.src = "../image/icons8-location-26.png"
                    locimg.style.height = "16px";
                    location.appendChild(locimg);
                    location.textContent = item.location;
                    loc.appendChild(locimg);
                    loc.appendChild(location);
                    loc.style.display = "flex";
                    loc.style.alignItems = "center";
                    hike.appendChild(loc);
                    hike.appendChild(length);
                    hike.appendChild(technique);
                    hike.appendChild(duration);
                    container.appendChild(tag);
                    container.appendChild(hike);
                    const months = document.createElement('div');
                    months.textContent = "The best months:";
                    fetchMonth(item.hikeid, months);
                    container.appendChild(months);
                    months.className = "monthsList";
                    const hidden = document.createElement('div');
                    const altitude = document.createElement('div');
                    const alti = Math.floor(item.altitude);
                    altitude.textContent = alti;
                    hidden.appendChild(altitude);
                    const strength = document.createElement('div');
                    strength.textContent = item.strength;
                    hidden.appendChild(strength);
                    const stamina = document.createElement('div');
                    stamina.textContent = item.stamina;
                    hidden.appendChild(stamina);
                    const landscape = document.createElement('div');
                    landscape.textContent = item.landscape;
                    hidden.appendChild(landscape);
                    const techn = document.createElement('div');
                    techn.textContent = item.technique;
                    hidden.appendChild(techn);
                    hidden.style.display = 'none';
                    container.appendChild(hidden);
                    list.appendChild(container);
                }


            });
        })
        .catch(error => console.error('Fetch error:', error));
}

function filterData() {
    // Get the search query from the input field
    var searchQuery = document.getElementById('searchInput').value.toLowerCase();

    // Loop through the elements and show/hide based on the search query
    var list = document.getElementById('dHike');
    var hikes = list.getElementsByClassName('hikeContainer');


    for (var i = 0; i < hikes.length; i++) {

        var hike = hikes[i];
        var name = hike.getElementsByTagName('div')[0].textContent.toLowerCase();
        var region = hike.getElementsByTagName('div')[2].textContent.toLowerCase();
        var location = hike.getElementsByTagName('div')[3].textContent.toLowerCase();

        // Check if the name includes the search query
        if (name.includes(searchQuery) || location.includes(searchQuery) || region.includes(searchQuery)) {
            hike.style.display = '';  // Show the element
        } else {
            hike.style.display = 'none';  // Hide the element
        }
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        filterData();

});

const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');
fetchShortList(paramValue);

var lastScroll = 0;

window.onscroll = function() {
    var fixedElement = document.querySelector('.fix');
    const fixedBack = document.querySelector('.fixBack');
    const fixedNav = document.querySelector('.nav');
    const fixedFilter= document.querySelector('.filter');


    // Distance from the top of the document to the top of the fixed element
    var distanceToTop = fixedElement.offsetTop;

    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
    console.log(currentScroll +'current ' + lastScroll + 'last');

    // Check if the user has scrolled past the top of the fixed element
    if (window.scrollY > distanceToTop) {
        if (currentScroll > 0 && lastScroll >= currentScroll) {
            lastScroll = currentScroll;
            fixedElement.classList.add('fixed');
            fixedBack.classList.add('fixedBack');
            fixedNav.classList.add('fixedNav');
            fixedFilter.classList.add('filterFix');
        } else {
            lastScroll = currentScroll;
            fixedElement.classList.remove('fixed');
            fixedBack.classList.remove('fixedBack');
            fixedNav.classList.remove('fixedNav');
            fixedFilter.classList.remove('filterFix');
        }
    } else {
        lastScroll = currentScroll;
        fixedElement.classList.remove('fixed');
        fixedBack.classList.remove('fixedBack');
        fixedNav.classList.remove('fixedNav');
        fixedFilter.classList.remove('filterFix');
    }
};
function toggleFilter() {
    var x = document.querySelector(".filter");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}




const hour = " hours";
//sliderOutPutWithValue(document.querySelector("#minValue"), document.querySelector(".min"), hour);
//sliderOutPutWithValue(document.querySelector("#maxValue"), document.querySelector(".max"), hour);
const km = " km";
//sliderOutPutWithValue(document.querySelector("#minDistance"), document.querySelector(".minDistance"), km);
//sliderOutPutWithValue(document.querySelector("#maxDistance"), document.querySelector(".maxDistance"), km);
const m = " m";
//sliderOutPutWithValue(document.querySelector("#minAltitude"), document.querySelector(".minAltitude"), m);
//sliderOutPutWithValue(document.querySelector("#maxAltitude"), document.querySelector(".maxAltitude"), m);
/*
sliderOutPut(document.querySelector("#minStrength"), document.querySelector(".minStrength"));
sliderOutPut(document.querySelector("#maxStrength"), document.querySelector(".maxStrength"));
sliderOutPut(document.querySelector("#minStamina"), document.querySelector(".minStamina"));
sliderOutPut(document.querySelector("#maxStamina"), document.querySelector(".maxStamina"));
sliderOutPut(document.querySelector("#minDifficulty"), document.querySelector(".minDifficulty"));
sliderOutPut(document.querySelector("#maxDifficulty"), document.querySelector(".maxDifficulty"));
sliderOutPut(document.querySelector("#minLandscape"), document.querySelector(".minLandscape"));
sliderOutPut(document.querySelector("#maxLandscape"), document.querySelector(".maxLandscape"));
 */

(function() {

    function addSeparator(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    function rangeInputChangeEventHandlerDuration(e){
        var rangeGroup = $(this).attr('duration'),
            minBtn = $(this).parent().children('.min'),
            maxBtn = $(this).parent().children('.max'),
            range_min = $(this).parent().children('#minValue'),
            range_max = $(this).parent().children('#maxValue'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'min' && minVal > maxVal-1){
            $(minBtn).val(maxVal-1);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*0.5)+ ' hours');


        if(origin === 'max' && maxVal-1 < minVal){
            $(maxBtn).val(1+ minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*0.5) + ' hours');
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerDuration);

    function rangeInputChangeEventHandlerDistance(e){
        var rangeGroup = $(this).attr('distance'),
            minBtn = $(this).parent().children('.minDistance'),
            maxBtn = $(this).parent().children('.maxDistance'),
            range_min = $(this).parent().children('#minDistance'),
            range_max = $(this).parent().children('#maxDistance'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minDistance' && minVal > maxVal-1){
            $(minBtn).val(maxVal-1);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1)+ ' km');


        if(origin === 'maxDistance' && maxVal-1 < minVal){
            $(maxBtn).val(2+ minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1) + ' km');
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerDistance);

    function rangeInputChangeEventHandlerAltitude(e){
        var rangeGroup = $(this).attr('altitude'),
            minBtn = $(this).parent().children('.minAltitude'),
            maxBtn = $(this).parent().children('.maxAltitude'),
            range_min = $(this).parent().children('#minAltitude'),
            range_max = $(this).parent().children('#maxAltitude'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minAltitude' && minVal > maxVal-50){
            $(minBtn).val(maxVal-50);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1)+ ' m');


        if(origin === 'maxAltitude' && maxVal-50 < minVal){
            $(maxBtn).val(50+ minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1) + ' m');
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerAltitude);

    function rangeInputChangeEventHandlerStrength(e){
        var rangeGroup = $(this).attr('strength'),
            minBtn = $(this).parent().children('.minStrength'),
            maxBtn = $(this).parent().children('.maxStrength'),
            range_min = $(this).parent().children('#minStrength'),
            range_max = $(this).parent().children('#maxStrength'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minStrength' && minVal > maxVal-1){
            $(minBtn).val(maxVal);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1));


        if(origin === 'maxStrength' && maxVal-1 < minVal){
            $(maxBtn).val(minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1));
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerStrength);

    function rangeInputChangeEventHandlerStamina(e){
        var rangeGroup = $(this).attr('stamina'),
            minBtn = $(this).parent().children('.minStamina'),
            maxBtn = $(this).parent().children('.maxStamina'),
            range_min = $(this).parent().children('#minStamina'),
            range_max = $(this).parent().children('#maxStamina'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minStamina' && minVal > maxVal-1){
            $(minBtn).val(maxVal);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1));


        if(origin === 'maxStamina' && maxVal-1 < minVal){
            $(maxBtn).val(minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1));
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerStamina);

    function rangeInputChangeEventHandlerDifficulty(e){
        var rangeGroup = $(this).attr('difficulty'),
            minBtn = $(this).parent().children('.minDifficulty'),
            maxBtn = $(this).parent().children('.maxDifficulty'),
            range_min = $(this).parent().children('#minDifficulty'),
            range_max = $(this).parent().children('#maxDifficulty'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minDifficulty' && minVal > maxVal-1){
            $(minBtn).val(maxVal);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1));


        if(origin === 'maxDifficulty' && maxVal-1 < minVal){
            $(maxBtn).val(minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1));
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerDifficulty);

    function rangeInputChangeEventHandlerLandscape(e){
        var rangeGroup = $(this).attr('landscape'),
            minBtn = $(this).parent().children('.minLandscape'),
            maxBtn = $(this).parent().children('.maxLandscape'),
            range_min = $(this).parent().children('#minLandscape'),
            range_max = $(this).parent().children('#maxLandscape'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if(origin === 'minLandscape' && minVal > maxVal-1){
            $(minBtn).val(maxVal);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal*1));


        if(origin === 'maxLandscape' && maxVal-1 < minVal){
            $(maxBtn).val(minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal*1));
    }

    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerLandscape);

})();

/*
function sliderOutPutWithValue(outputId, inputClass, messaurment) {
    const value = outputId;
    const input = inputClass;
    value.textContent = input.value;
   // input.addEventListener("change", (event) => {
    //    value.textContent = event.target.value + messaurment;
   // });
}
function sliderOutPut(outputId, inputClass) {
    const value = outputId;
    const input = inputClass;
    value.textContent = input.value;
    input.addEventListener("change", (event) => {
        value.textContent = event.target.value;
    });
}

 */


function filter() {
    var list = document.getElementById('dHike');
    var hikes = list.getElementsByClassName('hikeContainer');
    var region = document.getElementById("region").value.toLowerCase();
    var location = document.getElementById("location").value.toLowerCase();
    var minD = document.querySelector(".minDistance").value;
    var maxD = document.querySelector(".maxDistance").value;
    var minDuration = Math.floor(document.querySelector(".min").value);
    var maxDuration = Math.floor(document.querySelector(".max").value);
    var months = document.querySelectorAll('input[name="month"]:checked');
    var minAltitude = document.querySelector(".minAltitude").value;
    var maxAltitude = document.querySelector(".maxAltitude").value;
    var minStrength = document.querySelector(".minStrength").value;
    var maxStrength = document.querySelector(".maxStrength").value;
    var minStamina = document.querySelector(".minStamina").value;
    var maxStamina = document.querySelector(".maxStamina").value;
    var minLandscape = document.querySelector(".minLandscape").value;
    var maxLandscape = document.querySelector(".maxLandscape").value;
    var minTechnique = document.querySelector(".minDifficulty").value;
    var maxTechnique = document.querySelector(".maxDifficulty").value;




    for (let i = 0; i < hikes.length; i++) {
        var hike = hikes[i];
        var regi = hike.getElementsByTagName('div')[2].textContent.toLowerCase();
        var loc = hike.getElementsByTagName('div')[3].textContent.toLowerCase();
        var leng = hike.getElementsByTagName('div')[5].textContent;
        var l = leng.split(' ');
        var km = l[0];
        var duration = hike.getElementsByTagName('div')[10].textContent;
        var time = duration.split(':');
        var nums = time[0].split('');
        var hour;
        if (!nums[0]===0){
            hour = nums[0]+nums[1];
        } else {
            hour = nums[1];
        }
        var listMonths = hike.getElementsByTagName('li');
        let monthCheck = false;
        var altitude = hike.getElementsByTagName('div')[14].textContent;
        var strength = hike.getElementsByTagName('div')[15].textContent;
        var stamina = hike.getElementsByTagName('div')[16].textContent;
        var landscape = hike.getElementsByTagName('div')[17].textContent;
        var technique = hike.getElementsByTagName('div')[18].textContent;



        if (!regi.includes(region)) {

            hike.style.display = 'none';
        }
        if (!loc.includes(location)) {

            hike.style.display = 'none';
        }
        if (!(minD <= km && km <= maxD)) {

            hike.style.display = 'none';
        }
        if (!(minDuration <= hour && hour <= maxDuration)) {

            hike.style.display = 'none';
        }

        for (let i = 0; i < listMonths.length; i++){
            const month = listMonths[i].textContent.toLowerCase();
            months.forEach((checkbox) => {
                const chMonth = checkbox.value.toLowerCase();
                if (chMonth.includes(month) || month.includes(chMonth))
                    monthCheck = true;
            });

        }

        if (!monthCheck) {
            hike.style.display = 'none';
        }

        if (!(minAltitude <= altitude && altitude <= maxAltitude)) {
            hike.style.display = 'none';
        }

        if (!(minStrength <= strength && strength <= maxStrength)) {
            hike.style.display = 'none';
        }
        if (!(minStamina <= stamina && stamina <= maxStamina)) {
            hike.style.display = 'none';
        }
        if (!(minLandscape <= landscape && landscape <= maxLandscape)) {
            hike.style.display = 'none';
        }
        if (!(minTechnique <= technique && technique <= maxTechnique)) {
            hike.style.display = 'none';
        }

    }
}

