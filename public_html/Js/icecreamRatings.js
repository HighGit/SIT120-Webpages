function submitRating() {
    // Get form values
    let name = document.getElementById("nameInput").value.trim();
    let rating = parseInt(document.getElementById("ratingInput").value);

    // Validate name
    if (!name) {
        alert("Please enter your name.");
        return;
    }

    // Validate rating
    if (isNaN(rating) || rating < 0 || rating > 5) {
        alert("Invalid rating! Please enter a number between 0 and 5. Defaulting to 5.");
        rating = 5;
    }

    // Get current date/time
    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    // Build star rating
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += "&#x2605;"; // filled star ★
    }
    for (let i = 0; i < (5 - rating); i++) {
        stars += "&#x2606;"; // unfilled star ☆
    }

    // Build list entry
    let li = document.createElement("li");
    li.innerHTML = `[${date} ${time}] <strong>${name}</strong> gave a rating of ${stars}`;

    // Add to ratings list
    document.getElementById("ratingsList").appendChild(li);

    // Update "last updated" display
    document.getElementById("last-updated-date").textContent = date;
    document.getElementById("last-updated-time").textContent = time;

    // Reset input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("ratingInput").value = "";
}
