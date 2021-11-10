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

chrome.storage.sync.get({
	modelNumbers: '10G-P5-3897-RX,08G-P5-3667-RX,10G-P5-3885-RX|08G-P5-3665-RX,08G-P5-3663-RX,10G-P5-3895-RX,10G-P5-3883-RX,10G-P5-3881-RX|08G-P5-3767-RX,08G-P5-3755-RX,08G-P5-3753-RX,08G-P5-3751-RX,10G-P5-3898-RX,10G-P5-3888-RX,10G-P5-3899-RX,10G-P5-3889-RX|24G-P5-3987-RX,24G-P5-3985-RX,24G-P5-3975-RX,24G-P5-3973-RX,24G-P5-3971-RX,24G-P5-3988-RX,24G-P5-3989-RX,24G-P5-3978-RX,24G-P5-3998-RX,24G-P5-3999-RX,24G-P5-3979-RX|10G-P5-3897-RL,10G-P5-3885-RL,10G-P5-3895-RL,10G-P5-3883-RL,10G-P5-3881-RL,10G-P5-3898-RL,10G-P5-3888-RL,10G-P5-3899-RL,10G-P5-3889-RL,08G-P5-3767-RL,08G-P5-3755-RL,08G-P5-3751-RL,08G-P5-3753-RL,12G-P5-3657-RX,12G-P5-3655-RX|08G-P5-3667-RL,08G-P5-3663-RL,08G-P5-3665-RL,08G-P5-3797-RX,08G-P5-3785-RX,08G-P5-3783-RX,12G-P5-3967-RX,12G-P5-3953-RX,12G-P5-3968-RX,12G-P5-3958-RX,12G-P5-3969-RX,12G-P5-3959-RX|06G-P4-1061-RX,06G-P4-1066-RX,06G-P4-1068-RX'
}, (items) => {
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
					chrome.storage.sync.set({
						modelNumbers: modelNumbers.filter(item => item !== modelNumber).join(",")
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