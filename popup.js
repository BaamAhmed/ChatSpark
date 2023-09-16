// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	// chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
	// 	file: 'payload.js'
	// });;
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {file: 'payload.js'})
	let msgsButton = document.getElementsByClassName('msgsButton')[0]
	msgsButton.addEventListener('click', function () {
		window.location.href = 'messages.html'
	})

	let settingsButton = document.getElementsByClassName('settingsButton')[0]
	settingsButton.addEventListener('click', function () {
		window.location.href = 'settings.html'
	})

	
	
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function ({target_name, target_headline, target_about, target_experiences}) {
	document.getElementById('target_name').innerText = target_name;
	document.getElementById('target_about').innerText = target_about;
	document.getElementById('target_headline').innerText = target_headline;
	let allExp = ""
	for(let i = 0; i < target_experiences.length; i++) {
		allExp += target_experiences[i] + "\n \n"
	}
	document.getElementById('target_experiences').innerHTML = allExp;
	let targetObj = {name: target_name, job: target_headline, about: target_about, experience: target_experiences}
	let introButton = document.getElementsByClassName('introButton')[0]
	console.log(introButton)
	introButton.addEventListener('click', function () {
		document.getElementById('responseContainer').innerText = 'Response Loading... (Please allow for up to a minute for response to load)'
		fetch('https://us-central1-linkedlist-399209.cloudfunctions.net/test-linked-list', {
			method: 'POST',
			body: JSON.stringify(targetObj),
			headers:{
			'Content-Type': 'application/json'
			} })
		.then(data => data.text()) // leave as is if sentence being returned, change to json if object being returned
		.then(body => document.getElementById('responseContainer').innerHTML = `<div style="border-radius: 10px; padding: 10px;"><h3>Response:</h3><p>${body}</p></div>`)
	})
});



