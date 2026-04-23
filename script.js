let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    // ✅ filter logic
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// ✅ filter function
function filterTasks(type) {
  filter = type;
  renderTasks();
}

// 🔥 important
renderTasks();