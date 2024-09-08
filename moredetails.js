document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const rfid = user ? user.rfid : null;

    if (!rfid) {
        alert('User not logged in');
        return;
    }

    // Fetch and display user details
    fetch(`${API_URL}/api/details/${rfid}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.localStorage.setItem("userdetails", JSON.stringify(data.details));
                // Display user card
                document.getElementById('userCard').style.display = 'flex';
                document.getElementById('formContainer').style.display = 'none';
                document.getElementById('addNewDetails').style.display = 'block';

                 // Populate levels color
                 var colors = [
                    { r: 255, g: 0, b: 0 },
                    { r: 255, g: 102, b: 0 },
                    { r: 255, g: 255, b: 0 },
                    { r: 0, g: 255, b: 0 },
                    { r: 0, g: 204, b: 255 },
                    { r: 0, g: 0, b: 128 },
                    { r: 255, g: 0, b: 255 }
                ];

                var colorRange = [];
                for (let i = 0; i <= 21; i++) {
                    if (i >= 1 && i <= 3) {
                        var max = Math.max(Math.max(colors[0].r, Math.max(colors[0].g, colors[0].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[0].r * step * (i / 1)}, ${colors[0].g * step * (i / 2)}, ${colors[0].b * step * (i / 3)})`);
                    } else if (i >= 4 && i <= 6) {
                        var max = Math.max(Math.max(colors[1].r, Math.max(colors[1].g, colors[1].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[1].r * step * (i / 1)}, ${colors[1].g * step * (i / 2)}, ${colors[1].b * step * (i / 3)})`);
                    } else if (i >= 7 && i <= 9) {
                        var max = Math.max(Math.max(colors[2].r, Math.max(colors[2].g, colors[2].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[2].r * step * (i / 1)}, ${colors[2].g * step * (i / 2)}, ${colors[2].b * step * (i / 3)})`);
                    } else if (i >= 10 && i <= 12) {
                        var max = Math.max(Math.max(colors[3].r, Math.max(colors[3].g, colors[3].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[3].r * step * (i / 1)}, ${colors[3].g * step * (i / 2)}, ${colors[3].b * step * (i / 3)})`);
                    } else if (i >= 13 && i <= 15) {
                        var max = Math.max(Math.max(colors[4].r, Math.max(colors[4].g, colors[4].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[4].r * step * (i / 1)}, ${colors[4].g * step * (i / 2)}, ${colors[4].b * step * (i / 3)})`);
                    } else if (i >= 16 && i <= 18) {
                        var max = Math.max(Math.max(colors[5].r, Math.max(colors[5].g, colors[5].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[5].r * step * (i / 1)}, ${colors[5].g * step * (i / 2)}, ${colors[5].b * step * (i / 3)})`);
                    } else if (i >= 19 && i <= 21) {
                        var max = Math.max(Math.max(colors[6].r, Math.max(colors[6].g, colors[6].b)), 1);
                        var step = 255 / (max * 10);
                        colorRange.push(`rgb(${colors[6].r * step * (i / 1)}, ${colors[6].g * step * (i / 2)}, ${colors[6].b * step * (i / 3)})`);
                    }
                    else{
                        colorRange.push('rgb(217, 255, 0)');
                    }
                }


                for(let i=0;i<data.details.length;i++){
                    let cardMain = document.getElementById("userCard");
                    cardMain.innerHTML = cardMain.innerHTML + 
                    `<div class="card card-content" style="background-color:${colorRange[i]}" id="cardMain">
                    <div>
                    <img id="cardProfileImage" src=${data.details[i].image} alt="Profile Image">
                    </div>
                    <div>
                    <p><strong>Level:</strong> <span id="cardLevel">${data.details[i].level}</span></p>
                    <p><strong>Experience:</strong> <span id="cardExperience">${data.details[i].experience}</span></p>
                    <p><strong>Bio:</strong> <span id="cardBio">${data.details[i].bio}</span></p>
                    <p><strong>Completion Date:</strong> <span id="cardCompletionDate">${data.details[i].completiondate}</span></p>
                    <p><strong>Public View:</strong> ${data.details[i].completiondate ? '<span id="cardPublicView"><i class="fa-regular fa-eye"></i></span></p>': '<span id="cardPublicView"><i class="fa-regular fa-eye-slash"></i></span></p>'}</div><button class="edit-button buttonCss" onclick="editDetails(${data.details[i].level})">Edit</button></div>`;                    
                }
                

                if (!data.image) {
                    document.getElementById('noImageText').style.visibility = 'visible';
                } else {
                    document.getElementById('noImageText').style.visibility = 'hidden';
                }

                // Populate the level select
                var levelSelect = document.getElementById("level");

                for (let i = 0; i <= 21; i++) {
                    let option = document.createElement("option");
                    option.text = i === 0 ? `${i} - मंत्र दीक्षा` : i;
                    option.value = i;
                    option.style.backgroundColor = colorRange[i];
                    levelSelect.add(option);
                }
            } else {
                window.localStorage.removeItem("userdetails");
                alert('Failed to fetch user details:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('detailsForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('level', document.getElementById('level').value);
        formData.append('experience', document.getElementById('experience').value);
        formData.append('bio', document.getElementById('bio').value);
        formData.append('completiondate', document.getElementById('completionDate').value);
        formData.append('public', document.getElementById('publicView').checked); // Use `checked`
        formData.append('image', document.getElementById('image').files[0]);

        const mode = document.getElementById("mode").value;
        if (mode == "edit") {
            fetch(`${API_URL}/api/updatedetails/${rfid}`, {
                method: 'PUT',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Details updated successfully!');
                        document.getElementById('formContainer').style.display = 'none';
                        document.getElementById('userCard').style.display = 'flex';
                        document.getElementById('addNewDetails').style.display = 'block';
                    } else {
                        alert('Failed to update details.');
                    }
                })
                .catch(error => {
                    console.error('Error updating details:', error);
                    alert('Error updating details.');
                });
        }
        else {
            fetch(`${API_URL}/api/details`, {
                method: 'POST',
                headers: {
                    'RFID': rfid
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Details saved successfully!');
                        // Optionally, hide form and show card again
                        document.getElementById('formContainer').style.display = 'none';
                        document.getElementById('userCard').style.display = 'flex';
                        document.getElementById('addNewDetails').style.display = 'block';
                    } else {
                        alert('Failed to save details');
                    }
                })
                .catch(error => console.error('Error:', error));
        }

    });

    // Display user information in the sidebar
    const userCircle = document.getElementById('userCircle');
    const userName = document.getElementById('userName');

    if (user && user.name) {
        userCircle.textContent = user.name.charAt(0).toUpperCase();
        userName.textContent = user.name;
    } else {
        userCircle.textContent = '';
        userName.textContent = 'Please login';
    }
});

// Populate form with user data for editing
function editDetails(data) {
    document.getElementById('mode').value = "edit";
    const userDetails = JSON.parse(window.localStorage.getItem("userdetails")).find(d=> d.level == data)

    const profileImage = userDetails.image;
    document.getElementById('userCard').style.display = 'none';
    document.getElementById('formContainer').style.display = 'flex';
    document.getElementById('addNewDetails').style.display = 'none';

    document.getElementById('level').value = userDetails.level;
    document.getElementById('experience').textContent = userDetails.experience;
    document.getElementById('bio').value = userDetails.bio;
    document.getElementById('completionDate').value = userDetails.completiondate;
    document.getElementById('profileImage').src = userDetails.image;
    document.getElementById('publicView').checked = userDetails.public;

    if (!profileImage) {
        document.getElementById('profileImage').style.visibility = 'hidden';
        document.getElementById('noImageText').style.visibility = 'visible';
    } else {
        document.getElementById('profileImage').style.visibility = 'visible';
        document.getElementById('noImageText').style.visibility = 'hidden';
    }
}

// Populate form with user data for editing
function addNewDetails() {
    document.getElementById('mode').value = "create";

    document.getElementById('userCard').style.display = 'none';
    document.getElementById('formContainer').style.display = 'flex';
    document.getElementById('addNewDetails').style.display = 'none';

    document.getElementById('level').value = "";
    document.getElementById('experience').textContent = "";
    document.getElementById('bio').value = "";
    document.getElementById('completionDate').value = "";
    document.getElementById('profileImage').src = "";
    document.getElementById('publicView').checked = false;
    document.getElementById('profileImage').style.visibility = 'hidden';
    document.getElementById('noImageText').style.visibility = 'visible';
}

document.getElementById('image').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();

        // Once the file is read, set it as the src of the img tag
        reader.onload = function (e) {
            const imgPreview = document.getElementById('profileImage');
            const noImageText = document.getElementById('noImageText');
            imgPreview.src = e.target.result; // Set the result (image URL) as the src
            imgPreview.style.visibility = 'visible'; // Show the image tag
            noImageText.style.visibility = 'hidden';
        };

        reader.readAsDataURL(file); // Read the file as a data URL (base64-encoded image)
    }
});
