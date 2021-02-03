// --- objects part ---
let myCatches = [];

//constructor function for new Fish objects
function Fish(species, size, bait, location, method, gerDate, date, notes) {
  this.species = species
  this.size = size
  this.bait = bait
  this.location = location
  this.method = method
  this.gerDate = gerDate
  this.index = myCatches.length
  this.date = date
  this.notes = notes
}

//info about the Fish
Fish.prototype.info = function() {
  let infoArr = [];
  infoArr.push(this.species, this.size, this.bait, this.location, this.method, this.date);
  return infoArr.join(", ");
}

function addFishToCatches(sp, s, b, l, m, gd, d, n) {
  let newFish = new Fish(sp, s, b, l, m, gd, d, n);
  myCatches.push(newFish);
  return newFish;
}

function editFish(species, size, bait, location, method, gerDate, date, notes, index) {
  let fish = myCatches[index];
  fish.species = species;
  fish.size = size;
  fish.bait = bait;
  fish.location = location;
  fish.method = method;
  fish.gerDate = gerDate;
  fish.date = date;
  fish.notes = notes;
}
// --- end of objects part

const grid = document.querySelector("#grid");
const body = document.querySelector("body");
const addFishButton = document.querySelector("#addFish");
const closeModalButton = document.querySelector("#closeButton");
const overlay = document.querySelector("#overlay");

//initial grid
if (myCatches.length < 1) {
  window.onload = adjustGrid(4, 1);
} else {
  window.onload = adjustGrid(myCatches.length + 1, 3);
  displayCatches();
}

//adjust values of css variables
function adjustGrid(columns, rows) {
  grid.style.setProperty("--columns", columns);
  grid.style.setProperty("--rows", rows);
}

/* MODAL PART */
//open form for user input
addFishButton.addEventListener(("click"), () => {
  const modal = document.querySelector("#modal");
  openModal(modal);
  let submitBtn = document.querySelector("#submit");
  submitBtn.classList.add("new");
})

overlay.addEventListener(("click"), () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach(modal => {
    closeModal(modal);
  })
})

closeModalButton.addEventListener(("click"), () => {
  const modal = closeModalButton.closest(".modal");
  closeModal(modal);
})

function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  clearModal();
}

function clearModal() {
  let modalTitle = document.querySelector(".modal-title");
  let species = document.querySelector("#fish_species");
  let size = document.querySelector("#fish_size");
  let bait = document.querySelector("#fish_bait");
  let method = document.querySelector("#fish_method");
  let location = document.querySelector("#fish_location");
  let date = document.querySelector("#fish_date");
  let notes = document.querySelector("#fish_notes");
  let submitBtn = document.querySelector("#submit");

  species.value = "";
  size.value = "";
  bait.value = "";
  method.value = "";
  location.value = "";
  date.value = "";
  notes.value = "";
  modalTitle.textContent = "Fang hinzufügen";
  if (submitBtn.className != "") submitBtn.classList.remove(submitBtn.className);
}
/* END OF MODAL PART */

//      TEST
let testOne = addFishToCatches("Bachforelle", "35cm", "Trockenfliege", "Mangfall", "Fliegenfischen", "16.04.2020", "2020-04-16", "Bafo");
let testTwo = addFishToCatches("Döbel", "50cm", "Nymphe", "Inn", "Fliegenfischen", "22.06.2020", "2020-06-22", "Aitel");
let testThree = addFishToCatches("Hecht", "82cm", "Gummifisch", "Tegernsee", "Schleppfischen", "15.10.2020", "2020-10-15", "Esox");
//      END OF TEST

//display myCatches items on page
function displayCatches(item) {

  //create new tile
  let newTile = document.createElement("div");
  newTile.classList.add("fish", "action");
  newTile.id = item.index;

  //create edit and remove button
  let edRe = document.createElement("div");
  edRe.className = "edRe";

  let edit = document.createElement("p");
  edit.className = "edit";
  edit.textContent = "Bearbeiten";
  edRe.appendChild(edit);
  addEditEvent(edit);

  let remove = document.createElement("p");
  remove.className = "remove";
  remove.textContent = "Entfernen";
  edRe.appendChild(remove);
  addRemoveEvent(remove);

  //create content-body -> species, size
  let specSize = document.createElement("div");
  specSize.className = "specSize";

  let species = document.createElement("p");
  species.className = "species";
  species.textContent = item.species;
  specSize.appendChild(species);

  let size = document.createElement("p");
  size.className = "size";
  size.textContent = item.size;
  specSize.appendChild(size);

  //create info row -> bait, method
  let baitMet = document.createElement("div");
  baitMet.className = "baitMet";

  let bait = document.createElement("p");
  bait.className = "bait";
  bait.textContent = item.bait;
  baitMet.appendChild(bait);

  let method = document.createElement("p");
  method.className = "method";
  method.textContent = item.method;
  baitMet.appendChild(method);

  //create info row -> location
  let location = document.createElement("p");
  location.className = "location";
  location.textContent = item.location;

  //create info row -> catch date
  let date = document.createElement("p");
  date.className = "date";
  date.textContent = item.gerDate;

  newTile.appendChild(edRe);
  newTile.appendChild(specSize);
  newTile.appendChild(baitMet);
  newTile.appendChild(location);
  newTile.appendChild(date);
  grid.insertBefore(newTile, addFishButton);
}

