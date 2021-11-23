console.log("evga checkout shipping script started");

// skip API request by hard coding response
const res = {"d":"{\"IsSuccess\":true,\"Data\":[{\"code\":\"E\",\"service\":\"UPS SurePost, USPS delivery\",\"negotiatedrate\":\"7.95\",\"text\":\"UPS SurePost, USPS delivery ($7.95)\"},{\"code\":\"03\",\"service\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eMonday, November 22 - 24, 2021\u003c/span\u003e\u003c/span\u003eUPS Ground\",\"negotiatedrate\":\"13.01\",\"text\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eMonday, November 22 - 24, 2021\u003c/span\u003e\u003c/span\u003eUPS Ground ($13.01)\"},{\"code\":\"12\",\"service\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eThursday, November 18 - 20, 2021\u003c/span\u003e\u003c/span\u003eUPS 3 Day Select\",\"negotiatedrate\":\"20.39\",\"text\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eThursday, November 18 - 20, 2021\u003c/span\u003e\u003c/span\u003eUPS 3 Day Select ($20.39)\"},{\"code\":\"02\",\"service\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eWednesday, November 17 - 19, 2021\u003c/span\u003e\u003c/span\u003eUPS 2nd Day Air\",\"negotiatedrate\":\"23.94\",\"text\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eWednesday, November 17 - 19, 2021\u003c/span\u003e\u003c/span\u003eUPS 2nd Day Air ($23.94)\"},{\"code\":\"13\",\"service\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eTuesday, November 16 - 18, 2021\u003c/span\u003e\u003c/span\u003eUPS Next Day Air Saver\",\"negotiatedrate\":\"37.00\",\"text\":\"\u003cspan class=\u0027arrives-by-text\u0027\u003eEstimated Arrival Date \u003cspan class=\u0027estimated-date\u0027\u003eTuesday, November 16 - 18, 2021\u003c/span\u003e\u003c/span\u003eUPS Next Day Air Saver ($37.00)\"}],\"Code\":0,\"Message\":null}"};

function GotShippingFee_override(result) {
	document.querySelector('.ajax-bg').classList.add('hide-ajax-loader');
	var rtn = JSON.parse(result);
	if (rtn.IsSuccess) {
		for (var i = 0; i < rtn.Data.length; i++) {
			var radioBtn = '<div><input type="radio" name="rdoShipFee" value="' + rtn.Data[i].code + '_' + rtn.Data[i].negotiatedrate + '" id="rdoShipFee' + rtn.Data[i].code + '"/><label for="rdoShipFee' + rtn.Data[i].code + '">' + rtn.Data[i].text + '</label></div>';
			document.querySelector('#divShipFeeList').innerHTML = radioBtn;
		}
		if (rtn.Data.length > 0) {
			document.querySelector('[name="rdoShipFee"]').checked = true;
			document.getElementById("divShipFee").style.display = "block";
		}
	}
	else {
		console.log("GetShippingFee error : " + rtn.Message);
		if (rtn.Code == -1)
			alert("Error: Please reload this page and try again or contact to the Website manager.");
		else if (rtn.Message == "Rates are not available")
			alert("Error: Our address verification system does not recognize this address.  Please review your address and update as necessary.  If you are unable to proceed after updating, please contact support@evga.com.");
		else
			alert("Error: " + rtn.Message);
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
const shipCheckButtonWrapper = document.querySelector("#divShipFee");

// if elements don't exist, nagivate back to b stock page and continue
if (!shipCheckButtonWrapper) {
	window.location.href = "https://www.evga.com/products/productlist.aspx?type=8&associatecode=S25NV7GJP9H30MG";
}

const observerShipCheck = new MutationObserver(mCallbackShipCheck);
observerShipCheck.observe(shipCheckButtonWrapper, {
	attributes: true
});

GotShippingFee_override(res["d"]);

// document.querySelector("input.button.btnCheckoutContinue").click();