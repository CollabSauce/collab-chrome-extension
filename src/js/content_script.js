// Code running in a Chrome extension
let onStartCalled = false;
console.log('BEFORE MESSAGE');
window.chrome.runtime.onMessage.addListener((request) => {
  console.log('onMESSAGE');
  if (request.collabSauceExtensionButtonClicked) {
  	if (onStartCalled) {

  	} else {
	    onStartCalled = true;
	    console.log('onStart');
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = process.env.WIDGET_URL;
	    document.body.append(script);
  	}
  }
});
