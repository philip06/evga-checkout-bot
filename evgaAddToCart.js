console.log("evga add to cart script started");

// Knuth Shuffle
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
}

const addToCart = (card, modelNumber) => {
	console.log("buy: ", modelNumber);
	const checkoutButton = card.querySelector("div > input.btnBigAddCart");
	checkoutButton.click();
}

let modelNumbers = [];

chrome.storage.local.get("modelNumbers", (items) => {
	const tiers = items.modelNumbers.replace(" ", "").split("|");
	tiers.forEach(tier => {
		modelNumbers.push(tier.split(","))
	});
	console.log("modelNumbers", modelNumbers);

	const cardList = document.querySelector("#ctl00_LFrame_prdList_rlvProdList_ctrl0_pnlGroupContainer");

	// good cards come at the bottom, so start there
	const cards = [...cardList.children].reverse();

	modelNumbers.forEach(tier => {
		shuffle(tier);
		console.log("tier", tier);
		tier.forEach(model => {
			cards.forEach(card => {
				const modelNumber = card.querySelector("p.pl-list-pn").textContent.replace("P/N: ", "");
				if (model === modelNumber) {
					chrome.storage.local.set({
						modelNumbers: modelNumbers.map(tier => tier.filter(modelNumber => model !== modelNumber).join(",")).join("|")
					});
	
					addToCart(card, modelNumber);
				}
			});
		});
	});

	chrome.runtime.sendMessage({ message: 'canRefreshBStock' },
		(response) => {
			if (response) {
				setTimeout(() => window.location.reload(), 5000);
			} else {
				setTimeout(() => window.location.href = "https://discord.com/channels/767566223729754122/869681156797390849", 5000);
			}
		});
});