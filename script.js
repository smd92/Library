// --- objects part ---

let myCatches = [];

//constructor function for new Fish objects
function Fish(species, size, bait, location, method) {
    this.species = species
    this.size = size + "cm";
    this.bait = bait
    this.location = location
    this.method = method
}

//info about the Fish
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
const body = document.querySelector("body");

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
  body.className = "mainBlur";

})

//      TEST

let testOne = addFishToCatches("Bachforelle", "35", "Trockenfliege", "Mangfall", "Fliegenfischen");
let testTwo = addFishToCatches("Döbel", "50", "Nymphe", "Inn", "Fliegenfischen");
let testThree = addFishToCatches("Hecht", "82", "Gummifisch", "Tegernsee", "Schleppfischen");

//      END OF TEST

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
    edit.className = "edit";
    edit.textContent = "Edit";
    edRe.appendChild(edit);

    let remove = document.createElement("p");
    remove.className = "remove";
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

    newTile.appendChild(edRe);
    newTile.appendChild(specSize);
    newTile.appendChild(baitMet);
    newTile.appendChild(location);
    grid.insertBefore(newTile, addFish);
  })
}