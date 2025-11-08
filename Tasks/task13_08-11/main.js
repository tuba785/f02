const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todoList = document.querySelector(".todoList");
const clearAllButton = document.querySelector(".clearAll");
const pendingTasks = document.querySelector(".pendingTasks");

showTasks();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = input.value.trim();
  if (userData) {
    const tasks = JSON.parse(localStorage.getItem("todoList")) || [];
    tasks.push(userData);
    localStorage.setItem("todoList", JSON.stringify(tasks));
    showTasks();
  }
  input.value = "";
});

function showTasks() {
  const tasks = JSON.parse(localStorage.getItem("todoList")) || [];
  todoList.innerHTML = "";

//   tasks.forEach((taskText) => {
//     todoList.innerHTML += `
//       <li class="todoItem">
//         <span class="text">${taskText}</span>
//         <button class="deleteButton">
//           <img src="pics/delete.svg" alt="Delete" class="deleteIcon" />
//         </button>
//       </li>
//     `;
//   });

  tasks.forEach((taskText, index) => {
    const li = document.createElement("li");
    li.classList.add("todoItem");

    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteButton");

    const img = document.createElement("img");
    img.src = "pics/delete.svg";
    img.alt = "Delete";
    img.classList.add("deleteIcon");

    deleteBtn.appendChild(img);

    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  pendingTasks.textContent = tasks.length;
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("todoList")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(tasks));
  showTasks();
}

clearAllButton.addEventListener("click", () => {
  localStorage.removeItem("todoList");
  showTasks();
});
