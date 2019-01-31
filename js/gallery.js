readImagesInformation = () => {
  $.getJSON("resources/image_info.json", function(jsonImagesInformation) {
    let imageContainer = document.getElementById("image-container");
    let allImageTags = [];
    $.each(jsonImagesInformation, function(imageId, imageInformation) {
      allImageTags.push(
        "<img src=" +
          imageInformation.imageURL +
          " data-name=" +
          imageInformation.name +
          " data-description=" +
          imageInformation.description +
          " data-upload-date=" +
          imageInformation.uploadDate +
          " class=gallery-image />"
      );
    });
    $("<div/>", {
      id: "image-container",
      html: allImageTags.join(" ")
    }).appendTo(".site-content");
  });
};

readImagesInformation();
