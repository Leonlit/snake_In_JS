//if the key is tab or alt don't move to the next field or unfocus the current field
window.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    if (key == 9 || key == 18) event.preventDefault();
});

//settings section
function changeDirectionKey (event) {
    //target - the elements id so that I could change the value in that elements field
    //inputField = selecting the input tag using the id provided from the event parameter
    //code - key code of the button pressed
    //duplicate - check whether the character already present in the directionKey array
    let target = event.target.id,
        inputField = document.getElementById(target),
        code = event.keyCode,
        text = "",
        duplicate = directionKey.includes(code);

    //check if the keycode is not a special character
    if ((code >= 48 && code <= 57) || (code <= 90 && code >=  65) || (code >= 37 && code <= 40) ){
        text = String.fromCharCode(code).toLocaleLowerCase()
        //check whether there's a same key inside the direction array, if yes then dont change the key
        if (!duplicate) {
            changeTheKey(target, code);
        }else{
            //if the value is duplicated and the character is an alphabets or number,
            //remove the newly added text while keep the previous character
            let input = inputField.value;
            text = input.replace(text, '');
        }
    }else {
        //if the character is a 
        let string = inputField.value;
        text = string.replace(string[event.target.selectionStart - 1],"");
    }
    inputField.value = text;
}

function changeTheKey (target, code) {
    //dont support special character
    //switch the key according to the changes
    switch (target) {
        case "keyForLeft":
            directionKey[0] = code;
        break;

        case "keyForUp":
            directionKey[1] = code;
        break;

        case "keyForRight":
            directionKey[2] = code;
        break;
            
        case "keyForDown":
            directionKey[3] = code;
        break;
        default:
            console.log("something went wrong");
    }
}

//incase the field is empty, use back default controls
function checkForBlank (event) {
    let target = event.target.id,
    inputField = document.getElementById(target);
    if (inputField.value == "") {
        switch (target) {
            case "keyForLeft":
                directionKey[0] = defaultDirectionKey[0]
            break;

            case "keyForUp":
                directionKey[1] = defaultDirectionKey[1]
            break;

            case "keyForRight":
                    directionKey[2] = defaultDirectionKey[2]
            break;
                
            case "keyForDown":
                    directionKey[3] = defaultDirectionKey[3]
            break;
            default:
                console.log("something went wrong");
        }
    }
}