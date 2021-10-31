console.log("evga checkout payment script started");

const mCallbackPaypal = (mutations, observer) => {
	for (let mutation of mutations) {
		if (mutation.type === 'attributes' && mutation.attributeName === "style") {
			observer.disconnect();
			console.log("Agree to paypal");
			document.querySelector("#chkPaypalNotice").click();
			document.querySelector("#ctl00_LFrame_ImageButton4").click();
		}
	}
}

const paypalModal = document.querySelector("#modalPaypal");

if (!paypalModal) {
	window.location.href = "https://www.evga.com/products/productlist.aspx?type=8";
}

const observerPaypal = new MutationObserver(mCallbackPaypal);
observerPaypal.observe(paypalModal, {
	attributes: true
});

document.querySelector("#rdoPaypal").click();
document.querySelector("#ctl00_LFrame_btncontinue").click();