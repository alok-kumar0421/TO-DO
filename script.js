const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

window.onload = function() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
};

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const task = {
        text: taskText,
        completed: false,
        time: new Date().toLocaleTimeString() // ✅ अब सिर्फ़ time रहेगा
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        const timeSpan = document.createElement("span");
        timeSpan.textContent = ` (${task.time})`;
        timeSpan.classList.add("time");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(timeSpan); 
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
