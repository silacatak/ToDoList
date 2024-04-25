// Selectors 
const TASK_INPUT = document.querySelector(`#task`);
const TASK_LIST = document.querySelector(`#list`);
const TASK_LIST_ALL = document.querySelector(`#list li`);
const BUTTON_DOM = document.querySelector(`#liveToastBtn`);
const TOAST_SUCCESS = document.querySelector(`.toast,success`);
const TOAST_ERROR = document.querySelector(`.toast.error`);

// variables
const arrayTaskList = localStorage.getItem("Tasks") ? JSON.parse(localStorage.getItem("Tasks")): [] ;

//onload
window.onload = function(){

    // Calling display function to show stored tasks
    displayItems();

    // trigger "EKLE" button on press enter
    TASK_INPUT.addEventListener("keyprees", function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            BUTTON_DOM.click();
        };
    });
};

//handlers


//function to shpw stored tasks
function displayItems(){
    
    for(var i =0 ; i < arrayTaskList.length; i++){

        //create li element
        var liNode = document.createElement(`li`);

        //create li value from the array
        var liNodeTxt = document.createTextNode(arrayTaskList[i]);

        //assing li element to its parrent node(ul)
        TASK_LIST.appendChild(liNode);

        //assing li value to inside li
        liNode.appendChild(liNodeTxt);

        //add onclick function for toggle checked class when click on li element
        liNode.setAttribute(`onclick` , `addCheckedClass(event)`);

        //create span element as a li's child (delete task button)
        var spanNode = document.createElement(`span`);

        //assing span element to its parrent node (li)
        liNode.appendChild(spanNode);

        //write delete icon to span's inner Text
        spanNode.innerHTML= "&times;"; //delete button icon
        
        //add close class to span 's class attribute
        spanNode.setAttribute(`class`,`close`);

        //add Delete delete function to span's onclick attribute
        spanNode.setAttribute(`onclick`, `deleteElement(event)`);

 }
};


function newElement(){
    if(TASK_INPUT.value == null || TASK_INPUT.value.trim() ==``){

        //trigger livetoast error
        $(TOAST_ERROR).toast(`show`);

        //add red background and white text color to live toast
        TOAST_ERROR.classList.add(`bg-danger`,`text-light`);

        TASK_INPUT.value = ``;
    }else{
        //push the value to array
        arrayTaskList.push(TASK_INPUT.value);

        //update the localstorage from array
        localStorage.setItem(`Tasks`, JSON.stringify(arrayTaskList))


    //create li element
    var liNode = document.createElement(`li`);

    //create li value with the value of task input
    var liNodeTxt = document.createTextNode(TASK_INPUT.value);

    //assing li element to its parrent node(ul)
    TASK_LIST.appendChild(liNode);

    //assing li value to inside li
    liNode.appendChild(liNodeTxt);

    //add onclick function for toggle checked class when click on li element
    liNode.setAttribute(`onclick` , `addCheckedClass(event)`);

    //create span element as a li's child (delete task button)
    var spanNode = document.createElement(`span`);

    //assing span element to its parrent node (li)
    liNode.appendChild(spanNode);

    //write delete icon to span's inner Text
    spanNode.innerHTML= "&times;"; //delete button icon
    
    //add close class to span 's class attribute
    spanNode.setAttribute(`class`,`close`);

    //add Delete delete function to span's onclick attribute
    spanNode.setAttribute(`onclick`, `deleteElement(event)`);


    //triger liveToast success
    $(TOAST_SUCCESS).toast(`show`);

    //add green background and white text color to live toast
    TOAST_SUCCESS.classList.add(`bg-success`, `text-light`)

    //clear the input field
    TASK_INPUT.value = ``;
    }
}



//function for delete selected tasks
function deleteElement(){
     
    //GET THE NODE NAME WHEN CLİCK ON THE ELEMENT
    let node = event.target; 

    // get the array index no from the node value
    let arrayIndexOfNodeValue = arrayTaskList.indexOf(node.parentNode.childNodes[0].nodeValue);

    //delete from array
    arrayTaskList.splice(arrayIndexOfNodeValue, 1)

    //update localstorage from array
    localStorage.setItem(`Tasks`, JSON.stringify(arrayTaskList));

    //delete li element
    node.parentNode.remove();

};

//events

//function for add checked class event
function addCheckedClass(event){
    //select clicked element node
    let node = event.target;
    //add checked to selected node's classList
    node.classList.toggle(`checked`);
}