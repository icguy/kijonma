var isLive = !window.location.href.startsWith("file://");
var url = isLive
	? "https://kijonma-62733.firebaseio.com/last.json"
	: "https://kijonma-62733.firebaseio.com/last-test.json";


var $daniButton;
var $eszterButton;
var $nowText;

function refreshLast() {
	$.ajax({
		method: "GET",
		url: url
	}).done(result => {
		if (result && result.name && result.date) {
			var text = `Legutóbb (${moment(result.date).format("YYYY. MMMM. D.")}) ${result.name} fizetett!! 💰💰💰`;
			$("#last").text(text);

			if (result.name === "Eszter") {
				$eszterButton.hide();
				$daniButton.show();
				$nowText.text("Dani");
			}
			if (result.name === "Dani") {
				$daniButton.hide();
				$eszterButton.show();
				$nowText.text("Eszter");
			}

			$(".container").show();
		}
	});
}

function setPayment(name) {
	$.ajax({
		method: "PUT",
		url: url,
		data: JSON.stringify({ name: name, date: moment().toISOString() })
	}).done(() => refreshLast());
}

$(document).ready(() => {
	$daniButton = $("button#dani");
	$eszterButton = $("button#eszter");
	$nowText = $("#now");

	refreshLast();
	$eszterButton.click(() => setPayment("Eszter"));
	$daniButton.click(() => setPayment("Dani"));
});
