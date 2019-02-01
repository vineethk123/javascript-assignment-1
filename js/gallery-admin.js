const stringImagesInformation = `{
  "image-1": {
    "imageURL": "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=827&q=80",
    "name": "Grass Land",
    "description": "Photo by Robert Lukeman",
    "uploadDate": "2016-10-16"
  },
  "image-2": {
    "imageURL": "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
    "name": "Sea Shore",
    "description": "Photo by Dan Grinwis",
    "uploadDate": "2018-06-20"
  },
  "image-3": {
    "imageURL": "https://images.unsplash.com/photo-1504714146340-959ca07e1f38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80",
    "name": "Floating Houses",
    "description": "Photo by Ali Al Mufti",
    "uploadDate": "2017-09-06"
  },
  "image-4": {
    "imageURL": "https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
    "name": "Aurora",
    "description": "Photo by Jonatan Pie",
    "uploadDate": "2017-04-06"
  },
  "image-5": {
    "imageURL": "https://images.unsplash.com/photo-1502318217862-aa4e294ba657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=358&q=80",
    "name": "The Great Rift",
    "description": "Photo by Nate Rayfield",
    "uploadDate": "2017-09-09"
  },
  "image-6": {
    "imageURL": "https://images.unsplash.com/photo-1452990457935-b5638f0c013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "name": "Sunlight Through Trees",
    "description": "Photo by Darren Bockman",
    "uploadDate": "2016-01-07"
  }
}`;

// Store images information in local storage and retreive it as a JSON object.
localStorage.setItem("images-information", stringImagesInformation);
let retrievedImagesInformation = localStorage.getItem("images-information");
let jsonImagesInformation = JSON.parse(retrievedImagesInformation);

const imagesContainer = document.getElementById("all-image-container");
let modal = document.getElementById("modal");

/**
 * Take a JSON object containing multiple images information and render them inside div with
 * id 'images-container'.
 * @param {Object} jsonImagesInformation
 */
function renderImages() {
  let allImageContainers = [];
  for (let [imageId, imageInformation] of Object.entries(
    jsonImagesInformation
  )) {
    let editButtonHTML =
      "<button class='hover-button edit-button' onclick=editImage('" +
      imageId +
      "')>Edit</button>";
    let removeButtonHTML =
      "<button class='hover-button remove-button' onclick=removeImage('" +
      imageId +
      "')>Remove</button>";
    let imageHTML =
      "<img src=" +
      imageInformation.imageURL +
      " data-name=" +
      imageInformation.name +
      " data-description=" +
      imageInformation.description +
      " data-upload-date=" +
      imageInformation.uploadDate +
      " class=gallery-image />";
    allImageContainers.push(
      "<div class=image-container id=" +
        imageId +
        ">" +
        imageHTML +
        "<div class=overlay></div>" +
        editButtonHTML +
        removeButtonHTML +
        "</div>"
    );
  }
  imagesContainer.innerHTML = allImageContainers.join("");
}

/**
 * Set the heading for the modal and display it.
 */
function addImage() {
  modal.querySelector("#modal-heading").innerHTML = "Add Image";
  modal.style.display = "block";
}

/**
 * Set the heading of the modal, populate the form with the corresponding image information and show it.
 */
function editImage(imageId) {
  modal.querySelector("#modal-heading").innerText = "Edit Image";
  modal
    .querySelector("div[data-image-id]")
    .setAttribute("data-image-id", imageId);
  populateForm(imageId);
  modal.style.display = "block";
}

function populateForm(imageId) {
  let targetImageInformation = jsonImagesInformation[imageId];
  document.getElementById("image-url").value = targetImageInformation.imageURL;
  document.getElementById("image-name").value = targetImageInformation.name;
  document.getElementById("image-description").value =
    targetImageInformation.description;
  document.getElementById("image-upload-date").value =
    targetImageInformation.uploadDate;
}

/**
 * Remove an image in the specified div id.
 * @param {string} imageContainerId
 */
function removeImage(imageContainerId) {
  delete jsonImagesInformation[imageContainerId];
  renderImages();
}

function validateImageInformation() {
  let imageURLElement = document.getElementById("image-url");
  let imageName = document.getElementById("image-name").value;
  let imageDescription = document.getElementById("image-description").value;
  let uploadDateString = document.getElementById("image-upload-date").value;
  let uploadDate = new Date(uploadDateString),
    currentDate = new Date();
  let newImageInformation = {
    imageURL: imageURLElement.value,
    name: imageName,
    description: imageDescription,
    uploadDate: uploadDateString
  };
  if (imageURLElement.checkValidity()) {
    if (currentDate >= uploadDate) {
      updateImageInformation(newImageInformation);
    } else {
      alert("Your upload date shouldn't point to future dates");
    }
  } else {
    alert("Invalid image URL");
  }
}

function updateImageInformation(newImageInformation) {
  let imageId = modal
    .querySelector("div[data-image-id]")
    .getAttribute("data-image-id");
  if (imageId === "-1") {
    let currentImageIndex = Object.keys(jsonImagesInformation).length + 1;
    jsonImagesInformation["image-" + currentImageIndex] = newImageInformation;
  } else {
    jsonImagesInformation[imageId] = newImageInformation;
  }
  hideModal();
  renderImages();
}

/**
 * Refresh the form and hide the modal.
 */
function hideModal() {
  modal.style.display = "none";
  modal.querySelector("#image-info-form").reset();
}

renderImages();

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(clickEvent) {
  if (clickEvent.target == modal) {
    hideModal();
  }
};
