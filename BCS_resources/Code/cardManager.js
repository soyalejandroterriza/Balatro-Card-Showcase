///////////////////////////////// Base functions & other /////////////////////////////////
class Card { //Definition of the "Card" object
    constructor(number, displayName, rarity, effect, picture, cost, unlockRequirement) {
        this.number = number;
        this.displayName = displayName;
        this.rarity = rarity;
        this.effect = effect;
        this.picture = picture;
        this.cost = cost;
        this.unlockRequirement = unlockRequirement;
    }
}
function load_cards_in_memory() { //Loads the cards into memory and prepare the page to display them
    
    // Access the JSON file using "Fetch Api"
    // Creates a "Card" type object with each of the JSON records and stores them in an array variable named "allCards"
    fetch(card_json_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error when loading the JSON");
            }
            return response.json();
        })
        .then((data) => {
            //Iterate over each record in the JSON, create an object of type Card and store each record, push the object to allCards. Get the name, and push it to cardSuggestions.
            data.forEach((item) => {
                let targetCard = new Card(
                    item.number,
                    item.displayName,
                    item.rarity,
                    item.effect,
                    item.picture,
                    item.cost,
                    item.unlockRequirement
                );
                allCards.push(targetCard);

                if (targetCard.number != 0) {
                    // Prevents index 0, since its used to leave an empty space in the gallery and it cannot be inspected.
                    cardSuggestions.push(targetCard.displayName);
                }
            });

            //I flag that the cards are ready to be used
            cardsReady = true;

            //Knowing the number of cards I have, I establish the maximum number of pages I need (15 cards per page)
            maxPage = Math.ceil((allCards.length - 1) / 15);

            //Update the page indicator
            pageIndicator.innerText = `Page ${actualPage}/${maxPage}`;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
function get_screen_units(amount) { // Determine a size named "screenUnit" according to the width of the screen.
    let a = 0;
    a = Math.ceil(myUnit * amount);
    console.log("a = " + a);
    a = a.toString().concat("px");
    return a;
}

///////////////////////////////// Gallery functions /////////////////////////////////
async function fill_card_gallery() {
    /* Determine that the variable cardsReady will be executed every 100ms to check if the cards have already been
      loaded, indicating the variable cardsReady as true when it has been fulfilled. */
    let cardsReadyPromise = new Promise((resolve) => {
        const interval = setInterval(() => {
            if (cardsReady) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });

    // Wait until the "Fetch" has been resolved.
    await cardsReadyPromise;

    // Empty the gallery
    cardGalleryTable.innerHTML = "";

    // Fill the table with three rows and five cells per row using loops.
    for (let i = 0; i < tableRows; i++) {
        //Loop for the three rows.

        //Create a table row
        let jokerTR = document.createElement("tr");

        for (let a = 0; a < tableColumns; a++) {
            //Bucle con las cinco celdas, cada una con el nextJoker;
            let jokerTD = document.createElement("td");
            jokerTD.innerHTML = get_next_card();
            jokerTR.appendChild(jokerTD);
        }

        //Joining the table row to the table.
        cardGalleryTable.appendChild(jokerTR);
    }

    // When it finishes filling the gallery, it makes "stopFlag" to be false.
    stopFlag = false;

    // Add "eventListeners" to the images to make them interactive.
    create_card_event_listeners();

    // Add the tilting effect.
    addTilting();
}
function create_card_event_listeners() { // Allows clicking on the images to get their ID and display them in the inspector.

    // Locate all images with the attribute data-gallerycard
    let images = document.querySelectorAll("[data-galleryCard]");

    // Adds the event listener.
    images.forEach(function (img) {
        img.addEventListener("click", function () {
            inspectCard(parseInt(img.id));
        });
    });
}
function get_next_card() { // Gets the next card to print in the gallery.

    if (stopFlag) {
        // If stopFlag is true, just returns an empty space. (card with index 0)
        return print_card(allCards[0]);
    } else {
        //Returns the needed card and adds 1 to the next loading card index.
        let targetCard = print_card(allCards[card_index_to_load]);
        nextIndex();
        return targetCard;
    }
}
function print_card(targetCard) { // Takes a card object as a parameter and returns it as HTML readable text
    let targetText = `
    <img data-galleryCard data-tilt data-tilt-reverse="true" data-tilt-scale="1.2" src="BCS_resources/Card_pictures/${targetCard.picture}" class="cardInGallery" id="${targetCard.number}">
    `;

    return targetText;
}
function checkButtons() { // Manages the buttons according to the actual page.
    previousPageButton.disabled = false;
    nextPageButton.disabled = false;

    if (actualPage == "1") {
        previousPageButton.disabled = true;
        nextPageButton.disabled = false;
    }
    if (actualPage == maxPage) {
        nextPageButton.disabled = true;
        previousPageButton.disabled = false;
    }
}
function changeGalleryPage(direction) { // Changes page in gallery
    if (direction == "prev") {
        actualPage -= 1;
        // We need to manage the next card index.
        card_index_to_load = actualPage * 15 - 14;
    }
    if (direction == "next") {
        actualPage += 1;
        // Card index management is not required.
    }

    // Update the displayed page number.
    pageIndicator.innerText = `Page ${actualPage}/${maxPage}`;

    // I call checkButtons to control the "disabled" of the change page buttons.
    checkButtons();

    // Fill the gallery with cards.
    fill_card_gallery();
}
function addTilting() { // Adds the tilting effct
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Prevents addding tilting when is a mobile device.
    if (isMobileDevice() == true){
        return;
    }

    let script = document.createElement("script");
    script.src = "/BCS_resources/Code/vanilla-tilt.js";
    document.head.appendChild(script);
}
function setRarity() { // Reads the rarity of the card through the inspector and assigns the corresponding style.
    if (inspectorRarity.innerHTML == "Common") {
        inspectorRarity.className = "inspectorRarity common";
    } else if (inspectorRarity.innerHTML == "Uncommon") {
        inspectorRarity.className = "inspectorRarity uncommon";
    } else if (inspectorRarity.innerHTML == "Rare") {
        inspectorRarity.className = "inspectorRarity rare";
    } else if (inspectorRarity.innerHTML == "Legendary") {
        inspectorRarity.className = "inspectorRarity legendary";
    } else {
        inspectorRarity.className = "inspectorRarity";
    }
}
function setSizing() { //Change gallery size
    let gallery = document.getElementById("card_gallery");

    gallery.style.width = get_screen_units(50);
    gallery.style.height = (screen.height * 0.7).toString().concat("px");

    // Inspector
    let inspector = document.getElementById("");

    //Determinar card in inspector size .card_inspector
}

///////////////////////////////// Inspect functions /////////////////////////////////
function inspectCard(index) { // Loads the card with specific index to the inspector.
    
    if (index == 0) {
        // I prevent the index "0" from being loaded, since this index is used for empty spaces.
        return;
    }
    if (index == "notFound") {
        // "Index" reserved for when the card "card search system" does not find the required one.
        inspectorTitle.innerText = "CARD INSPECTOR";
        inspectorName.innerText = "Card not found.";
        inspectorRarity.innerText = "";
        setRarity("No rarity.");
        inspectorEffect.innerHTML = "";
        inspectorNumber.innerText = "";
        inspectorCost.innerText = "";
        inspectorPicture.src = "resources/Joker_pictures/No_Joker.webp";
    }

    // Stores the selected card object
    let targetCard = allCards[index];

    // Fill the inspector with the card info.
    inspectorTitle.innerHTML =
        'CARD INSPECTOR<p class="clickToZoomLetter">(Click image to zoom)</p>';
    inspectorName.innerText = targetCard.displayName;
    inspectorRarity.innerText = targetCard.rarity;
    inspectorEffect.innerHTML = "<p>" + targetCard.effect + "</p>";
    inspectorNumber.innerText = "Nº: " + targetCard.number;
    inspectorCost.innerText = targetCard.cost;
    inspectorPicture.src = "BCS_resources/Card_pictures/" + targetCard.picture;

    // Call the method that sets the style corresponding to the rarity.
    setRarity();
}
function find_card() { // Catches the user input and puts the found card in the inspector
    // Store the user input
    let userInput = inputBox.value;

    // Empty the input field
    inputBox.value = "";

    // Empty the suggestions field.
    resultsBox.innerHTML = "";

    let res = "notFound";

    if (isNaN(userInput)) {
        res = allCards.find((card) =>
            card.displayName.toUpperCase().includes(userInput.toUpperCase())
        );
    }

    if (!isNaN(userInput)) {
        res = allCards.find((card) => card.number == userInput);
    }

    if (res == undefined) {
        res = "notFound";
    }

    inspectCard(res.number);
}

///////////////////////////////// Card index management functions /////////////////////////////////
function nextIndex() { // Advance the card index in a safe way
    card_index_to_load = card_index_to_load + 1;
    checkIndex();
}
function checkIndex() { // Keeps the index within the limit and sets stopFlag
    if (card_index_to_load > allCards.length - 1 || card_index_to_load < 1) {
        card_index_to_load = 1;
        stopFlag = true;
    }
}

/////////////////////// "Zoom" functions ///////////////////////
function open_zoom(target) { //Opens the zoom menu with the needed element (card/info)
    // Show the black background by turning on the display.
    coverZoom.style.display = "flex";

    if (target == "card") {
        // Open the zoom for the card. Sets the picture and turns on the display.
        cardZoom.src = inspectorPicture.src;
        cardZoom.style.display = "";
    } else if (target == "info") {
        // Open the zoom for the info panel, turning on the display.
        infoZoom.style.display = "";
    }
}
function close_zoom() { //Hides the zoom menu
    //Hide the cover, the info panel and the card by turning off the display.
    coverZoom.style.display = "none";
    infoZoom.style.display = "none";
    cardZoom.style.display = "none";
}
function set_zoom_card_size() {
    const cardImageSize_Temp = screen.height * 0.7;
    cardZoomImg.style.height = cardImageSize_Temp.toString() + "px";
    cardZoomImg.style.width = (cardImageSize_Temp * 0.75).toString() + "px";
}

/////////////////////// Search suggestion functions ///////////////////////
function displaySuggestions(target) { // Fill the suggestion field with the "target" content.

    // Map" iterates the array returning a (new) duplicate array where each iterated element has passed through the function described below.
    const suggestionsToDisplay = target.map((t) => {
        // The new array will be filled with HTML code where each element (called "t") will be wrapped in its corresponding tags.
        return "<li onclick=selectInput(this)>" + t + "</li>";
    });

    // Fill resultsBox with the content, applying the corresponding tag.

    resultsBox.innerHTML = "<ul>" + suggestionsToDisplay.join('') + "</ul>"; // The "join" solves the COMMA issue.
}
function selectInput(list) { // Allows you to click on suggestions, put them in the input (ready to be searched) and empty the entire suggestion field.
    // In the elements created as HTML between LI tags of the displaySuggestions function, an onclick event is added to them, which triggers this method.


    // Fills the input with the selected suggestion
    inputBox.value = list.innerHTML;

    // Launches the function
    find_card();
}

/////////////////////// Variables ///////////////////////
// General references
const pageIndicator = document.getElementById("pageDiv");
const previousPageButton = document.getElementById("previousPageButton");
const nextPageButton = document.getElementById("nextPageButton");
const cardGalleryTable = document.getElementById("card_gallery_table");
const find_card_button = document.getElementById("find_card_button");

// Inspector References
const inspectorTitle = document.getElementById("inspectorTitle");
const inspectorName = document.getElementById("inspectorName");
const inspectorRarity = document.getElementById("inspectorRarity");
const inspectorEffect = document.getElementById("inspectorEffect");
const inspectorNumber = document.getElementById("inspectorNumber");
const inspectorCost = document.getElementById("inspectorCost");
const inspectorPicture = document.getElementById("inspectorPicture");
const cardZoomImg = document.getElementById("cardZoomImg");

// Zoom references
const cardZoom = document.getElementById("cardZoomImg");
const coverZoom = document.getElementById("cardInspectionDiv");
const infoZoom = document.getElementById("info");

// Suggestion references
const resultsBox = document.querySelector(".suggestions");
const inputBox = document.getElementById("search_input");

// Default values
const myUnit = screen.width / 100;
const cardWidth = "100px";
const cardHeight = "100px";
const card_json_url = "/BCS_resources/Code/cards.json";
const tableRows = 3;
const tableColumns = 5;

// Using variables
let allCards = [];
let cardSuggestions = [];
let cardsReady = false;
let card_index_to_load = 1;
let stopFlag = false;
let actualPage = 1;
let maxPage = 999;

/////////////////////// Run! ///////////////////////

// Load cards in memory from the JSON
load_cards_in_memory();

// Fill the gallery with cards
fill_card_gallery();

// Manage the buttons to be correctly enabled/disabled.
checkButtons();

// Make sure that the zoom menu appears closed at first
close_zoom();

// Sets the size of the zoom card depending on the screen size
set_zoom_card_size();

// Add event listeners.
nextPageButton.addEventListener("click", function () { // Next page button behavior
    changeGalleryPage("next");
});
previousPageButton.addEventListener("click", function () { //Previous page button behavior
    changeGalleryPage("prev");
});
inputBox.addEventListener("keypress", function (event) { // Allows launching the search card by pressing "enter" in the input field.
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        // event.preventDefault();

        // Launch the find function
        find_card();
    }
});
document.getElementById("showInfoButton").addEventListener("click", function () { // Zoom Info behavior
    open_zoom("info");
});
inspectorPicture.addEventListener("click", function () { // Zoom Card behavior
    open_zoom("card");
});
document.getElementById("cardInspectionDiv").addEventListener("click", function () { // Close zoom behavior
    close_zoom();
});

// Update the suggestions field, continuosly
inputBox.onkeyup = function () {
    let result = []; // Empty variable to store matching results
    let input = inputBox.value; // Stores what is written in the input

    if (input.length) {
        // Check that the input is not empty.
        result = cardSuggestions.filter((keyword) => {
            // Fill result with all the results that return true in the function.
            // Returns true or false, depending on wheter any of the elements stored in the variable include what is in the input. Both in lowercase.
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }

    // Fills the suggestion field with the result variable content
    displaySuggestions(result);

    // If there is no matching results, empty the resultsBox, making it invisible.
    if (!result.length) {
        resultsBox.innerHTML = "";
    }
};
