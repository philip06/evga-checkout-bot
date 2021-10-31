console.log("evga checkout shipping script started");

// Callback functions executed when mutation occurs
const mCallbackAddress = (mutations, observer) => {
	for (let mutation of mutations) {
		if (mutation.type === 'attributes' && mutation.attributeName === "style") {
			observer.disconnect();
			console.log("Selecting address");
			document.querySelector("#modalSuggestAddress > div > div.button__block > input.button.btnCheckoutContinue").click();
		}
	}
}

const mCallbackShipCheck = (mutations, observer) => {
	for (let mutation of mutations) {
		if (mutation.type === 'attributes' && mutation.attributeName === "style") {
			observer.disconnect();
			console.log("Selecting ship checkbox");
			document.querySelector("#cbAgree").click();
			document.querySelector("#ctl00_LFrame_btncontinue").click();
		}
	}
}

// pointers to dom elements we are watching for change
const modal = document.querySelector('#modalSuggestAddress');
const shipCheckButtonWrapper = document.querySelector("#divShipFee");

// if elements don't exist, nagivate back to b stock page and continue
if (!modal || !shipCheckButtonWrapper) {
	window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
}

const observerAddress = new MutationObserver(mCallbackAddress);
observerAddress.observe(modal, {
	attributes: true
});

const observerShipCheck = new MutationObserver(mCallbackShipCheck);
observerShipCheck.observe(shipCheckButtonWrapper, {
	attributes: true
});

document.querySelector("input.button.btnCheckoutContinue").click();