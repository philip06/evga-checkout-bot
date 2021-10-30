let scannerRunning = false;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.message) {
        case 'startScanner':
            scannerRunning = true;
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(tabs[0].id,
                    { file: `discordScanner.js` });
            });
            
            break;
        case 'stopScanner':
            scannerRunning = false;
            break;
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && scannerRunning) {
        if (tab?.url && tab.url.indexOf("discord.com") !== -1) {
            chrome.tabs.executeScript(tabId,
                { file: `discordScanner.js` });
        } else if (tab?.url && tab.url.indexOf("evga.com/products/productlist.aspx") !== -1) {
            chrome.tabs.executeScript(tabId,
                { file: `evgaAddToCart.js` });
        } else if (tab?.url && tab.url.indexOf("evga.com/products/shoppingcart.aspx") !== -1) {
            chrome.tabs.executeScript(tabId, { 
                code: `
                    if(document.querySelector("#LFrame_pnlMain > table > tbody > tr.cart-total").textContent.includes("$0.00")) {
                        window.location.href = "https://www.evga.com/products/productlist.aspx?type=8";
                    } else {
                        document.querySelector("#LFrame_CheckoutButton").click();
                    }
                ` 
            });
        } else if (tab?.url && tab.url.indexOf("evga.com/Cart/Checkout_Shipping.aspx") !== -1) {
            chrome.tabs.executeScript(tabId,
                { file: `evgaCheckoutShipping.js` });
        } else if (tab?.url && tab.url.indexOf("evga.com/Cart/Checkout_Payment.aspx") !== -1) {
            chrome.tabs.executeScript(tabId,
                { file: `evgaCheckoutPayment.js` });
        } else if (tab?.url && (tab.url.indexOf("paypal.com/cgi-bin/webscr") !== -1 || tab.url.indexOf("paypal.com/webapps") !== -1)) {
            chrome.tabs.executeScript(tabId,
                { file: `paypalHandler.js` });
        } else if (tab?.url && tab.url.indexOf("evga.com/Cart/Checkout_PlaceOrder.aspx") !== -1) {
            chrome.tabs.executeScript(tabId, { 
                    code: `
                        document.querySelector("#ctl00_LFrame_cbAgree").click();
                        window.location.href = "https://www.evga.com/products/productlist.aspx?type=8";
                    ` 
            });

            // final submission button, add to above script execution to actually buy item
            // document.querySelector("#ctl00_LFrame_btncontinue").click();
        }
    }
  });