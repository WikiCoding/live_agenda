const socket = io();

const nameInput = document.getElementById("add-name");
const locationInput = document.getElementById("add-location");
const descriptionInput = document.getElementById("add-description");
const dateInput = document.getElementById("add-date")
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
    <div><strong>Event name: </strong><label>${event.name}</label></div>
    <div><strong>Event location: </strong><label>${event.location}</label></div>
    <div><strong>Event descritpion: </strong><label>${event.description}</label></div>
    <div><strong>Event date: </strong><label>${event.eventDate}</label></div>
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
    eventDate: dateInput.value
  };

  console.log(event);

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