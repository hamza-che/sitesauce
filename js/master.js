
// grab an element
var myElement = document.querySelector(".header-area");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();

// Check if there is colors option on local storage
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    // console.log("Local Storage is not empty now you can add colors opption to the root element")
    document.documentElement.style.setProperty("--main-color", mainColor);

    // remove active class from all list items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // if target element data-color === mainColor add active Class
        if (element.dataset.color === mainColor) {
            // Add active class
            element.classList.add("active");
        }
    });
}

// Random background option
let backgroundOption = true;

// Variable to control background interval
let backgroundInterval;

// Check if there is random background item on local storage
let randomBackLocalItem = localStorage.getItem("background_option");

if (randomBackLocalItem !== null) {

    // Remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    })

    if (randomBackLocalItem === "true") {
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");
    }

}

// Select Settings Elements
let settingsGear = document.querySelector(".settings-gear");
let settingsBox = document.querySelector(".settings-box");

// Add The Event Listener To Settings Gear
settingsGear.onclick = function () {

    // Toggle Spin Class for Rotation
    this.classList.toggle("fa-spin");

    // Toggle Class Open For The Settings Box
    settingsBox.classList.toggle("open");
};

// Switch Colors
let colorsLi = document.querySelectorAll(".colors-list li");

// loop on Every list item
colorsLi.forEach(li => {

    //Click On every List Item
    li.addEventListener("click", function (e) {

        // Add My Chosen Color To The Root Element
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // add the chosen color to local storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e)

    })
})

// Random Backgrounds
let randomBackElement = document.querySelectorAll(".random-background span");

// loop on Every list item
randomBackElement.forEach(span => {

    //Click On every List Item
    span.addEventListener("click", function (e) {

        handleActive(e)

        if (e.target.dataset.background === "yes") {
            let backgroundOption = true;
            localStorage.setItem("background_option", true);
            randomizeBackground();
        } else {
            let backgroundOption = false;
            localStorage.setItem("background_option", false);
            clearInterval(backgroundInterval);
        }

    })

})

// Show and Hide Navigation bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalitem = localStorage.getItem("bullets_option");

if (bulletsLocalitem !== null) {

    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    })

    if (bulletsLocalitem === "block") {
        bulletsContainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", function(e) {

        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block")
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none")
        }

        handleActive(e)

    })

})

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Array Of Images
let imgsArray = ["slider01.jpg", "slider02.jpg", "slider03.jpg", "slider04.jpg", "slider05.jpg"];

// Function to randomize imgs
function randomizeBackground() {

    if (backgroundOption == true) {
        // Change Background Image Every 5 Seconds
        backgroundInterval = setInterval( () => {

            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // change background image
            landingPage.style.backgroundImage = "url('../images/slider/" + imgsArray[randomNumber] + "')";

        }, 5000);
    }

}
randomizeBackground()

// Select Skills Element
let skillsElement = document.querySelector(".skills");

window.onscroll = () => {

    // Skills Offset Top
    let skillsOffsetTop = skillsElement.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = skillsElement.offsetHeight;

    // Window height
    let windowHeight = window.outerHeight;

    // Window Scroll Top
    let windowScrollTop = window.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-container .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })

    }

}

// Get images element
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // Create The popup overlay 
        let popupOverlay = document.createElement("div");

        // Add class name to overlay
        popupOverlay.classList.add("popup-overlay");

        // Add overlay to body
        document.body.appendChild(popupOverlay);

        // Create the popup box
        let popupBox = document.createElement("div");

        if (img.src !== null) {

            //create the popup heading 
            let popupHeading = document.createElement("h3");

            // create the heading text
            let headingText = document.createTextNode(img.alt)

            // add Class to the heading
            popupHeading.className = "popup-heading";

            // add text to the heading element
            popupHeading.appendChild(headingText);

            // add popup heading to popup box
            popupBox.appendChild(popupHeading);

        }

        // Create the colse button
        let closeButton = document.createElement("span");

        // add class to close button
        closeButton.className = "close-button";

        // Create the close button content
        let closeContent = document.createTextNode("X");

        // add the content to close button
        closeButton.appendChild(closeContent);

        // add the close button to the popup box
        popupBox.appendChild(closeButton)

        // Create the img of popup box
        let myImg = document.createElement("img")

        // add src attribute to the img
        myImg.src = img.src;

        // Add the img to popup box
        popupBox.appendChild(myImg);

        // add class to popup box
        popupBox.classList.add("popup-box");

        // add popup box to body
        document.body.appendChild(popupBox)

    })

})

// Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className === "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }

})

// Select Nav Bullets
const navBullets = document.querySelectorAll(".nav-bullets .nav-bullet");

// Select Nav Link
const navLinks = document.querySelectorAll(".menu-links li a");

// Scroll To Sections
function scrollToSections(elements) {

    elements.forEach(element => {

        element.addEventListener("click", function(e) {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })

        })

    })

}

scrollToSections(navBullets);
scrollToSections(navLinks);


// Handle Active States
function handleActive(ev) {

    // remove active class from all list items
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // Add active class to target element
    ev.target.classList.add("active");

}

// Reset Button
document.querySelector(".reset-button").onclick = function () {

    let localItems = ["color_option", "background_option", "bullets_option"];
    let i = 0;

    for (i; i < localItems.length; i++) {
        localStorage.removeItem(localItems[i]);
    }

    window.location.reload();

}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let theLinks = document.querySelector(".header-area .links");

theLinks.onclick = function (e) {
    e.stopPropagation()
}

toggleBtn.onclick = function (e) {

    e.stopPropagation()

    this.classList.toggle("open-menu");

    theLinks.classList.toggle("open");

}

// Close the menu wen we click everywhere
document.onclick = function () {

    if (theLinks.classList.contains("open")) {

        theLinks.classList.toggle("open");

        toggleBtn.classList.toggle("open-menu");

    }

}