let buttonClicked = false;

function mCallbackPaypalContinue(mutations, observer) {
	for (let mutation of mutations) {
		console.log(mutation);
		if (mutation.type === 'childList') {
			observer.disconnect();
			console.log("Agree to paypal");
			
			const submitButton = document.querySelector("#payment-submit-btn");
			if (submitButton && !buttonClicked) {
				buttonClicked = true;
				submitButton.click();
			}
		}
	}
}

observerPaypalContinue = new MutationObserver(mCallbackPaypalContinue);
observerPaypalContinue.observe(document, {
	childList: true,
	subtree: true
});