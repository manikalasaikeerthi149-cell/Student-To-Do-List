const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    document.getElementById("total").innerText = tasks.length;

    const completed = tasks.filter(task => task.completed).length;
    document.getElementById("completed").innerText = completed;
    document.getElementById("pending").innerText = tasks.length - completed;
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = "";

    filteredTasks.forEach((task) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <h3 class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </h3>

                <div class="priority ${task.priority.toLowerCase()}">
                    Priority: ${task.priority}
                </div>

                <small>Due: ${task.date || "No Date"}</small>
            </div>

            <div class="actions">
                <button class="complete" onclick="toggleTask(${task.id})">
                    ✓
                </button>

                <button class="delete" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask() {

    if (taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskInput.value,
        priority: priority.value,
        date: dueDate.value,
        completed: false
    });

    taskInput.value = "";
    dueDate.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(id) {

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function clearTasks() {

    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

function searchTask() {

    const keyword = search.value.toLowerCase();

    const filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    renderTasks(filtered);
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

renderTasks();