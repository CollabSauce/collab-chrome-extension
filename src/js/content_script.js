// Code running in a Chrome extension
let onStartAlreadyCalled = false;
window.chrome.runtime.onMessage.addListener((request) => {
  if (request.collabSauceExtensionButtonClicked) {
    if (onStartAlreadyCalled) {
      const message = { type: 'chromeExtensionShowIframe' };
      window.postMessage(JSON.stringify(message), '*');
    } else {
      onStartAlreadyCalled = true;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = process.env.WIDGET_URL + '?isCollabSauceChromeExtension=true';
      document.body.append(script);

      // listen on messages from collab-communicator repo
      window.addEventListener('message', receiveMessage);
    }
  }
});

const receiveMessage = (e) => {
  try {
    const message = JSON.parse(e.data);
    if (message.type === 'collabSauceCaptureScreenshot') {
      chrome.runtime.sendMessage(message, function(result) {
        const message = { type: 'collabSauceScreenshotResult', ...result };
        window.postMessage(JSON.stringify(message), '*');
      });
    }
  } catch (err) {
    return;
  }
};

