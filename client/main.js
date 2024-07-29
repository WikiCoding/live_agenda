const socket = io();

const BASE_URL = "http://localhost:5000";

const descriptionInput = document.getElementById("task-text");
const addBtn = document.getElementById("add-task");
const addForm = document.getElementById("add-form");
const tasksContainer = document.getElementById("tasks-container");

const initData = async () => {
  const req = await fetch(`${BASE_URL}/tasks`, {
    method: "GET"
  });

  const data = await req.json();

  renderTasks(data);
}

initData();

socket.on("ui-update", (data) => {
  descriptionInput.value = "";
  if (data === null) return;
  renderTasks(data);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = descriptionInput.value;

  socket.emit("add-task", task, (error) => {
    descriptionInput.value = "";
    if (error) {
      alert("Error");
      return;
    }

    console.log("SENT")
  });
})

const renderTasks = async (data) => {
  tasksContainer.innerHTML = "";

  data.forEach(task => {
    console.log(task);
    const div = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";

    const label = document.createElement("label");
    // const checkbox = document.createElement("input");
    // checkbox.setAttribute("type", "checkbox")

    tasksContainer.appendChild(div);
    // div.appendChild(checkbox);
    div.appendChild(label);
    // div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    label.innerHTML = task.description;

    // checkbox.addEventListener("click", () => {
    //   console.log("clicked")
    // })

    deleteBtn.addEventListener("click", async () => {
      socket.emit("deleted-task", task._id);
    })
  })

  if (data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = "No data for now, start adding..."

    tasksContainer.appendChild(div);
    return;
  }
}