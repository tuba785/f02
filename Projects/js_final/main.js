const body = document.body;
const themeButton = document.querySelector(".theme_button");
const themeIcon = document.querySelector(".theme_button_icon");

let currentTheme = localStorage.getItem("theme") || "light";

function setTheme(mode) {
  if (mode === "dark") {
    body.classList.remove("theme_light");
    body.classList.add("theme_dark");
    themeIcon.src = "photos/light.svg";
  } else {
    body.classList.remove("theme_dark");
    body.classList.add("theme_light");
    themeIcon.src = "photos/dark.svg";
  }
}

setTheme(currentTheme);

themeButton.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
});

const addInput = document.querySelector(".section_add_input");
const addSelect = document.querySelector(".section_add_select");
const addButton = document.querySelector(".section_add_button");

const listElement = document.querySelector(".section_listbox_ul");
const emptyElement = document.querySelector(".section_listbox_empty");

const totalSpan = document.querySelector(".section_info_box_value_black");
const activeSpan = document.querySelector(".section_info_box_value_blue");
const completedSpan = document.querySelector(".section_info_box_value_green");

const searchInput = document.querySelector(".section_filter_input");
const filterAllButton = document.querySelector(".section_filter_button_all");
const filterActiveButton = document.querySelector(
  ".section_filter_button_active"
);
const filterCompletedButton = document.querySelector(
  ".section_filter_button_completed"
);

const toastElement = document.querySelector(".section_toast");
const toastTextElement = document.querySelector(".section_toast_text");
const toastCloseButton = document.querySelector(".section_toast_close");

let toastTimeout = null;

let searchValue = "";
let statusFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map((t) => ({
  text: t.text,
  priority: t.priority || "medium",
  completed: !!t.completed,
}));

function showToast(message) {
  toastTextElement.textContent = message;
  toastElement.classList.add("section_toast--visible");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    hideToast();
  }, 2500);
}

function hideToast() {
  toastElement.classList.remove("section_toast--visible");
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }
}

toastCloseButton.addEventListener("click", () => {
  hideToast();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  totalSpan.textContent = total;
  activeSpan.textContent = active;
  completedSpan.textContent = completed;
}

function getFilteredTasks() {
  const value = searchValue.trim().toLowerCase();

  const result = [];
  tasks.forEach((task, index) => {
    if (value && !task.text.toLowerCase().includes(value)) return;

    if (statusFilter === "active" && task.completed) return;
    if (statusFilter === "completed" && !task.completed) return;

    result.push({ task, index });
  });

  return result;
}

function renderTasks() {
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    listElement.style.display = "none";
    emptyElement.style.display = "block";
    listElement.innerHTML = "";
    updateCounters();
    return;
  }

  emptyElement.style.display = "none";
  listElement.style.display = "block";

  let html = "";

  filtered.forEach(({ task, index }) => {
    const checkedAttr = task.completed ? "checked" : "";
    const completedClass = task.completed
      ? " section_listbox_text_completed"
      : "";

    let priorityClass = "";
    let priorityText = "";

    if (task.priority === "high") {
      priorityClass = "section_listbox_priority_high";
      priorityText = "High";
    } else if (task.priority === "medium") {
      priorityClass = "section_listbox_priority_medium";
      priorityText = "Medium";
    } else {
      priorityClass = "section_listbox_priority_low";
      priorityText = "Low";
    }

    html += `
      <li class="section_listbox_item" data-index="${index}">
        <div class="section_listbox_item_left">
          <input type="checkbox" class="section_listbox_checkbox" ${checkedAttr}>
          <span class="section_listbox_text${completedClass}">${task.text}</span>
        </div>

        <div class="section_listbox_item_right">
          <span class="section_listbox_priority ${priorityClass}">${priorityText}</span>

          <button type="button" class="section_listbox_button section_listbox_button_edit">
            <img src="photos/edit.svg" alt="">
          </button>

          <button type="button" class="section_listbox_button section_listbox_button_delete">
            <img src="photos/delete.svg" alt="">
          </button>
        </div>
      </li>
    `;
  });

  listElement.innerHTML = html;

  attachTaskEvents();
  updateCounters();
}

function attachTaskEvents() {
  const items = listElement.querySelectorAll(".section_listbox_item");

  items.forEach((item) => {
    const index = Number(item.dataset.index);
    const checkbox = item.querySelector(".section_listbox_checkbox");
    const editBtn = item.querySelector(".section_listbox_button_edit");
    const deleteBtn = item.querySelector(".section_listbox_button_delete");

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
      showToast(
        checkbox.checked ? "Task marked as completed" : "Task marked as active"
      );
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      showToast("Task deleted");
    });

    editBtn.addEventListener("click", () => {
      const isEditing = item.classList.contains("editing");

      if (!isEditing) {
        const span = item.querySelector(".section_listbox_text");
        const input = document.createElement("input");
        input.type = "text";
        input.className = "section_listbox_edit_input";
        input.value = tasks[index].text;

        item.classList.add("editing");
        span.replaceWith(input);

        input.focus();
        const len = input.value.length;
        input.setSelectionRange(len, len);

        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            finishEdit(item, index, input);
          }
        });
      } else {
        const input = item.querySelector(".section_listbox_edit_input");
        if (!input) return;
        finishEdit(item, index, input);
      }
    });
  });
}

function finishEdit(item, index, input) {
  const newText = input.value.trim();
  if (!newText) return;

  tasks[index].text = newText;
  saveTasks();
  renderTasks();
  showToast("Task updated");
}

function addTask() {
  const text = addInput.value.trim();
  const priority = addSelect.value || "medium";

  if (!text) return;

  tasks.push({
    text,
    priority,
    completed: false,
  });

  saveTasks();
  renderTasks();
  addInput.value = "";
  showToast("Task created");
}

addButton.addEventListener("click", () => {
  addTask();
});

addInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

searchInput.addEventListener("input", () => {
  searchValue = searchInput.value.toLowerCase();
  renderTasks();
});

function setFilterButtonActive(button) {
  [filterAllButton, filterActiveButton, filterCompletedButton].forEach((btn) =>
    btn.classList.remove("section_filter_button--active")
  );
  button.classList.add("section_filter_button--active");
}

filterAllButton.addEventListener("click", (e) => {
  e.preventDefault();
  statusFilter = "all";
  setFilterButtonActive(filterAllButton);
  renderTasks();
});

filterActiveButton.addEventListener("click", (e) => {
  e.preventDefault();
  statusFilter = "active";
  setFilterButtonActive(filterActiveButton);
  renderTasks();
});

filterCompletedButton.addEventListener("click", (e) => {
  e.preventDefault();
  statusFilter = "completed";
  setFilterButtonActive(filterCompletedButton);
  renderTasks();
});

setFilterButtonActive(filterAllButton);
renderTasks();
