console.log("evga place order script started");

// Callback functions executed when mutation occurs
function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}

document.querySelector("#ctl00_LFrame_cbAgree").click();

checkElement('#ctl00_LFrame_cbPayPalSignature')
.then(() => {
    document.querySelector("#ctl00_LFrame_cbPayPalSignature").click();
});

// checkElement('#ctl00_LFrame_btncontinue') //use whichever selector you want
// .then(() => {
// 	 document.querySelector("#ctl00_LFrame_btncontinue").click();
// });