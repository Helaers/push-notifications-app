window.onload = async () => {
	// Hide form and show the loading text
	document.getElementById("formWrapper").style.display = "none";
	document.getElementById("loadingText").style.display = "flex";

	try {
		const response = await fetch(
			"https://push-notifications-server-ql8n.onrender.com/"
		);
		if (response.ok) {
			// Show the form and hide the loading text
			document.getElementById("formWrapper").style.display = "flex";
			document.getElementById("loadingText").style.display = "none";
		}
	} catch (error) {
		console.error("Error:", error);
		document.getElementById("loadingText").innerText =
			"Something went wrong! Check console for more details.";
	}
};

// Send Notification
document.getElementById("form").addEventListener("submit", async (event) => {
	event.preventDefault();

	// Get form data
	const formData = new FormData(event.target);

	// Convert FormData to JSON object
	const jsonObject = {};
	formData.forEach((value, key) => {
		jsonObject[key] = value;
	});

	const button = document.getElementById("sendNotification");
	button.disabled = true;
	button.textContent = "Sending...";

	// Send form
	try {
		const response = await fetch(
			"https://push-notifications-server-ql8n.onrender.com/send-notification",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(jsonObject),
			}
		);
		if (response.ok) {
			// Clear the form
			event.target.reset();
			alert("Form submitted successfully!");
		} else {
			alert("Error submitting form!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Error submitting form!");
	} finally {
		button.disabled = false;
		button.textContent = "Send";
	}
});

// Fetch tokens
document.getElementById("getTokens").addEventListener("click", async () => {
	const button = document.getElementById("getTokens");
	button.disabled = true;
	button.textContent = "Fetching...";

	try {
		const response = await fetch(
			"https://push-notifications-server-ql8n.onrender.com/push-tokens"
		);
		console.log("response", response);
		if (response.ok) {
			alert(response);
		} else {
			alert("Fetch tokens failed!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Fetch tokens failed!");
	} finally {
		button.disabled = false;
		button.textContent = "Fetch tokens";
	}
});

// Clear tokens
document.getElementById("clearTokens").addEventListener("click", async () => {
	const button = document.getElementById("clearTokens");
	const confirmed = confirm("Are you sure you want to clear all tokens?");
	if (!confirmed) {
		return;
	}

	button.disabled = true;
	button.textContent = "Clearing...";
	try {
		const response = await fetch(
			"https://push-notifications-server-ql8n.onrender.com/push-tokens",
			{
				method: "DELETE",
			}
		);
		if (response.ok) {
			alert("Tokens cleared successfully!");
		} else {
			alert("Clear tokens failed!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Clear tokens failed!");
	} finally {
		button.disabled = false;
		button.textContent = "Clear tokens";
	}
});
