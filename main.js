
function fetchImageNameList() {
    fetch('http://localhost:30000/image-name-list-db')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('hike');
            list.innerHTML = ''; // Clear existing list items, if any

            data.forEach(item => {
                let base64 = item.image;

                const name = document.createElement('div');

                name.textContent = item.name;
                const hike = document.createElement('div');

                const img = new Image();

                img.src = base64;

                hike.className = "indexhike";
                //hike.appendChild(name);
                //hike.appendChild(img);
                const tag = document.createElement('a');
                tag.href = `hike/hike.html?selectedElement=${item.name}`;
                tag.title = item.name;
                tag.appendChild(name);
                tag.appendChild(img);
                hike.appendChild(tag);
                list.appendChild(hike);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}
//fetch list for detail


function fetchMonth(hikeId, element) {
    fetch('http://localhost:30000/month-db')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //const list = document.getElementById('hike');
           // list.innerHTML = ''; // Clear existing list items, if any

            data.forEach(item => {
                    const month = document.createElement('li');
                if (item.hikeid === hikeId) {
                    month.textContent = item.monthname;
                element.appendChild(month);
                }

            });
        })
        .catch(error => console.error('Fetch error:', error));
}


// Function to get the value of a specific query parameter from the URL
function getQueryParam(parameter) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameter);
}


