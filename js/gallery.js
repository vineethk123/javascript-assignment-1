let stringImagesInformation = `{
    "image-1": {
      "imageURL": "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=827&q=80",
      "name": "Grass Land",
      "description": "Photo by Robert Lukeman",
      "uploadDate": "16-10-2016"
    },
    "image-2": {
      "imageURL": "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
      "name": "Sea Shore",
      "description": "Photo by Dan Grinwis",
      "uploadDate": "20-06-2018"
    },
    "image-3": {
      "imageURL": "https://images.unsplash.com/photo-1504714146340-959ca07e1f38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80",
      "name": "Floating Houses",
      "description": "Photo by Ali Al Mufti",
      "uploadDate": "06-09-2017"
    },
    "image-4": {
      "imageURL": "https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80",
      "name": "Aurora",
      "description": "Photo by Jonatan Pie",
      "uploadDate": "06-04-2017"
    },
    "image-5": {
      "imageURL": "https://images.unsplash.com/photo-1502318217862-aa4e294ba657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=358&q=80",
      "name": "The Great Rift",
      "description": "Photo by Nate Rayfield",
      "uploadDate": "09-09-2017"
    },
    "image-6": {
      "imageURL": "https://images.unsplash.com/photo-1452990457935-b5638f0c013b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      "name": "Sunlight Through Trees",
      "description": "Photo by Darren Bockman",
      "uploadDate": "17-01-2016"
    }
  }`;

const imagesContainer = document.getElementById("all-image-container");
// Store images information in local storage and retreive it as a JSON object.
localStorage.setItem("images-information", stringImagesInformation);
let retrievedImagesInformation = localStorage.getItem("images-information");
let jsonImagesInformation = JSON.parse(retrievedImagesInformation);

/**
 * Take a JSON object containing multiple images information and render them inside div with
 * id 'images-container'.
 * @param {Object} jsonImagesInformation
 */
function readImagesInformation() {
  let allImageContainers = [];
  for (let [imageId, imageInformation] of Object.entries(
    jsonImagesInformation
  )) {
    allImageContainers.push(
      "<div class=image-container id=" +
        imageId +
        "><img src=" +
        imageInformation.imageURL +
        " data-name=" +
        imageInformation.name +
        " data-description=" +
        imageInformation.description +
        " data-upload-date=" +
        imageInformation.uploadDate +
        " class=gallery-image /> \
          <div class=overlay></div> \
          <button onclick=removeImage('" +
        imageId +
        "') >Remove</button> \
        </div>"
    );
  }
  imagesContainer.innerHTML = allImageContainers.join("");
}

function addImage() {}

function removeImage(imageContainerId) {
  console.log(imageContainerId);
  delete jsonImagesInformation[imageContainerId];
  readImagesInformation();
}

readImagesInformation();
