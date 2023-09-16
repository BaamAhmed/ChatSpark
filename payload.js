// send the page title as a chrome message
// chrome.runtime.sendMessage(document.title);
chrome.runtime.sendMessage(
getTargetData()
);

function getTargetData() {
    return     { 
        target_name: document.getElementsByClassName('text-heading-xlarge inline t-24 v-align-middle break-words')[0].innerText,
        target_headline: document.getElementsByClassName('text-body-medium break-words')[0].innerText,
        // target_highlights: document.getElementsByClassName('display-flex align-items-center mr1 hoverable-link-text t-bold')[0].innerHTML,
        // target_about: document.getElementsByClassName('artdeco-card ember-view relative break-words pb3 mt2')[0].innerText,
        target_about: getAbout(),
        target_experiences: getExperiences()
    }
}

function getAbout() {
    let about = document.getElementsByClassName('artdeco-card ember-view relative break-words pb3 mt2')
    let i = 0
    while (i < about.length && !about[i].innerText.includes('About')) {
        i++
    }
    if (i == about.length) return null
    return about[i].innerText
}
// getAbout()

// console.log(document.querySelector('[data-generated-suggestion-target~="urn:li:fsu_profileActionDelegate"]'))
function getExperiences() {
    let expArr = []
    let sections = document.getElementsByClassName('artdeco-card ember-view relative break-words pb3 mt2')
    let i = 0
    while (i < sections.length && !sections[i].innerText.includes('Experience')) {
        i++
    }
    let exps = sections[i].getElementsByClassName('pvs-list__outer-container')[0].getElementsByClassName('pvs-list')[0].getElementsByClassName('artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column')
    // let exps = sections[i].getElementsByClassName('pvs-list__outer-container')[0]
    // let exps = document.getElementsByClassName('artdeco-card ember-view relative break-words pb3 mt2')[0].getElementsByClassName('pvs-list__outer-container')[0].getElementsByClassName('pvs-list')[0].getElementsByClassName('artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column')
    for (let i = 0; i < exps.length; i++) {
        // let expObj = {}
        // expObj.desc = null
        // let mainExp = exps[i].getElementsByClassName('pvs-entity pvs-entity--padded pvs-list__item--no-padding-in-columns')[0].getElementsByClassName('display-flex flex-column full-width align-self-center')[0].getElementsByClassName('display-flex flex-row justify-space-between')[0].getElementsByClassName('display-flex flex-column full-width')[0]
        // let mainExp = exps[i].getElementsByClassName('pvs-entity pvs-entity--padded pvs-list__item--no-padding-in-columns')[0].getElementsByClassName('display-flex flex-column full-width align-self-center')[0].getElementsByClassName('display-flex flex-row justify-space-between')[0]
        let mainExp = exps[i].getElementsByClassName('pvs-entity pvs-entity--padded pvs-list__item--no-padding-in-columns')[0].getElementsByClassName('display-flex flex-column full-width align-self-center')[0].getElementsByClassName('display-flex flex-row justify-space-between')[0]
        // expObj.name = mainExp.getElementsByClassName('display-flex flex-wrap align-items-center full-height')[0].innerText
        // expObj.copmany = mainExp.getElementsByClassName('t-14 t-normal')[0].innerText.split('·')[0]

        expArr.push(exps[i].innerText)
    }  
    // console.log(exps)
    // console.log(expArr)
    return expArr
}


// fetch('https://us-central1-linkedlist-399209.cloudfunctions.net/test-linked-list', {
//     method: 'POST',
//     body: JSON.stringify({name: 'Bassam'}),
//     headers:{
//       'Content-Type': 'application/json'
//     } })
//   .then(data => data.text()) // leave as is if sentence being returned, change to json if object being returned
//   .then(body => alert(body))