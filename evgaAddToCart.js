console.log("evgaAddToCart started");

const addToCart = (card, modelNumber) => {
	console.log("buy: ", modelNumber);
	const checkoutButton = card.querySelector("div > input.btnBigAddCart");
	checkoutButton.click();
}

let modelNumbers = [];

chrome.storage.sync.get({
	modelNumbers: 'asdfsdfsdf,220-GT-0750-RX'
}, (items) => {
	console.log(items);
	modelNumbers = items.modelNumbers.replace(" ", "").split(",");

	const cardList = document.querySelector("#ctl00_LFrame_prdList_rlvProdList_ctrl0_pnlGroupContainer");

	// good cards come at the bottom, so start there
	const cards = [...cardList.children].reverse();

	modelNumbers.slice(0, 2).forEach(model => {
		cards.forEach(card => {
			const modelNumber = card.querySelector("p.pl-list-pn").textContent.replace("P/N: ", "");
			if (model === modelNumber) {
				chrome.storage.sync.set({
					modelNumbers: modelNumbers.filter(item => item !== modelNumber).join(",")
				});

				addToCart(card, modelNumber);
			}
		});
	});

	setTimeout(() => window.location.href = "https://discord.com/channels/354382386554863627/508525313873936385", 20000);
});