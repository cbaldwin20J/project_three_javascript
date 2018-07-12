
// for the job role section, if they select 'other'
// then a text field appears.
let jobRoleInput = document.getElementById("title");
jobRoleInput.addEventListener('change', (e) => {
	let otherInput = document.getElementById('other-title');
	if (e.target.value == "other") {
		otherInput.style.display = '';
	}else {
		otherInput.style.display = 'none';
		}
});


// sets up the keyup validator for the email field
let emailInput = document.getElementById('mail');
emailInput.addEventListener('keyup', (e) => {
	// every keyup, take away both the keyup validator and the
	// validator the submit button creates.
	let eraseValidator = document.getElementById('validatorEmailKeyup');
	if (eraseValidator) {
		eraseValidator.parentNode.removeChild(eraseValidator);
	}
	let eraseMainValidator = document.getElementById('eraseMainValidator');
	if (eraseMainValidator) {
		eraseMainValidator.parentNode.removeChild(eraseMainValidator);
	}

	// So if it is a valid email format, do nothing, else put validator.
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
	}else{
		let emailValidator = document.createElement('p');
		emailValidator.innerText = "Email in proper format is required";
		emailValidator.setAttribute('id', 'validatorEmailKeyup');
		emailValidator.style.color = 'red';

		emailInput.parentNode.insertBefore(emailValidator, emailInput);
	}
});	
	

// for the tshirt info section. The colors options adjusts to the
// theme option that is chosen.
let tshirtSelectors = document.getElementsByClassName("shirt")[0];
tshirtSelectors.addEventListener('change', (e) => {
	let hideOrShowColorsDiv = document.getElementById('colors-js-puns');
	if (e.target.getAttribute('id') == 'design') {
		let colors = document.querySelector('#color');
		// function to show or hide the hearts and puns
		// also hide the color block until a theme is selected.
		function colorsDisplay(
			displaySettingPuns,
			 displaySettingHeart,
			 colorsDiv) {
			colors.children[0].style.display = displaySettingHeart;
			colors.children[1].style.display = displaySettingHeart;
			colors.children[2].style.display = displaySettingHeart;

			colors.children[3].style.display = displaySettingPuns;
			colors.children[4].style.display = displaySettingPuns;
			colors.children[5].style.display = displaySettingPuns;

			hideOrShowColorsDiv.style.display = colorsDiv;
		}
		if (e.target.value == 'js puns') {
			colorsDisplay('none', "", '');
			colors.children[0].selected = 'selected';
		}else if (e.target.value == 'heart js'){
			colorsDisplay('', 'none', '');
			colors.children[3].selected = 'selected';
		}else{
			colorsDisplay('', '', 'none');
		}
	}
});


