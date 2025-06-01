
/* global chrome */
let intervalId = null;

function startInterval() {

  if (intervalId === null) {
    intervalId = setInterval(checkForConfirmation, 10000);
    return true
  }
  return false
}

function checkForConfirmation() {
    let confirmElement = document.getElementById('confirm')
    let confirmElementStyles = window.getComputedStyle(confirmElement)
    if(confirmElementStyles.display !== "none")
        confirmElement.click()
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    return false
  }
  return true
}

// Start on load
checkForConfirmation();
startInterval();
// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "getStatus") {
    sendResponse({ running: intervalId !== null });
  } else if (request.command === "start") {
    let isRunning = startInterval();
    sendResponse({ running: isRunning });
  } else if (request.command === "stop") {
    let isRunning = stopInterval();
    sendResponse({ running: isRunning });
  }
});