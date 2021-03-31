console.log('Welcome to Stick Note.js');
// display notes that are stored even after reload...
displayNotes();

// If User Add A note Then dd it to Local Storage...........

// addBtn is defined whoose id was addBtn ie addnote wala button...
let addBtn = document.getElementById('addBtn');
// if user clicks then function..
addBtn.addEventListener('click', function (e) {

    // accesing text area ...in addTxt from  its id
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // blank array of objects name notesObj
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }

    let impObj = {
        addTitle:addTitle.value,
        addTxt:addTxt.value
    }
    // after click we push it..
    notesObj.push(impObj);
    // we have to convert our array to string ...kind of a rule in localstorage!!!
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // then we clear the textarea so that another note can be written..
    addTitle.value= "";
    addTxt.value = "";

    // console.log(notesObj);

    // calling the function which displays the notes ...
    displayNotes();
})

// function to display the notes from local storage...
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // blank array of name notesObj
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        // append the cards..
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.addTitle}</h5>
                    <p class="card-text">${element.addTxt}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `;
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `No notes to display.."Add Notes" add to display here. `
    }

}

// function to deleta a note..
function deleteNote(index){

    // console.log(`i m deleting`,index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // blank array of name notesObj
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }  
    
    // deleteing 
    notesObj.splice(index, 1);
    // we have to update localstorge as well ...
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
    
}

// building search feature........

let search= document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputValue=search.value.toLowerCase();

    // console.log('Input function event running!!!',inputValue);

    // accesing all notecards elements in'noteCards'
    let noteCards= document.getElementsByClassName('noteCard');

    // for all notecards saving the content in 'cardTxt' 
    Array.from(noteCards).forEach(function(element){
        // grabbing the paragraph and heading in card .. string type(we can use include property)
        let cardTxt= element.getElementsByTagName("p")[0].innerText;
        let cardTitle= element.getElementsByTagName("h5")[0].innerText;
        if(cardTxt.includes(inputValue)){
            element.style.display = "block";
        }
        else if(cardTitle.includes(inputValue)){
            element.style.display = "block";
        }

        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
