// selection of the game container
const container = document.getElementById("container");

// function who make a grid game
function makeGrid(col=3, lgn=3) {
    
    // boucle cree div col
    for(i = 0; i < col; i++){
        const divCol = document.createElement("div");
        divCol.className = "col col-display";
        
        // boucle cree div lgn
        for(l = 0; l < lgn; l++){
            // cree la div
            const divLgn = document.createElement("div");
            
            // update div
            divLgn.className = "lgn box-width box-height box-base-bg";
            
            // ajoute div a col
            divCol.appendChild(divLgn);
        };
        container.appendChild(divCol);
    };
    
};
makeGrid();

// Selection of the boxs
const boxs = document.querySelectorAll(".lgn");


// event
boxs.forEach(element => {
    element.addEventListener("click", colorChange);
});
/**
 * function who check if box exist, if it exist return classlist of de box else return false
 * @param {*} value: string 
 * @returns value.classList || false
 */
function isExist(value) {
    if (value && value.nodeType === Node.ELEMENT_NODE) {
        return value.classList;
    } else {
        return undefined;
    };
};

/**
 * return the subling element of the target in the direction selected else return false
 * @param {*} value: string 
 * @param {*} direction: string 
 * @returns sibling.classList || undefined
 */
function calculSibling(targetBox, direction) {
    if(direction === "next"){
        return isExist(targetBox.nextSibling);
    };
    if(direction === "previous"){
        return isExist(targetBox.previousSibling);
    };
};

/**
 * function who check if previous or next element have a different color
 * @param {*} value: string 
 * @param {*} direction: string 
 * @returns true || undefined
 */
function checkSameColorAround(targetBox, direction) { 
    
    // get siblings box classList
    let siblingsBoxColor = calculSibling(targetBox, direction);
    
    // chack if la box exist
    if(siblingsBoxColor !== undefined){

        // if target box is difrent of the bg-base
        if(targetBox.classList[targetBox.classList.length -1] !== "box-base-bg"){

            // check la couleur du carre dans la direction est la meme que la target
            if(siblingsBoxColor[siblingsBoxColor.length -1] === targetBox.classList[targetBox.classList.length -1]){
                // you can change the color
                return console.log("same");
            }else {
                // you can change the color
                console.log("you can change the color");
                return true;
            };
        }else {
            // you can change the color
            console.log("target box is on base bg, do what ever you want");
        };

    }else{
        console.log("is undefined");
        return undefined;
    };






};

/**
 * function who change the color of the boxs
 * @param {*} event: string 
 * @returns true || undefined
 */
function colorChange(event) {

    // the box who have been target
    let targetBox = event.target;
    // array of direction
    let directions = ["next", "previous"];

    for(let i = 0; i < directions.length; i += 1){
        // get casse check exist, same color else change bg
        console.log(checkSameColorAround(targetBox, directions[i]));
        if(checkSameColorAround(targetBox, directions[i]) === undefined){
            console.log(`il n'y a pas de carre dans cette direction: ${directions[i]}`);
            continue;
        }else if(checkSameColorAround(targetBox, directions[i])) {
            // cree une animation qui montre qu'on peux pas changer la couleur
            console.log(`vous etes de meme couleur que le carre dans la direction: ${directions[i]}`);
            return;
        }else if(checkSameColorAround(targetBox, directions[i]) === false){
            // console.log("false1");
        }
        else{
            // remove actuel class color
            targetBox.classList.remove(targetBox.classList.length -1);
            // change class color
            targetBox.classList.add("box-green-bg");
            return;
        };
    };
};