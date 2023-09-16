// send the page title as a chrome message
// chrome.runtime.sendMessage(document.title);
chrome.runtime.sendMessage(getMessageData());

function getMessageData() {
    let messages = []
    let rawMsgs = document.getElementsByClassName('msg-s-event-listitem__body t-14 t-black--light t-normal')
    let rawAuthors = document.getElementsByClassName('msg-s-message-group__meta')
    for (let i = 0; i < rawAuthors.length && i < rawMsgs.length; i++) {
        messages.push(rawAuthors[i].innerText + ": " + rawMsgs[i].innerText)
    }
    if (messages.length > 6) {
        messages = messages.slice(-6)
    }
    return messages
}

