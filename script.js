import { trie } from "./trie.js";
let SearchName = document.querySelector(".SearchNumberName");
let SaveName = document.querySelector(".AddNumberName");
let DeleteName = document.querySelector(".DeleteNumberName");

let SearchNumberValue = document.querySelector(".SearchNumberValue");
let AddNumberValue = document.querySelector(".AddNumberValue");
let DeleteNumberValue = document.querySelector(".DeleteNumberValue");

let callButton = document.querySelector(".callButton");
let saveButton = document.querySelector(".saveButton");
let deleteButton = document.querySelector(".deleteButton");
// Creating contact list
let ContactList = {};
function addContact(ContactList, name, phoneNumber) {
  if (!ContactList[name]) {
    ContactList[name] = [];
  }
  ContactList[name].push(phoneNumber);
}
// generate Random Name
function generateRandomName() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const nameLength = Math.floor(Math.random() * 8) + 3; // Random name length between 3 and 10
  let name = "";

  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    name += alphabet[randomIndex];
  }

  return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
}
// genrate phone number
function generateRandomPhoneNumber() {
  let phoneNumber = "+91 ";
  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}
// Storing 1000 of contactes
for (let i = 0; i < 1000; i++) {
  let name = generateRandomName();
  let phoneNumber = generateRandomPhoneNumber();
  trie.insert(name);
  addContact(ContactList, name, phoneNumber);
}

// Dropdown logic for SearchName
let dropdownContainerSearch = document.createElement("div");
dropdownContainerSearch.classList.add("dropdown-container");
document.querySelector(".SearchNumber").appendChild(dropdownContainerSearch);

SearchName.addEventListener("input", () => {
  let value = SearchName.value;
  dropdownContainerSearch.innerHTML = ""; // Clear previous dropdown

  if (value) {
    let allValues = trie.autocomplete(value);
    allValues.sort();

    if (allValues.length) {
      let dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      allValues.forEach((name) => {
        if (ContactList[name]) {
          ContactList[name].sort(); // Sort the phone numbers for each contact
          ContactList[name].forEach((phoneNumber) => {
            let item = document.createElement("div");
            item.classList.add("dropdown-item");
            item.textContent = `${name} ${phoneNumber}`;
            item.addEventListener("click", () => {
              SearchName.value = name;
              SearchNumberValue.textContent = `${phoneNumber}`; // Update the search number value
              dropdownContainerSearch.innerHTML = ""; // Clear dropdown after selection
            });
            dropdown.appendChild(item);
          });
        }
      });
      dropdownContainerSearch.appendChild(dropdown);
    }
  }
});
// Dropdown logic for DeleteName
let dropdownContainerDelete = document.createElement("div");
dropdownContainerDelete.classList.add("dropdown-container");
document.querySelector(".DeletNumber").appendChild(dropdownContainerDelete);

DeleteName.addEventListener("input", () => {
  let value = DeleteName.value;
  dropdownContainerDelete.innerHTML = "";

  if (value) {
    let allValues = trie.autocomplete(value);
    allValues.sort();

    if (allValues.length) {
      let dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      allValues.forEach((name) => {
        if (ContactList[name]) {
          ContactList[name].sort(); // Sort the phone numbers for each contact
          ContactList[name].forEach((phoneNumber) => {
            let item = document.createElement("div");
            item.classList.add("dropdown-item");
            item.textContent = `${name} ${phoneNumber}`;
            item.addEventListener("click", () => {
              DeleteName.value = name;
              DeleteNumberValue.textContent = `${phoneNumber}`; // Update the delete number value
              dropdownContainerDelete.innerHTML = ""; // Clear dropdown after selection
            });
            dropdown.appendChild(item);
          });
        }
      });
      dropdownContainerDelete.appendChild(dropdown);
    }
  }
});
// Save button
saveButton.addEventListener("click", () => {
  let value = AddNumberValue.value;
  value = "+91 " + value;
  let name = SaveName.value;
  if (value.length === 0 && name.length === 0) {
    alert("Please enter details");
    return;
  }
  if (value.length < 10) {
    alert("Please enter a complete number :) ");
    return;
  }
  if (name.length < 1) {
    alert("Please enter the name");
    return;
  }

  addContact(ContactList, name, value);
  trie.insert(name);
  alert("Contact added successfully.");
  AddNumberValue.value = "";
  SaveName.value = "";
});
// Delete button
deleteButton.addEventListener("click", () => {
  let name = DeleteName.value;
  if (!name || !ContactList[name]) {
    alert("Please enter a valid name to delete.");
    return;
  }

  delete ContactList[name];
  trie.delete(name);

  alert("Contact deleted successfully.");
  DeleteName.value = "";
  DeleteNumberValue.textContent = "+91";
});
// Call button
callButton.addEventListener("click", () => {
  let name = SearchName.value;
  let contact = SearchNumberValue.textContent;
  alert(`Calling ${name} (${contact})`);
  SearchNumberValue.textContent = "+91";
  SearchName.value = "";
});
