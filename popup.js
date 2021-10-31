document.addEventListener("DOMContentLoaded", () => {
    const clickedStart = () => {
        chrome.runtime.sendMessage({ message: 'startScanner' });
    }

    const clickedStop = () => {
        chrome.runtime.sendMessage({ message: 'stopScanner' });
    }
    
    document.getElementById("startScanner").onclick = clickedStart;
    document.getElementById("stopScanner").onclick = clickedStop;
});