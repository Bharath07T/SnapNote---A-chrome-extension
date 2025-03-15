document.addEventListener("DOMContentLoaded", function () {
    const inputbox = document.getElementById("notes");
    const savebutton = document.getElementById("saveButton");
    const notesList = document.getElementById("noteslist");

    function loadNotes() {
        chrome.storage.sync.get("notes", function (data) {
            notesList.innerHTML = ""; 
            const notes = Array.isArray(data.notes) ? data.notes : [];

            notes.forEach((note, index) => {                
                const listContainer=document.createElement("div");
                listContainer.style.display="flex";
                listContainer.style.alignItems="center";
                listContainer.style.justifyContent="space-between";
                listContainer.style.marginBottom="5px";

                const li = document.createElement("li");
                li.textContent = note;
                const wordCount = note.trim().split(/\s+/).length; 
                if (wordCount <= 50) {
                    li.style.backgroundColor = "rgb(135,206,250)"; // Small Note (Red)
                } else if (wordCount <= 150) {
                    li.style.backgroundColor = "#D4EDDA"; // Medium Note (Green)
                } else {
                    li.style.backgroundColor = "#FFF3CD"; // Large Note (Yellow)
                }
                li.style.listStyleType="none"
                li.style.padding="10px"
                li.style.alignItems="center"
                li.style.justifyContent="center"
                li.style.borderRadius="5px"
                li.style.width="80%"
                li.style.marginLeft="-10px"
                li.style.fontFamily="'Gill Sans MT"
                li.style.marginTop="2%"
                li.style.boxShadow="0px 0px 4px rgba(0,0,0,0.2)"
                li.style.marginBottom="5%"
                li.style.flexGrow="1"
                li.style.fontSize="16px"

                const deleteButton = document.createElement("img");
                deleteButton.src = "assets/bin.png"; 
                deleteButton.alt = "Delete";
                deleteButton.style.cursor = "pointer";
                deleteButton.style.width = "20px"; 
                deleteButton.style.height = "20px";
                deleteButton.style.marginLeft="5px";
                deleteButton.style.marginTop="-10px"

                deleteButton.onclick = function () {
                    deleteNote(index);
                };

                listContainer.appendChild(li);
                listContainer.appendChild(deleteButton);
                notesList.appendChild(listContainer);
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
