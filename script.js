// --- objects part ---

let myCatches = [];

//constructor function for new book objects
function Fish(species, size, bait, location, method) {
    this.species = species
    this.size = size + "cm";
    this.bait = bait
    this.location = location
    this.method = method
}

//info about the book
Fish.prototype.info = function() {
    let infoArr = [];
    infoArr.push(this.species, this.size, this.bait, this.location, this.method);
    return infoArr.join(", ");
  }

function addFishToCatches(sp, s, b, l, m) {
  let newFish = new Fish(sp, s, b, l, m);
  myCatches.push(newFish);
  return newFish;
}

// --- end of objects part

const grid = document.querySelector("#grid");
const addFish = document.querySelector("#addFish");

//initial grid
if (myCatches.length < 1) {
  window.onload = adjustGrid(4, 4);
}
else {
  window.onload = adjustGrid(myCatches.length + 1, 3);
}

//adjust values of css variables
function adjustGrid(columns, rows) {
  grid.style.setProperty("--columns", columns);
  grid.style.setProperty("--rows", rows);
}

//open form for user input
addFish.addEventListener(("click"), () => {
  
})


let testOne = addFishToCatches("Bachforelle", "35", "Trockenfliege", "Mangfall", "Fliegenfischen");
let testTwo = addFishToCatches("Döbel", "50", "Nymphe", "Loisach", "Fliegenfischen");

//display myCatches items on page
function displayCatches() {

  myCatches.forEach((item) => {
    //create new tile
    let newTile = document.createElement("div");
    newTile.classList.add("fish", "action");

    //create edit and remove button
    let edRe = document.createElement("div");
    edRe.className = "edRe";

    let edit = document.createElement("p");
    edit.textContent = "Edit";
    edRe.appendChild(edit);

    let remove = document.createElement("p");
    remove.textContent = "Remove";
    edRe.appendChild(remove);
    
    //create content-body -> species, size

    //create info row -> bait, method

    //create info row -> location

    newTile.appendChild(edRe);
    grid.insertBefore(newTile, addFish);
  })
}