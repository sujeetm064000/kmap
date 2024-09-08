document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const rfid = document.getElementById('rfid').value;
    const password = document.getElementById('password').value;

    fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rfid, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Save user info to local storage
                localStorage.setItem('user', JSON.stringify({
                    name: data.user_name,
                    rfid: data.rfid
                }));
                alert(data.message);
                window.location.href = 'index.html'; // Redirect to the map page
            } else {
                alert('Invalid RFID or password');
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('joinButton').addEventListener('click', function () {
    window.location.href = 'add-user.html'; // Redirect to the add user page
});

// document.addEventListener('DOMContentLoaded', function () {
//     let userdetails = window.localStorage.getItem("userdetails");
//     if (userdetails == null) {
//         const joinBtn = document.getElementById("joinButton");
//         joinBtn.style.display = "block";
//     }
//     else{
//         joinBtn.style.display = "none";
//     }
// });