// Register for activities section.
let activitiesFieldset = document.getElementsByClassName("activities")[0];
activitiesFieldset.addEventListener('change', (e) => {

	// sets the total cost at the bottom.
	function showTotal(num) {
		let total = document.querySelector('.totalsParagraph');
		let totalNum = document.querySelector('.totalsNumber');
		let newNum = parseInt(totalNum.innerText);
		newNum += num;
		totalNum.innerText = newNum;

		// if total cost is $0, then just hide it.
		if (newNum == 0) {
			total.style.display = "none";
		}else{
			total.style.display = "";
		}
	};

	// Will put a conflicting time validator on the activities
	function showConflictMessage(showYesorNo, index) {
		let spanMessage = activitiesFieldset.children[index].lastElementChild;
		if (showYesorNo) {
			spanMessage.style.display = "";
		}else {
			spanMessage.style.display = 'none';
		}
		
	}
	
	// will disable the checkboxes of activities with conflicting times.
	// for the 9 to 12 slots.
	function disableCorrectCheckmarks9to12(
		isDisabled9to12two, isDisabled9to12four, isDisabled9to12six){

		activitiesFieldset.children[2].firstElementChild.disabled = isDisabled9to12two;
		showConflictMessage(isDisabled9to12two, 2);
		
		activitiesFieldset.children[4].firstElementChild.disabled = isDisabled9to12four;
		showConflictMessage(isDisabled9to12four, 4);

		activitiesFieldset.children[6].firstElementChild.disabled = isDisabled9to12six;
		showConflictMessage(isDisabled9to12six, 6);
	}


	// will disable the checkboxes of activities with conflicting times.
	// for the 1 to 4 slots.
	function disableCorrectCheckmarks1to4(
		isDisabled1to4three, isDisabled1to4five, isDisabled1to4seven){

		activitiesFieldset.children[3].firstElementChild.disabled = isDisabled1to4three;
		showConflictMessage(isDisabled1to4three, 3);
		
		activitiesFieldset.children[5].firstElementChild.disabled = isDisabled1to4five;
		showConflictMessage(isDisabled1to4five, 5);

		activitiesFieldset.children[7].firstElementChild.disabled = isDisabled1to4seven;
		showConflictMessage(isDisabled1to4seven, 7);
	}

	// this will add or subtract the cost for whatever
	// activity was checked, and call for conflicting times
	// to be disabled.
	if (e.target.getAttribute('name') == "all") {
		if (e.target.checked) {
			showTotal(200)
		}else {
			showTotal(-200);
		}
	}else if (e.target.getAttribute('name') == "js-frameworks") {
		if (e.target.checked) {
			disableCorrectCheckmarks9to12(false, true, true);
			showTotal(100)
		}else {
			disableCorrectCheckmarks9to12(false, false, false);
			showTotal(-100)
		}
	}else if(e.target.getAttribute('name') == "express"){
		if (e.target.checked) {
			disableCorrectCheckmarks9to12(true, false, true);
			showTotal(100)
		}else {
			disableCorrectCheckmarks9to12(false, false, false);
			showTotal(-100)
		}
	}else if(e.target.getAttribute('name') == "build-tools"){
		if (e.target.checked) {
			disableCorrectCheckmarks9to12(true, true, false);
			showTotal(100)
		}else {
			disableCorrectCheckmarks9to12(false, false, false);
			showTotal(-100)
		}
	}else if(e.target.getAttribute('name') == "js-libs"){
		if (e.target.checked) {
			disableCorrectCheckmarks1to4(false, true, true);
			showTotal(100)
		}else {
			disableCorrectCheckmarks1to4(false, false, false);
			showTotal(-100)
		}
	}else if(e.target.getAttribute('name') == "node"){
		if (e.target.checked) {
			disableCorrectCheckmarks1to4(true, false, true);
			showTotal(100)
		}else {
			disableCorrectCheckmarks1to4(false, false, false);
			showTotal(-100)
		}
	}else if(e.target.getAttribute('name') == "npm"){
		if (e.target.checked) {
			disableCorrectCheckmarks1to4(true, true, false);
			showTotal(100)
		}else {
			disableCorrectCheckmarks1to4(false, false, false);
			showTotal(-100)
		}
	}
});


//  this is for the payment section.
let paymentSelector = document.getElementById('payment');
paymentSelector.addEventListener('change', (e) => {
	let creditCardSection = document.getElementById('credit-card');
	let payPalSection = creditCardSection.nextElementSibling;
	let bitcoinSection = payPalSection.nextElementSibling;

	// will show the one that's selected, and hide the others.
	function showAndHideSections(credit, paypal, bitcoin) {
		creditCardSection.style.display = credit;
		payPalSection.style.display = paypal;
		bitcoinSection.style.display = bitcoin;
	}

	// will show the one that's selected, and hide the others. 
	if (e.target.value == "credit card") {
		showAndHideSections("", 'none', 'none');
	}else if(e.target.value == "paypal") {
		showAndHideSections('none', "", 'none');
	}else if(e.target.value == 'bitcoin') {
		showAndHideSections('none', 'none', "");
	}
});


