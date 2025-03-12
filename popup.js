document.addEventListener("DOMContentLoaded",function(){
    const inputbox=document.getElementById("notes");
    const savebutton=document.getElementById("saveButton");

    chrome.storage.sync.get("notes",function(data){
        if(data.note){
            inputbox.value=data.note;
        }
    });

    savebutton.addEventListener("click",function(){
        chrome.storage.sync.set({note:inputbox.value},function(){
            alert("note saved");
        })
    });
})