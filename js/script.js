class Person {
  constructor(id, name, lastName, age) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}

const addPerson = document.getElementById("Add-Person");
const sortIcon = document.getElementById("sort");
let tbody = document.querySelector("tbody");
let isAscending = true;

let persons = [
  new Person(1, "sobhan", "ziyaei", 28),
  new Person(2, "sama", "ziyaei", 18),
  new Person(3, "ali", "ahmadi", 38),
  new Person(4, "reza", "soltani", 25),
  new Person(5, "ahmad", "mirzaei", 45),
  new Person(6, "sajad", "rostami", 55),
  new Person(7, "zahra", "molaei", 71),
  new Person(8, "fateme", "asgari", 15),
  new Person(9, "nazanin", "moradi", 48),
  new Person(10, "mohsen", "jamali", 41),
];

const sort = () => {
  if (isAscending) {
    persons.sort((a, b) => a.id - b.id);
    console.log(persons);
  } else {
    persons.sort((a, b) => b.id - a.id);
    console.log(persons);
  }

  isAscending = !isAscending;
  tbody.innerHTML = "";
  start();

};

sortIcon.addEventListener("click", sort);

const start = () => {
  for (let person of persons) {
    let row = tbody.insertRow();

    let idCell = row.insertCell(0);
    idCell.textContent = person.id;

    let nameCell = row.insertCell(1);
    nameCell.textContent = person.name;

    let lastNameCell = row.insertCell(2);
    lastNameCell.textContent = person.lastName;

    let ageCell = row.insertCell(3);
    ageCell.textContent = person.age;

    let operationCell = row.insertCell(4);
    operationCell.innerHTML = `<button class="btn btn-warning" data-id=${person.id} onclick="editRow(this)">Edit</button> <button class="btn btn-danger" data-id=${person.id} onclick="deleteRow(this)">Delete</button>`;
  }
};

const deleteRow = (button) => {
  let personId = button.dataset.id;

  let personIndex = persons.findIndex((person) => person.id == personId);
  console.log(personIndex);

  if (personIndex !== -1) {
    persons.splice(personIndex, 1);

    // console.log("Removed person:", persons[personIndex]);
  } else {
    console.log("Person not found");
  }

  console.log(persons);

  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
};

const editRow = (button) => {
  let personId = button.dataset.id;
  let personIndex = persons.findIndex((person) => person.id == personId);

  const person = persons[personIndex];
  console.log(person);
  let tr = tbody.children[person.id - 1];
  let tds = tr.children;

  for (let i = 0; i < tds.length - 1; i++) {
    tds[i].innerHTML = `<input type="text" value="${tds[i].innerText}">`;
  }

  tds[4].innerHTML = `<button class='btn btn-primary' data-id=${person.id} onclick='saveEditRow(${personIndex})'>Save</button>`;
};

const saveEditRow = (index) => {
  let tr = tbody.children[index];
  let tds = tr.children;

  var idInput = tds[0].querySelector("input");
  var nameInput = tds[1].querySelector("input");
  var lastNameInput = tds[2].querySelector("input");
  var ageInput = tds[3].querySelector("input");

  var idValue = Number(idInput.value);
  var nameValue = nameInput.value;
  var lastNameValue = lastNameInput.value;
  var ageValue = Number(ageInput.value);

  persons[index].id = idValue;
  persons[index].name = nameValue;
  persons[index].lastName = lastNameValue;
  persons[index].age = ageValue;

  tds[4].innerHTML = `<button class='btn btn-warning' data-id=${persons[index].id} onclick='editRow(this)'>Edit</button> <button class='btn btn-danger' data-id=${persons[index].id} onclick='deleteRow(this)'>Delete</button>`;
  tbody.innerHTML = "";
  start();
  console.log(persons);
};

const createNewPerson = () => {
  let row = tbody.insertRow();
  let idCell = row.insertCell(0);
  idCell.innerHTML = "<input>";

  let nameCell = row.insertCell(1);
  nameCell.innerHTML = "<input>";

  let lastNameCell = row.insertCell(2);
  lastNameCell.innerHTML = "<input>";

  let ageCell = row.insertCell(3);
  ageCell.innerHTML = "<input>";

  let operationCell = row.insertCell(4);
  operationCell.innerHTML =
    "<button class='btn btn-primary' onclick='saveRow(this)'>Save</button>";
};

const saveRow = (button) => {
  console.dir(button.parentNode.parentNode);
  var row = button.parentNode.parentNode;

  var idInput = row.querySelector("td:nth-child(1) input");
  var nameInput = row.querySelector("td:nth-child(2) input");
  var lastNameInput = row.querySelector("td:nth-child(3) input");
  var ageInput = row.querySelector("td:nth-child(4) input");

  var idValue = idInput.value;
  var nameValue = nameInput.value;
  var lastNameValue = lastNameInput.value;
  var ageValue = ageInput.value;

  //   console.log("ID:", idValue);
  //   console.log("Name:", nameValue);
  //   console.log("Last Name:", lastNameValue);
  //   console.log("Age:", ageValue);

  const newPerson = new Person(idValue, nameValue, lastNameValue, ageValue);
  persons.push(newPerson);

  tbody.innerHTML = "";
  start();
  //   console.log(persons);
};

document.addEventListener("DOMContentLoaded", start);
addPerson.addEventListener("click", createNewPerson);
