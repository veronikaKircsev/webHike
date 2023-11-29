function fetchImageNameList() {
    fetch('http://localhost:30000/test-db')
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
                hike.appendChild(name);
                hike.appendChild(img);
                list.appendChild(hike);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}