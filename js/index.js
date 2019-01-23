validateForm = () => {
  let nameInputElement = document.getElementById("sender-name");
  let emailInputElement = document.getElementById("sender-email");
  let formElement = document.getElementById("contact-form");
  if (nameInputElement.checkValidity() && emailInputElement.checkValidity()) {
    alert("Deatils Successfully Submitted");
    formElement.reset();
    return true;
  } else {
    document.getElementById("submission-status").innerHTML = "";
    return false;
  }
};
