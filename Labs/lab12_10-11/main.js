const body = document.body;
const themeToggle = document.querySelector(".themeToggle");
const themeIcon = document.querySelector(".themeIcon");
const searchInput = document.querySelector(".searchInput");
const filterSelect = document.querySelector(".filterSelect");
const addForm = document.querySelector(".addForm");
const firstNameInput = document.querySelector(".firstNameInput");
const lastNameInput = document.querySelector(".lastNameInput");
const groupInput = document.querySelector(".groupInput");
const studentList = document.querySelector(".studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];
let theme = localStorage.getItem("theme") || "light";

setTheme(theme);

function renderStudents(list = students) {
  studentList.innerHTML = "";
  list.forEach((student, index) => {
    const li = document.createElement("li");
    li.classList.add("studentItem");
    li.textContent = `${student.firstName} ${student.lastName} (${student.group})`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("deleteButton");
    delBtn.addEventListener("click", () => {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudents();
    });

    li.appendChild(delBtn);
    studentList.appendChild(li);
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const group = groupInput.value.trim();

  if (firstName && lastName && group) {
    students.push({ firstName, lastName, group });
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
    addForm.reset();
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(query) ||
      s.lastName.toLowerCase().includes(query) ||
      s.group.toLowerCase().includes(query)
  );
  renderStudents(filtered);
});

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  if (value === "none") return;

  if (value) {
    students.sort((a, b) => a[value].localeCompare(b[value]));
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
});

themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  setTheme(theme);
  localStorage.setItem("theme", theme);
});

function setTheme(mode) {
  if (mode === "dark") {
    body.className = "darkTheme";
    themeIcon.src = "pics/light.svg";
  } else {
    body.className = "lightTheme";
    themeIcon.src = "pics/dark.svg";
  }
}

renderStudents();
