window.addEventListener('load', function (evt) {

    document.getElementById('name').value = window.localStorage.getItem("name")
    document.getElementById('occupation').value = window.localStorage.getItem("occupation")
    document.getElementById('intention').value = window.localStorage.getItem("intention")

    let submitButton = document.getElementsByClassName('submitButton')[0]
	submitButton.addEventListener('click', async function () {
		let newName = document.getElementById('name').value
        let newOccupation = document.getElementById('occupation').value
        let newIntention = document.getElementById('intention').value
        console.log(newName)
        console.log(newOccupation)
        console.log(newIntention)
        window.localStorage.setItem("name", newName)
        window.localStorage.setItem("occupation", newOccupation)
        window.localStorage.setItem("intention", newIntention)

        
	})

    let messageButton = document.getElementsByClassName('messageButton')[0]
    messageButton.addEventListener('click', function () {
        console.log('CALL GOOGLE CLOUD FUNCTION FOR MSG GENERATION')
    })
});
