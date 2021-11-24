let refreshCount = 0;
let refreshMax = 2;

chrome.storage.local.get(['modelNumbers', 'maxRefreshCount'], item => {
    if (item.modelNumbers === 'undefined' || !item.modelNumbers) {
        chrome.storage.local.set({
            modelNumbers: "01G-P3-1313-RX,10G-P5-3897-RX,08G-P5-3667-RX,10G-P5-3885-RX|08G-P5-3665-RX,08G-P5-3663-RX,10G-P5-3895-RX,10G-P5-3883-RX,10G-P5-3881-RX|08G-P5-3767-RX,08G-P5-3755-RX,08G-P5-3753-RX,08G-P5-3751-RX,10G-P5-3898-RX,10G-P5-3888-RX,10G-P5-3899-RX,10G-P5-3889-RX|24G-P5-3987-RX,24G-P5-3985-RX,24G-P5-3975-RX,24G-P5-3973-RX,24G-P5-3971-RX,24G-P5-3988-RX,24G-P5-3989-RX,24G-P5-3978-RX,24G-P5-3998-RX,24G-P5-3999-RX,24G-P5-3979-RX|10G-P5-3897-RL,10G-P5-3885-RL,10G-P5-3895-RL,10G-P5-3883-RL,10G-P5-3881-RL,10G-P5-3898-RL,10G-P5-3888-RL,10G-P5-3899-RL,10G-P5-3889-RL,08G-P5-3767-RL,08G-P5-3755-RL,08G-P5-3751-RL,08G-P5-3753-RL,12G-P5-3657-RX,12G-P5-3655-RX|08G-P5-3667-RL,08G-P5-3663-RL,08G-P5-3665-RL,08G-P5-3797-RX,08G-P5-3785-RX,08G-P5-3783-RX,12G-P5-3967-RX,12G-P5-3953-RX,12G-P5-3968-RX,12G-P5-3958-RX,12G-P5-3969-RX,12G-P5-3959-RX|06G-P4-1061-RX,06G-P4-1066-RX,06G-P4-1068-RX"
        });
    }
    
    if (item.maxRefreshCount === 'undefined' || !item.maxRefreshCount) {
        chrome.storage.local.set({
            maxRefreshCount: 2
        });
    }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.message) {
        case 'startScanner':
            chrome.storage.local.set({ scannerRunning: true });
            refreshCount = 0;
            
            chrome.storage.local.get("maxRefreshCount", (items) => {
                refreshMax = parseInt(items.maxRefreshCount);
            });
            
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        window.location.href = "https://discord.com/channels/767566223729754122/869681156797390849";
                    } 
                });
            });
            
            break;
        case 'stopScanner':
            refreshCount = 0;
            chrome.storage.local.set({ scannerRunning: false });

            chrome.tabs.reload(sender.id);
            break;
        case 'canRefreshBStock':
            if (refreshCount < refreshMax) {
                refreshCount++;
                sendResponse(true);
            } else {
                sendResponse(false);
            }
            break;
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get('scannerRunning', (res) => {
            console.log(res.scannerRunning);
            if (res.scannerRunning) {
                if (tab?.url && tab.url.includes("discord.com")) {
                    refreshCount = 0;
                    chrome.scripting.executeScript({
                        target: { tabId },
                        files: [`discordScanner.js`]
                    });
                } else if (tab?.url && tab.url.toLowerCase().includes("evga.com/products/productlist.aspx")) {
                    console.log("add to cart");
                    chrome.scripting.executeScript({
                        target: { tabId },
                        files: [`evgaAddToCart.js`] 
                    });
                } else if (tab?.url && tab.url.toLowerCase().includes("evga.com/products/shoppingcart.aspx")) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        func: () => {
                            if(document.querySelector("#LFrame_pnlMain > table > tbody > tr.cart-total").textContent.includes("$0.00")) {
                                if (document.querySelector("#LFrame_CartRepeater_RemoveButton_0")) {
                                    document.querySelector("#LFrame_CartRepeater_RemoveButton_0").click();
                                }
                                window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
                            } else {
                                document.querySelector("#LFrame_CheckoutButton").click();
                            }
                        }
                    });
                } else if (tab?.url && tab.url.includes("evga.com/Cart/Checkout_Shipping.aspx")) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        files: [`evgaCheckoutShipping.js`] 
                    });
                } else if (tab?.url && tab.url.includes("evga.com/Cart/Checkout_Payment.aspx")) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        files: [`evgaCheckoutPayment.js`] 
                    });
                } else if (tab?.url && (tab.url.includes("paypal.com/cgi-bin/webscr") || tab.url.includes("paypal.com/webapps"))) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        files: [`paypalHandler.js`]
                    });
                } else if (tab?.url && tab.url.includes("evga.com/Cart/Checkout_PlaceOrder.aspx")) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        files: [`evgaPlaceOrder.js`]
                    });
                } else if (tab?.url && tab.url.includes("evga.com/Cart/Checkout_Success.aspx")) {
                    chrome.scripting.executeScript({
                        target: { tabId }, 
                        func: () => {
                            window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
                        }
                    });
                }
            }
        });
    }
  });