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
                            console.log(mName);
                        if (item.monthname.toLowerCase().includes(mName)) {
                            month.classList.add("tour-month-selected");
                        }
                    }

                    }

            });
        })
        .catch(error => console.error('Fetch error:', error));
}