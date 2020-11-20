// --- objects part ---

let myCatches = [];

//constructor function for new book objects
function Fish(species, size, bait, method) {
    this.species = species
    this.size = size + "cm";
    this.bait = bait
    this.method = method
}

//info about the book
Fish.prototype.info = function() {
    let infoArr = [];
    infoArr.push(this.species, this.size, this.bait, this.method);
    return infoArr.join(", ");
  }

function addFishToCatches(sp, s, b, m) {
  let newFish = new Fish(sp, s, b, m);
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


let testOne = addFishToCatches("Bachforelle", "35", "Trockenfliege", "Fliegenfischen");
let testTwo = addFishToCatches("Döbel", "50", "Nymphe", "Fliegenfischen");

//display myCatches items on page
function displayCatches() {

  myCatches.forEach((item) => {
    let newTag = document.createElement("p");
    newTag.textContent = item.species;
    grid.insertBefore(newTag, addFish);
  })
}