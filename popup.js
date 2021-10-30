document.addEventListener("DOMContentLoaded", function() {
    var clickedStart = function() {
        chrome.runtime.sendMessage({ message: 'startScanner' });
    }

    var clickedStop = function() {
        chrome.runtime.sendMessage({ message: 'stopScanner' });
    }
    
    document.getElementById("startScanner").onclick = clickedStart;
    document.getElementById("stopScanner").onclick = clickedStop;
});