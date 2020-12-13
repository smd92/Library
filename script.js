// --- objects part ---
let myCatches = [];

//constructor function for new Fish objects
function Fish(species, size, bait, location, method, date) {
    this.species = species;
    this.size = size + "cm"
    this.bait = bait
    this.location = location
    this.method = method
    this.date = date
    this.index = myCatches.length
}

//info about the Fish
Fish.prototype.info = function() {
    let infoArr = [];
    infoArr.push(this.species, this.size, this.bait, this.location, this.method, this.date);
    return infoArr.join(", ");
  }

function addFishToCatches(sp, s, b, l, m, d) {
  let newFish = new Fish(sp, s, b, l, m, d);
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
}
/* END OF MODAL PART */

//      TEST
let testOne = addFishToCatches("Bachforelle", "35", "Trockenfliege", "Mangfall", "Fliegenfischen", "16.04.2020");
let testTwo = addFishToCatches("Döbel", "50", "Nymphe", "Inn", "Fliegenfischen", "22.06.2020");
let testThree = addFishToCatches("Hecht", "82", "Gummifisch", "Tegernsee", "Schleppfischen", "15.10.2020");
//      END OF TEST

//display myCatches items on page
function displayCatches(item) {

  //create new tile
  let newTile = document.createElement("div");
  newTile.classList.add("fish", "action");
  newTile.id = "tile" + item.index;

  //create edit and remove button
  let edRe = document.createElement("div");
  edRe.className = "edRe";

  let edit = document.createElement("p");
  edit.className = "edit";
  edit.textContent = "Edit";
  edRe.appendChild(edit);

  let remove = document.createElement("p");
  remove.className = "remove";
  remove.id = item.index;
  remove.textContent = "Remove";
  edRe.appendChild(remove);
    
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
  date.textContent = item.date;

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
  
  addFishToCatches(species, size, bait, location, method, gerDate);

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

//remove buttons to delete items from display myCatches array
let removeBtns = document.getElementsByClassName("remove");
let tiles = document.getElementsByClassName("fish");

for (let k = 0; k < removeBtns.length; k++) {
  removeBtns[k].addEventListener(("click"), () => {
    delObj(k);
    delDOM(k);
    console.log(k);
    //let index = removeBtns[k].id;
    //myCatches.splice(index, 1);

    //let tileName = "#tile" + index;
    //let rmvTile = document.querySelector(tileName);
    //rmvTile.remove();

    updateIndexes();
    updateIDs();
  })
}

function delObj(index) {
  myCatches.splice(index, 1);
}

function delDOM(index) {
  let tileName = "#tile" + index;
  console.log(tileName);
  let rmvTile = document.querySelector(tileName);
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
      tiles[p].id = "tile" + p;
    }
    for (let q = 0; q < removeBtns.length; q++) {
      removeBtns[q].id = q;
    }
}
