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

document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const position = document.getElementById("position").value.trim();
    const experience = parseInt(document.getElementById("experience").value);
    const skills = document.getElementById("skills").value;
    const startDate = document.getElementById("startDate").value;

    if (!/^[A-Za-z\s]{3,50}$/.test(name)) {
      alert("Name must contain only letters (3–50 chars).");
      return;
    }
    if (isNaN(age) || age < 18 || age > 65) {
      alert("Age must be between 18 and 65.");
      return;
    }
    if (position.length < 2 || position.length > 30) {
      alert("Position must be 2–30 characters.");
      return;
    }
    if (experience < 0 || experience > age - 18) {
      alert("Experience is not valid for this age.");
      return;
    }
    if (!skills) {
      alert("Please select at least one skill.");
      return;
    }
    if (new Date(startDate) >= new Date()) {
      alert("Start date must be in the past.");
      return;
    }

    const id = Date.now();
    const employee = new Employee(
      id,
      name,
      age,
      position,
      experience,
      skills,
      startDate
    );
    employees.push(employee);
    renderTable();
    this.reset();
  });

function renderTable() {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.position}</td>
      <td>${emp.experience}</td>
      <td>${emp.skills}</td>
      <td>${emp.startDate}</td>
      <td>
        <button class="edit-btn" onclick="openEdit(${emp.id})">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${
          emp.id
        })">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  renderTable();
}

function openEdit(id) {
  const modal = document.getElementById("editModal");
  modal.style.display = "block";
  const emp = employees.find((e) => e.id === id);
  editId = id;

  document.getElementById("editName").value = emp.name;
  document.getElementById("editAge").value = emp.age;
  document.getElementById("editPosition").value = emp.position;
  document.getElementById("editExperience").value = emp.experience;
  document.getElementById("editSkills").value = emp.skills;
  document.getElementById("editStartDate").value = emp.startDate;
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("editName").value.trim();
  const age = parseInt(document.getElementById("editAge").value);
  const position = document.getElementById("editPosition").value.trim();
  const experience = parseInt(document.getElementById("editExperience").value);
  const skills = document.getElementById("editSkills").value;
  const startDate = document.getElementById("editStartDate").value;

  if (!/^[A-Za-z\s]{3,50}$/.test(name)) {
    alert("Name must contain only letters (3–50 chars).");
    return;
  }
  if (isNaN(age) || age < 18 || age > 65) {
    alert("Age must be between 18 and 65.");
    return;
  }
  if (position.length < 2 || position.length > 30) {
    alert("Position must be 2–30 characters.");
    return;
  }
  if (experience < 0 || experience > age - 18) {
    alert("Experience is not valid for this age.");
    return;
  }
  if (new Date(startDate) >= new Date()) {
    alert("Start date must be in the past.");
    return;
  }

  const emp = employees.find((e) => e.id === editId);
  emp.name = name;
  emp.age = age;
  emp.position = position;
  emp.experience = experience;
  emp.skills = skills;
  emp.startDate = startDate;

  document.getElementById("editModal").style.display = "none";
  renderTable();
});
