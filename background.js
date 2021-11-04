let refreshCount = 0;
let refreshMax = 1;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.message) {
        case 'startScanner':
            chrome.storage.local.set({ scannerRunning: true });
            refreshCount = 0;
            
            chrome.storage.sync.get({
                maxRefreshCount: '2'
            }, (items) => {
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
                } else if (tab?.url && tab.url.includes("evga.com/products/productlist.aspx")) {
                    console.log("add to cart");
                    chrome.scripting.executeScript({
                        target: { tabId },
                        files: [`evgaAddToCart.js`] 
                    });
                } else if (tab?.url && tab.url.includes("evga.com/products/shoppingcart.aspx")) {
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