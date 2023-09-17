// send the page title as a chrome message
// chrome.runtime.sendMessage(document.title);
chrome.runtime.sendMessage(getMessageData());

function getMessageData() {
    let messages = []
    let targetName = document.getElementsByClassName('msg-s-message-group__profile-link msg-s-message-group__name t-14 t-black t-bold hoverable-link-text')[0]
    let rawMsgs = document.getElementsByClassName('msg-s-event-listitem__body t-14 t-black--light t-normal')
    let rawAuthors = document.getElementsByClassName('msg-s-message-group__meta')
    for (let i = 0; i < rawAuthors.length && i < rawMsgs.length; i++) {
        messages.push(rawAuthors[i].innerText + ": " + rawMsgs[i].innerText)
    }
    if (messages.length > 6) {
        messages = messages.slice(-6)
    }
    let names = {user: rawAuthors[0].innerText, target: targetName}
    return {names, messages}
}

