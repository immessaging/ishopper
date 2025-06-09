let autocomplete;
let inputField = document.getElementById('search');
let suggestionsBox = document.getElementById('suggestions');

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(inputField, {
        types: ['geocode'],
    });

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'");
        return;
    }
    // Place details (e.g., lat, lng, address) can be used here
    console.log(place.geometry.location.lat(), place.geometry.location.lng());
}

function handleSearch() {
    const query = inputField.value;

    // Call Places API to get location suggestions based on query
    if (query.length > 2) {
        let service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: query }, displaySuggestions);
    } else {
        suggestionsBox.style.display = 'none'; // Hide dropdown when query is too short
    }
}

function displaySuggestions(predictions, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
        return;
    }

    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    predictions.forEach(prediction => {
        const div = document.createElement('div');
        div.textContent = prediction.description;
        div.onclick = () => selectSuggestion(prediction.description);
        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = 'block'; // Show dropdown
}

function selectSuggestion(description) {
    inputField.value = description;
    suggestionsBox.style.display = 'none'; // Hide dropdown after selection
}

window.onload = initAutocomplete;
// Sample data for achievers
const achievers = [
    {
        name: "John Doe",
        exam: "WAEC",
        profile: "profile1.html",
        achievements: "Top scorer in WAEC 2024.",
        image: "profile1.jpg"
    },
    {
        name: "Jane Smith",
        exam: "JAMB",
        profile: "profile2.html",
        achievements: "Achieved a score of 320 in JAMB.",
        image: "profile2.jpg"
    },
    {
        name: "Emily Johnson",
        exam: "IGCSE",
        profile: "profile3.html",
        achievements: "Best in Science in IGCSE.",
        image: "profile3.jpg"
    },
    // Add more achievers as needed
];

function displayAchievers(filter) {
    const achieversList = document.getElementById("achievers-list");
    achieversList.innerHTML = ""; // Clear existing entries

    achievers.forEach(achiever => {
        if (filter === "all" || achiever.exam.toLowerCase() === filter) {
            const div = document.createElement("div");
            div.classList.add("achiever");
            div.innerHTML = `
                <img src="${achiever.image}" alt="${achiever.name}">
                <h3>${achiever.name}</h3>
                <p>${achiever.achievements}</p>
                <a href="${achiever.profile}">View Profile</a>
            `;
            achieversList.appendChild(div);
        }
    });
}

// Event listener for the filter
document.getElementById("exam-filter").addEventListener("change", (event) => {
    displayAchievers(event.target.value);
});

// Image slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Search functionality
const campuses = ["Main Campus", "North Campus", "South Campus"]; // Example campuses

document.getElementById("search").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = ""; // Clear previous suggestions

    if (query) {
        const filteredCampuses = campuses.filter(campus => campus.toLowerCase().includes(query));
        filteredCampuses.forEach(campus => {
            const li = document.createElement("li");
            li.textContent = campus;
            li.classList.add("suggestion-item");
            li.onclick = function() {
                document.getElementById("search").value = campus;
                suggestions.innerHTML = ""; // Clear suggestions
                suggestions.style.display = "none"; // Hide suggestions
            };
            suggestions.appendChild(li);
        });
        suggestions.style.display = filteredCampuses.length ? "block" : "none"; // Show suggestions
    } else {
        suggestions.style.display = "none"; // Hide suggestions
    }
});


document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        // Save token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        // Fetch achievers or other data here
    } else {
        alert(data);
    }
});

// Function to fetch achievers
async function fetchAchievers() {
    const response = await fetch('/achievers');
    const achievers = await response.json();
    const achieversList = document.getElementById('achievers-list');
    achieversList.innerHTML = '';
    achievers.forEach(achiever => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${achiever.name}</h3><p>${achiever.achievements}</p>`;
        achieversList.appendChild(div);
    });
}

// Fetch achievers on load
window.onload = fetchAchievers;