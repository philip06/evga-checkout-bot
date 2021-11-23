// Saves options to chrome.storage
const save_options = () => {
    let modelNumbers = document.getElementById('modelNumbers').value;
    let maxRefreshCount = document.getElementById('maxRefreshCount').value;

    chrome.storage.local.set({
        modelNumbers,
        maxRefreshCount
    }, () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restore_options = () => {
    chrome.storage.local.get([
        'modelNumbers',
        'maxRefreshCount'
    ], (items) => {
        document.getElementById('modelNumbers').value = items.modelNumbers;
        document.getElementById('maxRefreshCount').value = items.maxRefreshCount;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);