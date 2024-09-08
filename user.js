// Function to handle the current location button click
document.getElementById('currentLocationBtn').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitudeField = document.getElementById('latitude');
            const longitudeField = document.getElementById('longitude');

            latitudeField.value = position.coords.latitude;
            longitudeField.value = position.coords.longitude;

        }, function (error) {
            alert('Unable to retrieve your location due to ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Form submission logic
document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const rfid = document.getElementById('kid').value;
    const name = document.getElementById('name').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const password = document.getElementById('password').value;

    const newUser = { rfid, name, password, latitude, longitude };

    // Save user data via the API
    fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Redirect to the map view page
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error saving user data:', error));
});

