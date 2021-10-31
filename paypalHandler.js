const mCallbackPaypalContinue = (mutations, observer) => {
	for (let mutation of mutations) {
		if (mutation.type === 'childList') {
			const submitButton = document.querySelector("#payment-submit-btn");
			if (submitButton) {
				console.log("Agree to paypal");
				observer.disconnect();
				buttonClicked = true;
				submitButton.click();
			}
		}
	}
}

const observerPaypalContinue = new MutationObserver(mCallbackPaypalContinue);
observerPaypalContinue.observe(document, {
	childList: true,
	subtree: true
});