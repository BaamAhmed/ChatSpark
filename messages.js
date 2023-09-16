// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {file: 'messagesPayload.js'})
    let profileButton = document.getElementsByClassName('profile')[0]
	profileButton.addEventListener('click', function () {
		window.location.href = 'popup.html'
	})

    let messageButton = document.getElementsByClassName('messageButton')[0]
    messageButton.addEventListener('click', function () {
        console.log('CALL GOOGLE CLOUD FUNCTION FOR MSG GENERATION')
    })
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (messages) {
    let bigMsg = ''
    for (let i = 0; i < messages.length; i++) {
        bigMsg += messages[i] + '\n \n'
    }
    if (bigMsg.length > 0) {
        document.getElementById('messages').innerText = bigMsg
    }
});