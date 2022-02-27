document.addEventListener('keypress', (event) => {
  if (event.key === 'l') {
    var overlay = document.getElementById("overlay");
    overlay.hidden = !overlay.hidden;
  }
});
//do all the load stuff
window.onload += function () {
  attachFormSubmitEvent("loginForm");
}

function toggleOverlay(overlay) {
  var o = document.getElementById(overlay);
  o.hidden = !o.hidden;
}
//handle forms


// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId) {
  /**
   * @type {HTMLFormElement}
   */
  var form = document.getElementById(formId);
  form.addEventListener('submit', formSubmit, false);
}
/**
 * 
 * @param {SubmitEvent} event 
 */
function formSubmit(event) {

  event.preventDefault();
  var postURL = event.target.getAttribute('data-url');
  
  console.log(event.target);
  var data = {};
  new FormData(event.target).forEach((v,k)=> data[k] = v);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(postURL, options)
    .then(res => res.json())
    .then(res => {
      //this is where all of the login is handled
      if("session"in res) {
        document.cookie = `session=${res.session}; path=/;` 
      } else {
        console.log("Handle login fail");
      } 

    })
    .catch(err => console.log(err));
  document.cookie = "login=true;"
  return false;
}

const s = (x,y) => x+y;