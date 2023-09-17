// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {file: 'messagesPayload.js'})
    let profileButton = document.getElementsByClassName('profile')[0]
	profileButton.addEventListener('click', function () {
		window.location.href = 'popup.html'
	})


});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function ({names, messages}) {
    let bigMsg = ''
    for (let i = 0; i < messages.length; i++) {
        bigMsg += messages[i] + '\n \n'
    }
    if (bigMsg.length > 0) {
        document.getElementById('messages').innerText = `${messages.length} messages successfully parsed. (Note that for longer conversations, only the 6 latest messages are considered when generating a new message)`
    }
    let messageButton = document.getElementsByClassName('messageButton')[0]

    messageButton.addEventListener('click', function () {
        window.scrollTo(0,0)
        document.getElementById('responseContainer').innerHTML = '<div style="border-radius: 15px; background-color: rgba(255, 164, 99 ,0.5); padding: 10px">Response Loading... (Please allow for up to 30 seconds for the response to load)</div>'
        let msgObj = {names: names, conversation: bigMsg, intent: document.getElementById('intention').value}
        fetch('https://us-central1-linkedlist-399209.cloudfunctions.net/messaging', {
			method: 'POST',
			body: JSON.stringify(msgObj),
			headers:{
			'Content-Type': 'application/json'
			} })
		.then(data => data.text()) // leave as is if sentence being returned, change to json if object being returned
		.then(body => {
            document.getElementById('responseContainer').innerHTML = `<div style="border-radius: 15px; background-color: rgba(255, 164, 99 ,0.5); padding: 10px"><div style="border-radius: 10px; padding: 10px;"><h3>Response:</h3><p id="responseBody">${body}</p><button class="copyButton" style="border-radius: 10px; padding: 10px; background-color: rgba(255, 164, 99 ,0.5)">Copy</button></div></div>`
            let copyButton = document.getElementsByClassName('copyButton')[0]
			copyButton.addEventListener('click', function () {
				navigator.clipboard.writeText(document.getElementById('responseBody').innerText)
				copyButton.innerText = "Copied!"
			})
        })
    })
});