// Load user details from the backend and display on the map
fetch(`${API_URL}/api/getusers`)
    .then(response => response.json())
    .then(data => {
        if (data.users.length > 0) {
            // Calculate the average coordinates to center the map
            let avgLatitude = data.users.reduce((sum, user) => sum + user.latitude, 0) / data.users.length;
            let avgLongitude = data.users.reduce((sum, user) => sum + user.longitude, 0) / data.users.length;

            // Initialize the map centered on the average coordinates
            const map = L.map('map').setView([avgLatitude, avgLongitude], 2);

            // Set up the OpenStreetMap layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Create a marker cluster group
            const markers = L.markerClusterGroup();

            // Helper function to add jitter
            const jitter = (coordinate, amount = 0.0001) => {
                return coordinate + (Math.random() * amount - amount / 2);
            };

            // Add markers for each user
            data.users.forEach(user => {
                const lat = jitter(user.latitude);
                const lng = jitter(user.longitude);
                const popupContent = user.public
                    ? `<b>${user.name}</b><br/>Level: ${user.level}<br/>Experience: ${user.experience}<br/>Bio: ${user.bio}`
                    : `<b>${user.name}</b>`;

                let userIcon;

                if (user.image) {
                    // Create a custom icon with circular image
                    userIcon = L.divIcon({
                        className: 'circular-icon',
                        html: `<img src=${user.image} class="circular-icon" alt="User Image"/>`,
                        iconSize: [40, 40], // Size of the icon
                    });
                } else {
                    // Fallback to default icon if no image is available
                    userIcon = L.divIcon({
                        className: 'circular-icon',
                        html: `<img src="images/flame.jpeg" class="circular-icon" alt="User Image"/>`,
                        iconSize: [40, 40], // Size of the icon
                    });
                }

                const marker = L.marker([lat, lng], { icon: userIcon })
                    .bindPopup(popupContent);

                // Show popup on hover
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });

                // Hide popup when not hovering
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });

                markers.addLayer(marker);
            });

            // Add the marker cluster group to the map
            map.addLayer(markers);
        } else {
            alert('No user data available. Please add a user first.');
        }
        
    })
    .catch(error => console.error('Error loading user data:', error));




    document.addEventListener('DOMContentLoaded', () => {
        const userCircle = document.getElementById('userCircle');
        const userName = document.getElementById('userName');
        const moreDetailsLink = document.getElementById('moreDetailsLink');
        const addUserLink = document.getElementById('addUserLink');
        const logoutButton  = document.getElementById('loutbutn');
        // Check local storage for user data
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (user && user.name) {
            // Display user's name and initial
            userCircle.textContent = user.name.charAt(0).toUpperCase();
            userName.textContent = user.name;
            logoutButton.style.display = "block";
            userCircle.style.display = "flex";
            // Show "More Details" and hide "Add User"
            moreDetailsLink.style.visibility = 'visible';
            addUserLink.style.visibility = 'hidden';
        } else {
            // Display login prompt
            userCircle.textContent = '';
            userName.textContent = 'Please login';
            logoutButton.style.display = "none";
            // Show "Add User" and hide "More Details"
            moreDetailsLink.style.visibility = 'hidden';
            addUserLink.style.visibility = 'visible';
            userCircle.style.display = "none";
        }
    });
    
    function logout(){
        window.localStorage.removeItem("user");
        window.location.reload();
    }