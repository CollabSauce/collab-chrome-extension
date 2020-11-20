import '../img/logo192.png'
import '../img/logo512.png'

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { collabSauceExtensionButtonClicked: true });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "collabSauceCaptureScreenshot") {
    createScreenshot(function (dataURL) {
      createImage(dataURL, request.dimensions, function(elementDataURL) {
        sendResponse({ dataURL, elementDataURL });
      });
    });
    return true;
  }
});

// here we create a new image
function createImage(dataURL, dimensions, callback) {
    // create a canvas
    const canvas = createCanvas(dimensions.width, dimensions.height);

    // get the context of your canvas
    const context = canvas.getContext('2d');

    // create a new image object
    const image = new Image();

    image.onload = function() {
      // this is where we manipulate the screenshot (cropping)
      // parameter 1: source image (screenshot)
      // parameter 2: source image x coordinate
      // parameter 3: source image y coordinate
      // parameter 4: source image width
      // parameter 5: source image height
      // parameter 6: destination x coordinate
      // parameter 7: destination y coordinate
      // parameter 8: destination width
      // parameter 9: destination height
      context.drawImage(image,
        dimensions.left, dimensions.top,
        dimensions.width, dimensions.height,
        0, 0,
        dimensions.width, dimensions.height
      );
      // canvas.toDataURL() contains your cropped image
      const elementDataURL = canvas.toDataURL();
      callback(elementDataURL);
    }
    image.src = dataURL; // screenshot (full image)
}

// creates a canvas element
function createCanvas(canvasWidth, canvasHeight) {
  const canvas = document.createElement("canvas");

  // size of canvas in pixels
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  return canvas;
}

// calling the captureVisibleTab method takes a screenhot
function createScreenshot(callback) {
    // you can have two image formats (jpeg and png)
    // for jpeg use { format: "jpeg", quality: 100 } (you can adjust the jpeg image quality from 0-100)
    // for png use { format: "png" }
    chrome.tabs.captureVisibleTab(null, { format: "png" }, callback);
}
