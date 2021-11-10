// Saves options to chrome.storage
const save_options = () => {
    const modelNumbers = document.getElementById('modelNumbers').value;
    const maxRefreshCount = document.getElementById('maxRefreshCount').value;
    
    chrome.storage.sync.set({
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
    chrome.storage.sync.get({
        modelNumbers: '10G-P5-3897-RX,08G-P5-3667-RX,10G-P5-3885-RX|08G-P5-3665-RX,08G-P5-3663-RX,10G-P5-3895-RX,10G-P5-3883-RX,10G-P5-3881-RX|08G-P5-3767-RX,08G-P5-3755-RX,08G-P5-3753-RX,08G-P5-3751-RX,10G-P5-3898-RX,10G-P5-3888-RX,10G-P5-3899-RX,10G-P5-3889-RX|24G-P5-3987-RX,24G-P5-3985-RX,24G-P5-3975-RX,24G-P5-3973-RX,24G-P5-3971-RX,24G-P5-3988-RX,24G-P5-3989-RX,24G-P5-3978-RX,24G-P5-3998-RX,24G-P5-3999-RX,24G-P5-3979-RX|10G-P5-3897-RL,10G-P5-3885-RL,10G-P5-3895-RL,10G-P5-3883-RL,10G-P5-3881-RL,10G-P5-3898-RL,10G-P5-3888-RL,10G-P5-3899-RL,10G-P5-3889-RL,08G-P5-3767-RL,08G-P5-3755-RL,08G-P5-3751-RL,08G-P5-3753-RL,12G-P5-3657-RX,12G-P5-3655-RX|08G-P5-3667-RL,08G-P5-3663-RL,08G-P5-3665-RL,08G-P5-3797-RX,08G-P5-3785-RX,08G-P5-3783-RX,12G-P5-3967-RX,12G-P5-3953-RX,12G-P5-3968-RX,12G-P5-3958-RX,12G-P5-3969-RX,12G-P5-3959-RX|06G-P4-1061-RX,06G-P4-1066-RX,06G-P4-1068-RX',
        maxRefreshCount: '2'
    }, (items) => {
        document.getElementById('modelNumbers').value = items.modelNumbers;
        document.getElementById('maxRefreshCount').value = items.maxRefreshCount;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);