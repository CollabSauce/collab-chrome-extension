import '../img/logo192.png'
import '../img/logo512.png'


console.log("BEFOER ANTYTHING")
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('in here');
  chrome.tabs.sendMessage(tab.id, { collabSauceExtensionButtonClicked: true });
  // console.log(arguments);
  // chrome.tabs.executeScript(tab.id, {file: "/extension/content_script.js"});
});
