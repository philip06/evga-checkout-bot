console.log("evga checkout shipping script started");

function mCallbackAddress(mutations, observer) {
	for (let mutation of mutations) {
		if (mutation.type === 'attributes' && mutation.attributeName === "style") {
			observer.disconnect();
			console.log("Selecting address");
			document.querySelector("#modalSuggestAddress > div > div.button__block > input.button.btnCheckoutContinue").click();
		}
	}
}

function mCallbackShipCheck(mutations, observer) {
	for (let mutation of mutations) {
		if (mutation.type === 'attributes' && mutation.attributeName === "style") {
			observer.disconnect();
			console.log("Selecting ship checkbox");
			document.querySelector("#cbAgree").click();
			document.querySelector("#ctl00_LFrame_btncontinue").click();
		}
	}
}

const modal = document.querySelector('#modalSuggestAddress');

if (!modal) {
	window.location.href = "https://www.evga.com/products/productlist.aspx?type=8";
}

observerAddress = new MutationObserver(mCallbackAddress);
observerAddress.observe(modal, {
	attributes: true
});

const shipCheckButtonWrapper = document.querySelector("#divShipFee");

if (!shipCheckButtonWrapper) {
	window.location.href = "https://www.evga.com/products/productlist.aspx?type=8";
}

observerShipCheck = new MutationObserver(mCallbackShipCheck);
observerShipCheck.observe(shipCheckButtonWrapper, {
	attributes: true
});

document.querySelector("input.button.btnCheckoutContinue").click();