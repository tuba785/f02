function Employee(id, name, age, position, experience, skills, startDate) {
  this.id = id;
  this.name = name;
  this.age = age;
  this.position = position;
  this.experience = experience;
  this.skills = skills;
  this.startDate = startDate;
}

let employees = [];
let editId = null;

const form = document.getElementById("employeeForm");
const tableBody = document.querySelector("#employeeTable tbody");

function validateForm(name, age, position, experience, skills, startDate) {
  if (!/^[A-Za-z\s]{3,50}$/.test(name)) {
    alert("Name and surname must contain only letters (3-50 chars)");
    return false;
  }
  if (age < 18 || age > 65) {
    alert("Age must be between 18 and 65");
    return false;
  }
  if (position.length < 2 || position.length > 30) {
    alert("Position must be 2-30 characters");
    return false;
  }
  if (experience < 0 || experience > age - 18) {
    alert("Experience must be less than or equal to (Age - 18)");
    return false;
  }
  if (!skills) {
    alert("Please select at least one skill");
    return false;
  }
  if (new Date(startDate) >= new Date()) {
    alert("Start date must be in the past.");
    return;
  }
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const position = document.getElementById("position").value.trim();
  const experience = parseInt(document.getElementById("experience").value);
  const skills = document.getElementById("skills").value;
  const startDate = document.getElementById("startDate").value;

  if (!validateForm(name, age, position, experience, skills, startDate)) return;

  const newEmployee = new Employee(
    Date.now(),
    name,
    age,
    position,
    experience,
    skills,
    startDate
  );
  employees.push(newEmployee);
  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.position}</td>
      <td>${emp.experience}</td>
      <td>${emp.skills}</td>
      <td>${emp.startDate.split("-").reverse().join(".")}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editEmployee(${
          emp.id
        })">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteEmployee(${
          emp.id
        })">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  renderTable();
}

const modal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModal");

function editEmployee(id) {
  const emp = employees.find((e) => e.id === id);
  if (!emp) return;

  editId = id;
  document.getElementById("editName").value = emp.name;
  document.getElementById("editAge").value = emp.age;
  document.getElementById("editPosition").value = emp.position;
  document.getElementById("editExperience").value = emp.experience;
  document.getElementById("editSkills").value = emp.skills;
  document.getElementById("editStartDate").value = emp.startDate;

  modal.style.display = "flex";
}

closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));

document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("editName").value.trim();
  const age = parseInt(document.getElementById("editAge").value);
  const position = document.getElementById("editPosition").value.trim();
  const experience = parseInt(document.getElementById("editExperience").value);
  const skills = document.getElementById("editSkills").value;
  const startDate = document.getElementById("editStartDate").value;

  if (!validateForm(name, age, position, experience, skills, startDate)) return;

  const emp = employees.find((e) => e.id === editId);
  if (emp) {
    emp.name = name;
    emp.age = age;
    emp.position = position;
    emp.experience = experience;
    emp.skills = skills;
    emp.startDate = startDate;
  }

  renderTable();
  modal.style.display = "none";
});
