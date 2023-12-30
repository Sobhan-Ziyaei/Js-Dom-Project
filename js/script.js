class Person {
  constructor(id, name, lastName, age) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}

const addPerson = document.getElementById("Add-Person");
let tbody = document.querySelector("tbody");

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

const editRow = () => {};

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