function editTile(tileID) {
  let tile = document.getElementById(tileID);
  let tileChildren = tile.childNodes;
 
  let species = tileChildren[1].childNodes[0];
  let size = tileChildren[1].childNodes[1];
  let bait = tileChildren[2].childNodes[0];
  let method = tileChildren[2].childNodes[1];
  let location = tileChildren[3];
  let gerDate = tileChildren[4];
 
  let refObj = myCatches[tileID];
  species.textContent = refObj.species;
  size.textContent = refObj.size;
  bait.textContent = refObj.bait;
  method.textContent = refObj.method;
  location.textContent = refObj.location;
  gerDate.textContent = refObj.gerDate;
}

//grab and process form data
function processFormData(species, size, bait, location, method, gerDate, date, notes, submitClass) {
  //create and display new object
  if (submitClass === "new") {
    addFishToCatches(species, size, bait, location, method, gerDate, date, notes);
    let indexNew = myCatches.length - 1;
    displayCatches(myCatches[indexNew]);
  } else if (submitClass != "new") {
    editFish(species, size, bait, location, method, gerDate, date, notes, submitClass);
    editTile(submitClass);
  }

  const modal = closeModalButton.closest(".modal");
  closeModal(modal);
}

const submit = document.querySelector("#submit");

submit.addEventListener(("click"), (e) => {
  let species = document.querySelector("#fish_species").value;
  let size = document.querySelector("#fish_size").value;
  let bait = document.querySelector("#fish_bait").value;
  let method = document.querySelector("#fish_method").value;
  let location = document.querySelector("#fish_location").value;
  let date = document.querySelector("#fish_date").value;
  let notes = document.querySelector("#fish_notes").value;
  let submitClass = e.target.className;

  let dateArr = date.split("");
  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i] === "-") {
      dateArr.splice(i, 1);
    }
  }

  //convert date format
  let gerDateArr = [];
  gerDateArr.push(dateArr[6], dateArr[7], ".", dateArr[4], dateArr[5], ".", dateArr[0], dateArr[1], dateArr[2], dateArr[3]);
  let gerDate = gerDateArr.join("");

  processFormData(species, size, bait, location, method, gerDate, date, notes, submitClass);
})

//display array items by default
myCatches.forEach((item) => {
  displayCatches(item);
})

//remove and edit buttons
let removeBtns = document.getElementsByClassName("remove");
let editBtns = document.getElementsByClassName("edit");
let tiles = document.getElementsByClassName("fish");

function addRemoveEvent(element) {
  element.addEventListener(("click"), (e) => {
    let index = e.target.parentNode.parentNode.id;
    delObj(index);
    delDOM(index);
    updateIndexes();
    updateIDs();
  })
}

function delObj(index) {
  myCatches.splice(index, 1);
}

function delDOM(index) {
  let rmvTile = document.getElementById(index);
  rmvTile.remove();
}

//update indexes of fish objects
function updateIndexes() {
  myCatches.forEach((obj) => {
    obj.index = myCatches.indexOf(obj);
  })
}

//update IDs of fish tiles for proper DOM removal
function updateIDs() {
  for (let p = 0; p < tiles.length; p++) {
    tiles[p].id = p;
  }
}

//edit buttons
function addEditEvent(element) {
  element.addEventListener(("click"), (e) => {
    const modal = document.querySelector("#modal");
    openModal(modal);

    let index = e.target.parentNode.parentNode.id;
    setInput(index);

    let modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = "Fang bearbeiten";

    let submitBtn = document.querySelector("#submit");
    submitBtn.classList.add(index);
  })
}

function setInput(index) {
  let refObj = myCatches[index];
  let species = document.querySelector("#fish_species");
  let size = document.querySelector("#fish_size");
  let bait = document.querySelector("#fish_bait");
  let method = document.querySelector("#fish_method");
  let location = document.querySelector("#fish_location");
  let date = document.querySelector("#fish_date");
  let notes = document.querySelector("#fish_notes");
  species.value = refObj.species;
  size.value = refObj.size;
  bait.value = refObj.bait;
  method.value = refObj.method;
  location.value = refObj.location;
  date.value = refObj.date;
  notes.value = refObj.notes;
}

//finish localStorage -> save if new object created or existing object edited
//finish modal "Notizen"