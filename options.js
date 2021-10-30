// Saves options to chrome.storage
const save_options = () => {
    const modelNumbers = document.getElementById('modelNumbers').value;

    chrome.storage.sync.set({
        modelNumbers: modelNumbers
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
    chrome.storage.sync.get({
        modelNumbers: ''
    }, (items) => {
        document.getElementById('modelNumbers').value = items.modelNumbers;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);