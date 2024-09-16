document.addEventListener("DOMContentLoaded", function () {
  const requestForm = document.getElementById("requestForm");

  if (requestForm) {
    requestForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const artistName = document.getElementById("artistName").value;
      const songName = document.getElementById("songName").value;
      const userName = document.getElementById("userName").value;
      const userMessage = document.getElementById("userMessage").value;
      const timestamp = new Date().toLocaleString();

      const request = {
        artistName,
        songName,
        userName,
        userMessage,
        timestamp,
      };

      try {
        await fetch("http://localhost:3000/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        requestForm.reset();
        alert("Request submitted!");
      } catch (error) {
        console.error("Error submitting request:", error);
      }
    });
  }

  const displayRequests = async () => {
    const requestList = document.getElementById("requestList");

    if (requestList) {
      try {
        const response = await fetch("http://localhost:3000/requests");
        const requests = await response.json();

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

            li.innerHTML = `
                <span>${request.songName} by ${request.artistName}. Requested by ${request.userName}: ${request.userMessage}. Submitted on: ${request.timestamp}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteRequest(${index})">Delete</button>
              `;

            requestList.appendChild(li);
          });

          const deleteAllButton = document.getElementById("deleteAllButton");
          deleteAllButton.addEventListener("click", deleteAllRequests);

          requestList.parentElement.appendChild(deleteAllButton);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    }
  };

  if (document.getElementById("requestList")) {
    displayRequests();
    setInterval(displayRequests, 10000);
  }

  window.deleteRequest = async function (index) {
    try {
      await fetch(`http://localhost:3000/requests/${index}`, {
        method: "DELETE",
      });

      displayRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  async function deleteAllRequests() {
    if (confirm("Are you sure you want to delete all requests?")) {
      try {
        await fetch("http://localhost:3000/requests", {
          method: "DELETE",
        });

        displayRequests();
      } catch (error) {
        console.error("Error deleting all requests:", error);
      }
    }
  }
});
