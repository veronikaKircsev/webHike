function fetchMonthBox(hikeId) {
    fetch('http://localhost:30000/month-db')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var list = document.getElementById('tour-months');
            var months = list.getElementsByClassName('tour-month');
            data.forEach(item => {
                if (item.hikeid === hikeId) {
                    for (let i = 0; i < months.length; i++) {
                        const month = months[i];
                        const mName = month.textContent.toLowerCase();
                        if (item.monthname.toLowerCase().includes(mName)) {
                            month.classList.add("tour-month-selected");
                        }
                    }

                    }

            });
        })
        .catch(error => console.error('Fetch error:', error));
}


// Get the value of the "selectedElement" query parameter
var selectedElement = getQueryParam('selectedElement');


// Fetch data from the database based on the selected element

function fetchHike() {
    fetch('http://localhost:30000/hike-db')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('selected');
            //list.innerHTML = ''; // Clear existing list items, if any

            data.forEach(item => {
                if (item.name === selectedElement) {
                    let base64 = item.image;
                    const name = document.createElement('div');
                    name.textContent = item.name;
                    name.className = "hikeName";
                    const img = new Image();
                    img.src = base64;
                    img.className = "hikeImg";
                    const myMap = document.createElement('div');
                    myMap.id = 'map';
                    const description = document.createElement('div');
                    description.textContent = item.description;
                    description.className = "description";

                    fetchMonthBox(item.hikeid);

                    const box = document.createElement('div');
                    box.className = 'location';

                    box.textContent = item.region + ' ' + item.location;
                    list.appendChild(box);

                    const box2 = document.createElement('div');
                    box2.className = 'info';

                    const duration = document.createElement('div');
                    const durationImg = new Image();
                    const time = item.duration.slice(0, 2);
                    let dIcon;
                    if (3 <= time && time <= 5) {
                        dIcon = "../image/time-orange.png";
                    } else if (time < 3){
                        dIcon = "../image/time-green.png";
                    } else if (time > 5) {
                        dIcon = "../image/time-red.png";
                    }
                    durationImg.src = dIcon;
                    duration.textContent = item.duration.slice(0, 5);
                    const cDuration = document.createElement('div');
                    cDuration.appendChild(durationImg);
                    cDuration.appendChild(duration);
                    cDuration.style.display = 'flex';
                    cDuration.style.alignItems = 'center';
                    cDuration.style.gap = '10px';
                    box2.appendChild(cDuration);

                    const cLength = document.createElement('div');
                    const lengthImg = new Image();
                    const distance = item.length;
                    let leIcon;
                    if (10 <= distance && distance <= 25){
                        leIcon = "../image/walking-orange.png";
                    } else if (distance < 10) {
                        leIcon = "../image/walking-green.png";
                    } else if (distance > 25) {
                        leIcon = "../image/walking-red.png";
                    }

                    lengthImg.src = leIcon;
                    const length = document.createElement('div');
                    length.textContent = distance + ' km';
                    cLength.appendChild(lengthImg);
                    cLength.appendChild(length);
                    box2.appendChild(cLength);
                    cLength.style.display = 'flex';
                    cLength.style.alignItems = 'center';
                    cLength.style.gap = '5px';

                    const cAltitude = document.createElement('div');
                    const altitudeImg = new Image();
                    let aIcon;
                    const max = 1000;
                    const alt = Math.round(item.altitude);
                    if (alt === max){
                        aIcon = "../image/elevation-orange.png";
                    } else if (alt < max) {
                        aIcon = "../image/elevation-green.png";
                    } else if (alt > max){
                        aIcon = "../image/elevation-red.png";
                    }
                    altitudeImg.src = aIcon;
                    const altitude = document.createElement('div');
                    altitude.textContent = alt + ' m';
                    cAltitude.appendChild(altitudeImg);
                    cAltitude.appendChild(altitude);
                    box2.appendChild(cAltitude);
                    cAltitude.style.display = 'flex';
                    cAltitude.style.alignItems = 'center';
                    cAltitude.style.gap = '10px';

                    const box3 = document.createElement('div');
                    box3.className = 'info2';

                    const technique = document.createElement('div');
                    technique.textContent = 'Technique';
                    const t = item.technique;
                    const gap = document.createElement('br');
                    technique.appendChild(gap);
                    technique.className = 'technique';
                    let tIcon;
                    if (t === 3){
                        tIcon = "../image/technique-orange.png";
                    } else if (t < 3) {
                        tIcon = "../image/technique-green.png";
                    } else {
                        tIcon = "../image/technique-red.png"
                    }

                    for (let i = 1; i <= t; i++){
                        const tImage = new Image();
                        tImage.src = tIcon;
                        tImage.style.height = '40px';
                        technique.appendChild(tImage);
                    }
                    box3.appendChild(technique);

                    const stamina = document.createElement('div');
                    stamina.textContent = 'Stamina';
                    const s = item.stamina;
                    const gap2 = document.createElement('br');
                    stamina.appendChild(gap2);
                    stamina.className = 'stamina';
                    for (let i = 1; i <= s; i++){
                        const sImg = new Image();
                        sImg.src = "../image/icons8-fitness-85.png";
                        sImg.style.height = '40px';
                        stamina.appendChild(sImg);
                    }
                    box3.appendChild(stamina);

                    const strength = document.createElement('div');
                    strength.textContent = 'Strength';
                    const st = item.strength;
                    const gap3 = document.createElement('br');
                    strength.appendChild(gap3);
                    strength.className = 'strength';
                    let sIcon;
                    if (st === 3){
                        sIcon = "../image/strength-orange.png";
                    } else if (st < 3) {
                        sIcon = "../image/strength-green.png";
                    } else if (st > 3){
                        sIcon = "../image/strength-red.png";
                    }

                    for (let i = 1; i <= st; i++){
                        const stImg = new Image();
                        stImg.src = sIcon;
                        stImg.style.height = '40px';
                        strength.appendChild(stImg);
                    }
                    box3.appendChild(strength);

                    const landscape = document.createElement('div');
                    landscape.textContent = 'Landscape';
                    const l = item.landscape;
                    const gap4 = document.createElement('br');
                    landscape.appendChild(gap4);
                    landscape.className = 'landscape';

                    let lIcon;
                    if (l === 3){
                        lIcon = "../image/landscape-orange.png";
                    } else if (l > 3) {
                        lIcon = "../image/landscape-green.png";
                    } else if (l < 3){
                        lIcon = "../image/landscape-red.png";
                    }

                    for (let i = 1; i <= l; i++){
                        const lImg = new Image();
                        lImg.src = lIcon;
                        lImg.style.height = '40px';
                        landscape.appendChild(lImg);
                    }
                    box3.appendChild(landscape);



                    list.appendChild(name);
                    list.appendChild(myMap);
                    list.appendChild(description);
                    list.appendChild(img);
                    list.appendChild(box2);
                    list.appendChild(box3);







                    const start = item.starting_point.split(', ');
                    const ref = document.querySelector('#drive');
                    ref.href = `drive_to.html?start=${start}`;

                    const map = L.map('map').setView([start[0], start[1]], 15);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                    }).addTo(map);

                    const mStart = new L.Marker([start[0], start[1]]).addTo(map);
                    const first = item.stop_one.split(', ');
                    const mFirst = new L.Marker([first[0], first[1]]).addTo(map);
                    const second = item.stop_two.split(', ');
                    const mSecond = new L.Marker([second[0], second[1]]).addTo(map);
                    const three = item.stop_three.split(', ');
                    const mThree = new L.Marker([three[0], three[1]]).addTo(map);
                    const end = item.finishing_point.split(', ');
                    const mEnd = new L.Marker([end[0], end[1]]).addTo(map);

                    const polyCoordinates = [
                        [start[0], start[1]],
                        [first[0], first[1]],
                        [second[0], second[1]],
                        [three[0], three[1]],
                        [end[0], end[1]]
                    ];
                    const route = L.Routing.control({
                        waypoints: polyCoordinates
                    }).addTo(map);

                    const polyline = L.polyline(polyCoordinates);



                    map.fitBounds(polyline.getBounds());


                }
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

fetchHike();

const likeBtn = document.querySelector('.like');
let isLiked = false;
const likeClick = () => {
// if the like button hasn't been clicked
    if (!isLiked) {
        likeBtn.classList.add('isLiked');
        likeBtn.src = "../image/icons8-like-48.png";
        isLiked = true;
    }
// if the like button has been clicked
    else {

        likeBtn.classList.remove('isLiked');
        likeBtn.src = "../image/icons8-like-50.png";
        isLiked = false;
    }
};
// Event Listeners
likeBtn.addEventListener('click', likeClick);