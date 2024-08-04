const socket = io();

const nameInput = document.getElementById("add-name");
const locationInput = document.getElementById("add-location");
const descriptionInput = document.getElementById("add-description");
const dateInput = document.getElementById("add-date");
const endDateInput = document.getElementById("end-date");
const addBtn = document.getElementById("add-event");
const addForm = document.getElementById("add-form");
const eventsContainer = document.getElementById("events-container");

const initData = async () => {
  socket.on("ui-update-events", (data) => {
    renderEvents(data);
  });
}

initData();

const renderEvents = async (data) => {
  eventsContainer.innerHTML = "";

  data.forEach(event => {
    const div = document.createElement("div");
    const containerDiv = document.createElement("div");
    const divider = document.createElement("hr");
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";

    eventsContainer.appendChild(div);
    div.appendChild(containerDiv);
    // div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    div.appendChild(divider);

    containerDiv.innerHTML = `
    <div><i class="fas fa-calendar-day"></i> <label>${event.name}</label></div>
    <div><i class="fas fa-map-marker-alt"></i> <label>${event.location}</label></div>
    <div><i class="fas fa-info-circle"></i> <label>${event.description}</label></div>
    <div><i class="fas fa-calendar-alt"></i> <label>${event.eventDate.split("T")[0]}</label></div>
    <div><i class="fas fa-calendar-alt"></i> <label>${event.eventEndDate.split("T")[0]}</label></div>
    `;

    deleteBtn.addEventListener("click", async () => {
      socket.emit("delete-event", event._id);
    })
  })

  if (data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = "No data for now, start adding..."

    eventsContainer.appendChild(div);
    return;
  }
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const event = {
    name: nameInput.value,
    location: locationInput.value,
    description: descriptionInput.value,
    eventDate: dateInput.value,
    eventEndDate: endDateInput.value
  };

  socket.emit("add-event", event, (error) => {
    nameInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";

    if (error) {
      alert("Error");
      return;
    };
  });
})