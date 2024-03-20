document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("userinput");
    const enterButton = document.getElementById("enter");
    const ul = document.querySelector("ul.items-container");

    function createListItem() {
        const li = document.createElement("li");
        const editIcon = document.createElement("i");
        const deleteIcon = document.createElement("i");
        const div = document.createElement("div");

        li.textContent = input.value;
        editIcon.classList.add("fas", "fa-pencil-alt", "edit-icon");
        deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");

        div.appendChild(editIcon);
        div.appendChild(deleteIcon);

        const liWrapper = document.createElement("div");
        liWrapper.classList.add("li-wrapper");

        liWrapper.appendChild(li);
        liWrapper.appendChild(div);

        ul.appendChild(liWrapper);

        input.value = "";
    }

    function addListItemAfterClick() {
        if (input.value.length > 0) {
            createListItem();
        }
    }

    function addListItemAfterKeypress(event) {
        if (input.value.length > 0 && event.keyCode === 13) {
            createListItem();
        }
    }

    enterButton.addEventListener("click", addListItemAfterClick);
    input.addEventListener("keypress", addListItemAfterKeypress);

    ul.addEventListener('click', function (event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("done");
        }
    });

    const deleteButton = document.querySelectorAll('.fa-trash-alt');

    deleteButton.forEach(item => {
        item.addEventListener('click', event => {
            event.target.parentElement.parentElement.remove();
        });
        item.classList.add('trash-icon');
    });

    function strikeThrough(e) {
        if (e.target.tagName === "LI") {
            var isDone = e.target.classList.contains("done");
            if (isDone) {
                e.target.classList.remove("done");
                var index = checkedItems.indexOf(e.target);
                if (index > -1) {
                    checkedItems.splice(index, 1);
                }
                ul.insertBefore(e.target.parentElement, ul.firstChild);
            } else {
                e.target.classList.add("done");
                checkedItems.push(e.target);
                ul.appendChild(e.target.parentElement);
            }
        }
    }

    function createDeleteButtonIcon() {
        for (var ind = 0; ind < li.length; ind++) {
            var createDeleteButton = document.createElement("i");
            var createDiv = document.getElementsByClassName("div");
            createDeleteButton.classList.add("fa", "fa-trash");
            createDiv[ind].appendChild(createDeleteButton);
            createDeleteButton.classList.add('trash-icon');
        }
    }

    function deleteNodeOnClick(e) {
        this.parentElement.parentElement.remove();
    }

    function inputLength() {
        return input.value.length;
    }

    function createListElement() {
        var divClassWrapper = document.createElement("div");
        divClassWrapper.classList.add("li-wrapper");

        var listItem = document.createElement("li");
        listItem.textContent = input.value;
        listItem.addEventListener('click', editItem);

        var createDiv = document.createElement("div");

        divClassWrapper.appendChild(listItem);
        divClassWrapper.appendChild(createDiv);
        ul.appendChild(divClassWrapper);

        input.value = "";
        createDiv.classList.add("div");
        var createDeleteButton = document.createElement("i");
        createDeleteButton.classList.add("fa", "fa-trash");
        createDiv.appendChild(createDeleteButton);
        createDeleteButton.classList.add('trash-icon');

        var createEditButton = document.createElement("i");
        createEditButton.classList.add("fas", "fa-pencil-alt", "edit-icon");
        createDiv.insertBefore(createEditButton, createDeleteButton);

        deleteParentNodeOnClick();
        editParentNodeOnClick();
    }

    function addListAfterClick() {
        if (inputLength() > 0) {
            createListElement();
        }
    }

    function addListAfterKeypress(event) {
        if (inputLength() > 0 && event.keyCode === 13) {
            createListElement();
        }
    }

    function deleteParentNodeOnClick() {
        for (var i = 0; i < deleteButton.length; i++) {
            deleteButton[i].addEventListener("click", deleteNodeOnClick);
        }
    }

    function editParentNodeOnClick() {
        var editButtons = document.querySelectorAll('.edit-icon');
        editButtons.forEach(button => {
            button.addEventListener('click', editItem);
        });
    }

    function clearList() {
        ul.innerHTML = "";
    }

    function editItem(e) {
        var newText = prompt("Edit item:", e.target.parentElement.parentElement.querySelector("li").textContent.trim());
        if (newText !== null) {
            e.target.parentElement.parentElement.querySelector("li").textContent = newText.trim();
        }
    }

    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clearList);

    const li = document.getElementsByTagName("li");
    const checkedItems = [];

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', handleSearchInput);

    function handleSearchInput() {
        var searchQuery = searchInput.value.toLowerCase();
        for (var i = 0; i < li.length; i++) {
            var listItem = li[i];
            if (listItem.textContent.toLowerCase().includes(searchQuery)) {
                listItem.parentElement.style.display = 'flex';
            } else {
                listItem.parentElement.style.display = 'none';
            }
        }
    }

    addListItemAfterClick();
    deleteParentNodeOnClick();
    editParentNodeOnClick();
    createDeleteButtonIcon();
});