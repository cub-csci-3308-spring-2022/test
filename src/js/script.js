document.addEventListener('keypress', (event) => {
    if (event.key === 'l') {
        var overlay = document.getElementById("overlay");
        overlay.style.display
    }
});

//handle forms
attachFormSubmitEvent("loginForm", "./api/login")


// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId, postURL) {
    document.getElementById(formId).addEventListener("submit", (event) => {
    var request = new XMLHttpRequest();
    request.open('POST', postURL, true);
    request.onload = function() { // request successful
    // we can use server response to our request now
      console.log(request.responseText);
    };
  
    request.onerror = function() {
      // request failed
    };
  
    request.send(new FormData(event.target)); // create FormData from form that triggered event
    event.preventDefault();
    });
}
