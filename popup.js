document.addEventListener("DOMContentLoaded", function () {
    const inputbox = document.getElementById("notes");
    const savebutton = document.getElementById("saveButton");
    const notesList = document.getElementById("noteslist");

    function loadNotes() {
        chrome.storage.sync.get("notes", function (data) {
            notesList.innerHTML = ""; 
            const notes = Array.isArray(data.notes) ? data.notes : [];

            notes.forEach((note, index) => {
                const li = document.createElement("li");
                li.textContent = note;
                li.style.backgroundColor="cyan"
                li.style.listStyleType="none"
                li.style.padding="10px"
                li.style.alignItems="center"
                li.style.justifyContent="center"
                li.style.borderRadius="5px"
                li.style.width="50%"
                li.style.marginLeft="55px"
                li.style.fontFamily="'Gill Sans MT"


                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.style.marginLeft = "50px";
                deleteButton.style.cursor="pointer"
                deleteButton.style.border="none"
                deleteButton.style.borderRadius="5px"
                deleteButton.style.backgroundColor="white"
                deleteButton.style.padding="5px"
                deleteButton.style.fontFamily="'Gill Sans MT"
                deleteButton.onclick = function () {
                    deleteNote(index);
                };

                li.appendChild(deleteButton);
                notesList.appendChild(li);
            });

            if (!data.notes) {
                chrome.storage.sync.set({ notes: [] });
            }
        });
    }

    savebutton.addEventListener("click", function () {
        const newNote = inputbox.value.trim();
        if (newNote === "") return; 

        chrome.storage.sync.get("notes", function (data) {
            const notes = Array.isArray(data.notes) ? data.notes : [];
            notes.push(newNote);
            chrome.storage.sync.set({ notes: notes }, function () {
                inputbox.value = ""; 
                loadNotes();
            });
        });
    });

    function deleteNote(index) {
        chrome.storage.sync.get("notes", function (data) {
            if (!Array.isArray(data.notes)) return; 

            let notes = data.notes;
            notes.splice(index, 1);
            chrome.storage.sync.set({ notes: notes }, function () {
                loadNotes();
            });
        });
    }

    loadNotes(); 
});
