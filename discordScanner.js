function mCallbackDiscordChat(mutations, observer) {
	for (let mutation of mutations) {
		if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].textContent.length > 0) {
			observer.disconnect();
			window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
		}
	}
}

function observeDiscordChat(depth) {
	const elem = document.querySelector('[data-list-id="chat-messages"]');

	if (elem) {
		console.log("observing discord chat");
		const observer = new MutationObserver(mCallbackDiscordChat);
		observer.observe(elem, {
			childList: true,
			subtree: true
		});
	} else {
		// recurses asynchronously, waiting 2 seconds before each recursion
		// waits for discord chat to load in case it's slow
		console.log("page not loaded");
		if (depth > 0)
			setTimeout(() => observeDiscordChat(depth-1), 2000);
	}
}

observeDiscordChat(2);