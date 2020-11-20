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
	myCatches.push(new Fish(sp, s, b, m));
}

// --- end of objects part

const grid = document.querySelector("#grid");
const addFish = document.querySelector("addFish");

//initial grid
if (myCatches.length < 1) {
  window.onload = adjustGrid(4, 4);
}
else {
  window.onload = adjustGrid(myCatches.length, 3);
}

function adjustGrid(columns, rows) {
	
  //adjust values of css variables
  grid.style.setProperty("--columns", columns);
  grid.style.setProperty("--rows", rows);
}

//open form for user input
addFish.addEventListener(("click"), () => {

})