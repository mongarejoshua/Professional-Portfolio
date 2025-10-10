function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
<span>${taskText}</span>
<button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">Delete</button>
`;

    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
}