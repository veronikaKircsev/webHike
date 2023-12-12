function fetchShortList(filter) {
    fetch('http://localhost:30000/short-info-db')
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
                    tag.href = `hike/hike.html?selectedElement=${item.name}`;
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
                    console.log(item.hikeid);
                    const months = document.createElement('div');
                    months.textContent = "The best months:";
                    fetchMonth(item.hikeid, months);
                    container.appendChild(months);
                    months.className = "monthsList"
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
    console.log(hikes.length);


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

})
const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('param');

fetchShortList(paramValue);

