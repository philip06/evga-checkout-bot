console.log("paypal integration handler script started");

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


checkElement('#payment-submit-btn') //use whichever selector you want
.then(() => {
	 document.querySelector("#payment-submit-btn").click();
});