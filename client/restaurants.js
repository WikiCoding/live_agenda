const socket = io();

const nameInput = document.getElementById("add-name");
const locationInput = document.getElementById("add-location");
const descriptionInput = document.getElementById("add-description");
const addBtn = document.getElementById("add-restaurant");
const addForm = document.getElementById("add-form");
const restaurantsContainer = document.getElementById("restaurants-container");

const initData = async () => {
  socket.on("ui-update-restaurants", (data) => {
    renderRestaurants(data);
  });
}

initData();

const renderRestaurants = async (data) => {
  restaurantsContainer.innerHTML = "";

  data.forEach(restaurant => {
    const div = document.createElement("div");
    const containerDiv = document.createElement("div");
    const divider = document.createElement("hr");
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";

    restaurantsContainer.appendChild(div);
    div.appendChild(containerDiv);
    // div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    div.appendChild(divider);

    containerDiv.innerHTML = `
    <div><strong>Restaurant name: </strong><label>${restaurant.name}</label></div>
    <div><strong>Restaurant location: </strong><label>${restaurant.location}</label></div>
    <div><strong>Restaurant descritpion: </strong><label>${restaurant.description}</label></div>
    `;

    deleteBtn.addEventListener("click", async () => {
      socket.emit("delete-restaurant", restaurant._id);
    })
  })

  if (data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = "No data for now, start adding..."

    restaurantsContainer.appendChild(div);
    return;
  }
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const restaurant = {
    name: nameInput.value,
    location: locationInput.value,
    description: descriptionInput.value
  };

  socket.emit("add-restaurant", restaurant, (error) => {
    nameInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";
    if (error) {
      alert("Error");
      return;
    };
  });
})