// When the form is submitted.
let form = document.querySelector('form');
form.addEventListener('submit', function(event) {
	// get rid of all the previous validator messages
	let removeValidatorClass = document.getElementsByClassName('validator');
	while(removeValidatorClass[0]) {
		removeValidatorClass[0].parentNode.removeChild(removeValidatorClass[0]);
	}
	
	// erasing the email keyup validator
	let eraseValidator = document.getElementById('validatorEmailKeyup');
	if (eraseValidator) {
		eraseValidator.parentNode.removeChild(eraseValidator);
	}

	// validator to make sure 'Name' is not blank.
	let nameInput = document.querySelector('#name');
	let submitCounter = 0;
	if (nameInput.value.trim() == "") {
		let nameValidator = document.createElement('p');
		nameValidator.innerText = "Name is required"
		nameValidator.classList.add('validator');
		nameValidator.style.color = 'red';

		nameInput.parentNode.insertBefore(nameValidator, nameInput);
		submitCounter += 1;
	}

	// validator to make sure email is valid format
	let emailInput = document.getElementById('mail');
	
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
	}else{
		let emailValidator = document.createElement('p');
		emailValidator.innerText = "Email in proper format is required"
		emailValidator.classList.add('validator');
		// this #id is for the keyup email at the top of the file.
		// to make it easier to erase this.
		emailValidator.setAttribute('id', 'eraseMainValidator');
		emailValidator.style.color = 'red';

		emailInput.parentNode.insertBefore(emailValidator, emailInput);
		submitCounter += 1;
	}
	 
	// validator to make sure 'register for activities'
	// has at least one activity checked
	let activityFieldset = document.querySelector('.activities');
	let totalNum = document.querySelector('.totalsNumber');
	if (parseInt(totalNum.innerText) == 0) {
		let activityValidator = document.createElement('p');
		activityValidator.innerText = "Must choose at least one activity.";
		activityValidator.classList.add('validator');
		activityValidator.style.color = 'red';

		activityFieldset.children[0].append(activityValidator);
		submitCounter += 1;
	} 

	// check credit card number
	let ifCreditCard = document.getElementById('payment');
	if (ifCreditCard.value == "credit card") {
		let cardNumber = document.getElementById('cc-num');
		if (cardNumber.value.length >= 13 && cardNumber.value.length <= 16){
		}else{
			let cardNumberValidator = document.createElement('span');
			if (cardNumber.value.length<1) {
				cardNumberValidator.innerText = "  Please enter a credit card number.";
			}else{
				cardNumberValidator.innerText = "  Card number must be between 13-16 characters long";
			}
			
			cardNumberValidator.classList.add('validator');
			cardNumberValidator.style.color = 'red';

			cardNumber.previousElementSibling.append(cardNumberValidator);
			submitCounter += 1;
		}
		let zipCode = document.getElementById('zip');
		if (zipCode.value.length != 5){
			let zipcodeValidator = document.createElement('span');
			zipcodeValidator.innerText = "  Zip code must be 5 characters long";
			zipcodeValidator.classList.add('validator');
			zipcodeValidator.style.color = 'red';

			zipCode.previousElementSibling.append(zipcodeValidator);
			submitCounter += 1;
		}
		let cvv = document.getElementById('cvv');
		if (cvv.value.length != 3){
			let cvvValidator = document.createElement('span');
			cvvValidator.innerText = "  CVV must be 3 characters long";
			cvvValidator.classList.add('validator');
			cvvValidator.style.color = 'red';

			cvv.previousElementSibling.append(cvvValidator);
			submitCounter += 1;
		}
	}

	// if there is an error, then prevent the submission
	if (submitCounter > 0) {
		event.preventDefault();
	}
});


// kickstarts the form when page is loaded.
function start() {
	// focus on the first input when page loads
	document.getElementById("name").focus();
	
	// sets the conflicting time validators but hides them.
	let activitiesFieldset = document.getElementsByClassName("activities")[0];
	for (i =1; i < activitiesFieldset.children.length; i+=1) {
		let conflictingTimeMessage = document.createElement('span');
		conflictingTimeMessage.classList.add('conflictMessage');
		conflictingTimeMessage.innerText = "    disabled conflicting time";
		conflictingTimeMessage.style.color = 'red';
		conflictingTimeMessage.style.display = 'none';

		activitiesFieldset.children[i].appendChild(conflictingTimeMessage);
	}

	// creates the total cost <p></p> but hides it.
	let total = document.createElement('p');
	total.classList.add('totalsParagraph');
	total.innerText = "Total: $"
	let totalNum = document.createElement('span');
	totalNum.classList.add('totalsNumber');
	totalNum.innerText = 0;
	total.appendChild(totalNum);
	total.style.display = 'none';
	activitiesFieldset.appendChild(total);

	// disables the 'select method' option in the payment section.
	let disableSelectPaymentField = document.querySelector('option[value=select_method]');
	disableSelectPaymentField.disabled = true;
	disableSelectPaymentField.parentNode.value = "credit card"

	// under tshirts, hide 'colors' until a theme is selected.
	let hideOrShowColorsDiv = document.getElementById('colors-js-puns');
	hideOrShowColorsDiv.style.display = 'none';

	// hide the 'other' input.
	let otherInput = document.getElementById('other-title');
	otherInput.style.display = 'none';

	// start off the value for job role 
	document.getElementById('title').value = 'full-stack js developer';
}

start();