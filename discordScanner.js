const mCallback = (mutations, observer) => {
	for (let mutation of mutations) {
		if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].textContent.length > 0) {
			observer.disconnect();
			window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
		}
	}
}

console.log("discordScanner started");
const observer = new MutationObserver(mCallback);
const elem = document.querySelector('[data-list-id="chat-messages"]');

observer.observe(elem, {
  childList: true,
  subtree: true
});