const checkbox = document.getElementById("toggle");

function checkHostname() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (tab) {
        var url = new URL(tab.url);
        var domain = url.hostname;
        if(!domain.includes('aternos'))
        {
            // show not allowed
            document.getElementById('not-allowed').style.display = 'flex';
            document.getElementById('main-container').style.display = 'none';
        }
    }
    });
}
    // Send a message to the content script in the active tab
function sendMessageToContentScript(msg, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });
}

// Get initial status on popup open
sendMessageToContentScript({ command: "getStatus" }, (response) => {
    if (response?.running) {
    checkbox.checked = true;
    } else {
    checkbox.checked = false;
    }
});

// Handle switch change
checkbox.addEventListener("change", () => {
    const command = checkbox.checked ? "start" : "stop";
    sendMessageToContentScript({ command: command }, (response) => {
    });
});

checkHostname()