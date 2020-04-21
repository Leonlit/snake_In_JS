//if the key is tab or alt don't move to the next field or unfocus the current field
window.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    if (key == 9 || key == 18) event.preventDefault();
});

//settings section
function changeDirectionKey (event) {
    let target = event.target.id,
        inputField = document.getElementById(target),
        text = inputField.value,
        code = event.keyCode;

    //check whether there's a same key inside the direction array, if yes then dont change the key
    if (!directionKey.includes(code)) {
        console.log("doesnt exists");

        if (text.length > 1) {
            text = text.slice(text.length - 1);
        }

        //dont support shift , ctrl and alt
        if ((code >= 16 && code <= 18) || (code >= 112 && code <= 123)) {
            text = "";
        }else if (code < 48 || code > 90 ) {
            text = event.code;
        }

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
    }else {
        console.log("exists")
        text = text.slice(0, text.length - 1);
    }
    inputField.value = text;
}