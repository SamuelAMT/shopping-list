// Add event listeners to delete items when the trash icon is clicked
document.querySelectorAll('.fa-trash-alt').forEach(item => {
    item.addEventListener('click', event => {
        event.target.parentElement.remove();
    });
    item.classList.add('trash-icon'); // Add class to trash icons
});

var button = document.getElementById("enter");
var input = document.getElementById("userinput");
const ul = document.querySelector("ul");
const li = document.getElementsByTagName("li");
const deleteButton = document.getElementsByClassName("trash-icon"); // Select by class name
var clearButton = document.getElementById("clear");

// Array to store checked items
var checkedItems = [];

// Function to toggle strikethrough effect when an item is clicked and move it to the end of the list
function strikeThrough(e) {
    if (e.target.tagName === "LI") {
        // Check if the item is already marked as purchased
        var isDone = e.target.classList.contains("done");
        if (isDone) {
            // Remove the 'done' class to unmark it as purchased
            e.target.classList.remove("done");
            // Move the item back to its original position
            var index = checkedItems.indexOf(e.target);
            if (index > -1) {
                checkedItems.splice(index, 1);
            }
            ul.insertBefore(e.target.parentElement, ul.firstChild);
        } else {
            // Add the 'done' class to mark it as purchased
            e.target.classList.add("done");
            // Move the clicked item to the end of the list
            checkedItems.push(e.target);
            ul.appendChild(e.target.parentElement);
        }
    }
}

// Function to create delete button icons for each list item
function createDeleteButtonIcon() {
    for (var ind = 0; ind < li.length; ind++) {
        var createDeleteButton = document.createElement("i");
        var createDiv = document.getElementsByClassName("div");
        createDeleteButton.classList.add("fa", "fa-trash");
        createDiv[ind].appendChild(createDeleteButton);
        createDeleteButton.classList.add('trash-icon'); // Add class to newly created trash icons
    }
}

// Function to delete a list item when its corresponding trash icon is clicked
function deleteNodeOnClick(e) {
    this.parentElement.parentElement.remove(); // Remove the parent of the trash icon
}

// Function to get the length of input value
function inputLength() {
    return input.value.length;
}

// Function to create a new list item
function createListElement() {
    var divClassWrapper = document.createElement("div");
    divClassWrapper.classList.add("li-wrapper");

    var listItem = document.createElement("li");
    listItem.textContent = input.value; // Set text content directly
    listItem.addEventListener('click', editItem); // Add click event listener for editing

    var createDiv = document.createElement("div");

    divClassWrapper.appendChild(listItem); // Append the list item
    divClassWrapper.appendChild(createDiv);
    ul.appendChild(divClassWrapper);

    input.value = "";
    createDiv.classList.add("div");
    var createDeleteButton = document.createElement("i");
    createDeleteButton.classList.add("fa", "fa-trash");
    createDiv.appendChild(createDeleteButton);
    createDeleteButton.classList.add('trash-icon'); // Add class to newly created trash icon

    var createEditButton = document.createElement("i"); // Create edit pencil icon
    createEditButton.classList.add("fas", "fa-pencil-alt", "edit-icon"); // Correct pencil icon class
    createDiv.insertBefore(createEditButton, createDeleteButton); // Add edit pencil icon before delete button

    deleteParentNodeOnClick();
    editParentNodeOnClick(); // Add event listener for edit action
}

// Function to add a new list item after clicking the enter button
function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

// Function to add a new list item after pressing the enter key
function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

// Function to add click event listeners to delete buttons
function deleteParentNodeOnClick() {
    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", deleteNodeOnClick);
    }
}

// Function to add click event listeners to edit buttons
function editParentNodeOnClick() {
    var editButtons = document.querySelectorAll('.edit-icon'); // Select all edit buttons
    editButtons.forEach(button => {
        button.addEventListener('click', editItem); // Add event listener for edit action
    });
}

// Function to clear the entire list
function clearList() {
    ul.innerHTML = "";
}

function editItem(e) {
    var newText = prompt("Edit item:", e.target.parentElement.parentElement.querySelector("li").textContent.trim());
    if (newText !== null) {
        e.target.parentElement.parentElement.querySelector("li").textContent = newText.trim();
    }
}

// Add event listeners
clearButton.addEventListener("click", clearList);
ul.addEventListener("click", strikeThrough);
button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
createDeleteButtonIcon();
deleteParentNodeOnClick();
editParentNodeOnClick(); // Call function to add event listener for edit action

// Function to handle search input changes
function handleSearchInput() {
    // Get the search query from the input field
    var searchQuery = document.querySelector('.search-input').value.toLowerCase();

    // Iterate over the list items
    for (var i = 0; i < li.length; i++) {
        var listItem = li[i];

        // Check if the list item text content contains the search query
        if (listItem.textContent.toLowerCase().includes(searchQuery)) {
            // Show the list item if it matches the search query
            listItem.parentElement.style.display = 'flex';
        } else {
            // Hide the list item if it doesn't match the search query
            listItem.parentElement.style.display = 'none';
        }
    }
}

// Add event listener to handle search input changes
document.querySelector('.search-input').addEventListener('input', handleSearchInput);
