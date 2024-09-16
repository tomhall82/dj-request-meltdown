document.addEventListener("DOMContentLoaded", function () {
  const requestForm = document.getElementById("requestForm");

  // Handle form submission
  if (requestForm) {
    requestForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const artistName = document.getElementById("artistName").value;
      const songName = document.getElementById("songName").value;
      const userName = document.getElementById("userName").value;
      const userMessage = document.getElementById("userMessage").value;

      // Get the current timestamp
      const timestamp = new Date().toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"

      // Create request object
      const request = {
        artistName,
        songName,
        userName,
        userMessage,
        timestamp, // Include the timestamp in the request object
      };

      // Get existing requests from localStorage or initialize an empty array
      let requests = JSON.parse(localStorage.getItem("songRequests")) || [];

      // Add new request to the array
      requests.push(request);

      // Save updated array back to localStorage
      localStorage.setItem("songRequests", JSON.stringify(requests));

      // Clear the form
      requestForm.reset();
      alert("Request submitted!");
    });
  }

  // Function to display song requests on the requested-songs.html page
  const displayRequests = () => {
    const requestList = document.getElementById("requestList");

    if (requestList) {
      const requests = JSON.parse(localStorage.getItem("songRequests")) || [];

      // Clear the current list before adding updated requests
      requestList.innerHTML = "";

      if (requests.length === 0) {
        requestList.innerHTML =
          "<li class='list-group-item'>No requests yet!</li>";
      } else {
        requests.forEach((request, index) => {
          const li = document.createElement("li");
          li.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between"
          );

          // Display the request details along with the timestamp
          li.innerHTML = `
              <span>${request.songName} by ${request.artistName}. Requested by ${request.userName}: ${request.userMessage}. Submitted on: ${request.timestamp}</span>
              <button class="btn btn-danger btn-sm" onclick="deleteRequest(${index})">Delete</button>
            `;

          requestList.appendChild(li);
        });
      }
    }
  };

  // If we're on the requested-songs.html page, refresh the list every 10 seconds
  if (document.getElementById("requestList")) {
    displayRequests(); // Display immediately on page load

    // Auto-refresh every 10 seconds (10,000 milliseconds)
    setInterval(displayRequests, 10000);
  }

  // Delete request function
  window.deleteRequest = function (index) {
    let requests = JSON.parse(localStorage.getItem("songRequests")) || [];

    // Remove the selected request by index
    requests.splice(index, 1);

    // Save updated array back to localStorage
    localStorage.setItem("songRequests", JSON.stringify(requests));

    // Refresh the list
    displayRequests();
  };
});
