// --- objects part ---
let myCatches = [];

//constructor function for new Fish objects
function Fish(species, size, bait, location, method, gerDate, date) {
    this.species = species;
    this.size = size
    this.bait = bait
    this.location = location
    this.method = method
    this.gerDate = gerDate
    this.index = myCatches.length
    this.date = date;
}

//info about the Fish
Fish.prototype.info = function() {
    let infoArr = [];
    infoArr.push(this.species, this.size, this.bait, this.location, this.method, this.date);
    return infoArr.join(", ");
  }

function addFishToCatches(sp, s, b, l, m, gd, d) {
  let newFish = new Fish(sp, s, b, l, m, gd, d);
  myCatches.push(newFish);
  return newFish;
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
}
else {
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
})

overlay.addEventListener(("click"), () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach(modal => {
    closeModal(modal);
    clearModal();
  })
})

closeModalButton.addEventListener(("click"), () => {
  const modal = closeModalButton.closest(".modal");
  closeModal(modal);
  clearModal();
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
}

function clearModal() {
  let modalTitle = document.querySelector(".modal-title");
  let species = document.querySelector("#fish_species");
  let size = document.querySelector("#fish_size");
  let bait = document.querySelector("#fish_bait");
  let method = document.querySelector("#fish_method");
  let location = document.querySelector("#fish_location");
  let date = document.querySelector("#fish_date");
  species.value = "";
  size.value = "";
  bait.value = "";
  method.value = "";
  location.value = "";
  date.value = "";
  modalTitle.textContent = "Add new fish";
}
/* END OF MODAL PART */

//      TEST
let testOne = addFishToCatches("Bachforelle", "35cm", "Trockenfliege", "Mangfall", "Fliegenfischen", "16.04.2020", "2020-04-16");
let testTwo = addFishToCatches("Döbel", "50cm", "Nymphe", "Inn", "Fliegenfischen", "22.06.2020", "2020-06-22");
let testThree = addFishToCatches("Hecht", "82cm", "Gummifisch", "Tegernsee", "Schleppfischen", "15.10.2020", "2020-10-15");
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
  edit.textContent = "Edit";
  edRe.appendChild(edit);
  addEditEvent(edit);

  let remove = document.createElement("p");
  remove.className = "remove";
  remove.textContent = "Remove";
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

//grab and process form data
const submit = document.querySelector("#submit");

submit.addEventListener(("click"), () => {
  let species = document.querySelector("#fish_species").value;
  let size = document.querySelector("#fish_size").value;
  let bait = document.querySelector("#fish_bait").value;
  let method = document.querySelector("#fish_method").value;
  let location = document.querySelector("#fish_location").value;
  let date = document.querySelector("#fish_date").value;
  
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
  
  addFishToCatches(species, size, bait, location, method, gerDate, date);

  //display the newly created object
  let indexNew = myCatches.length - 1;
  displayCatches(myCatches[indexNew]);

  const modal = closeModalButton.closest(".modal");
  closeModal(modal);
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
    modalTitle.textContent = "Edit Fish";
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
  species.value = refObj.species;
  size.value = refObj.size;
  bait.value = refObj.bait;
  method.value = refObj.method;
  location.value = refObj.location;
  date.value = refObj.date;
}