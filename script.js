let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet</p>";
  }

  tasks.forEach((task, index) => {

    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <span ondblclick="editTask(${index})" onclick="toggleTask(${index})"
      class="${task.completed ? 'completed' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });

  document.getElementById("taskCount").innerText =
    "Total Tasks: " + tasks.length;
}

// Add
function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false
  });

  saveAndRender();
  input.value = "";
}

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Edit (double click)
function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask;
    saveAndRender();
  }
}

// Clear all
function clearAll() {
  tasks = [];
  saveAndRender();
}

// Filter
function filterTasks(type) {
  filter = type;
  renderTasks();
}

// 🔥 Theme toggle (UPDATED)
function toggleTheme() {
  document.body.classList.toggle("light");

  const btn = document.getElementById("themeBtn");

  if (document.body.classList.contains("light")) {
    btn.innerText = "🌙 Dark";
  } else {
    btn.innerText = "☀️ Light";
  }
}

// Save helper
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Enter key
document.getElementById("taskInput")
.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

renderTasks();