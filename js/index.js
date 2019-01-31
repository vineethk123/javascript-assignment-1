/** Check if the details entered are valid and show a status pop-up */
validateForm = () => {
  let nameInputElement = document.getElementById("sender-name");
  let emailInputElement = document.getElementById("sender-email");
  let formElement = document.getElementById("contact-form");
  if (nameInputElement.checkValidity() && emailInputElement.checkValidity()) {
    alert("Details Successfully Submitted");
    formElement.reset();
    return true;
  } else {
    document.getElementById("submission-status").innerHTML = "";
    return false;
  }
};

// Load nav-bar from a html file.
$(function() {
  $(".nav-container").load("nav-bar.html");
});
