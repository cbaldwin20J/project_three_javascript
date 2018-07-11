// focus on the first input when page loads
document.getElementById("name").focus();

// for the job role section, if they select 'other'
// then a text field appears.
let jobRoleInput = document.getElementById("title");
jobRoleInput.addEventListener('change', (e) => {
	let fieldset = document.querySelector('fieldset');

	if (e.target.value == "other") {
		let otherInput = document.createElement('input');
		otherInput.setAttribute('id', 'other-title');
		otherInput.setAttribute('placeholder', 'Your Job Role');
		fieldset.append(otherInput);
	}else {
		let eraseOtherInput = document.querySelector('#other-title');
		if (eraseOtherInput) {
			fieldset.removeChild(eraseOtherInput);
		}
	}
});


// for the tshirt info section. The colors options adjusts to the
// theme option that is chosen.
let tshirtSelectors = document.getElementsByClassName("shirt")[0];
tshirtSelectors.addEventListener('change', (e) => {
	if (e.target.getAttribute('id') == 'design') {
		let colors = document.querySelector('#color');
		function colorsDisplay(displaySettingPuns, displaySettingHeart) {
			colors.children[0].style.display = displaySettingHeart;
			colors.children[1].style.display = displaySettingHeart;
			colors.children[2].style.display = displaySettingHeart;

			colors.children[3].style.display = displaySettingPuns;
			colors.children[4].style.display = displaySettingPuns;
			colors.children[5].style.display = displaySettingPuns;
		}
		if (e.target.value == 'js puns') {
			colorsDisplay('none', "");
			colors.children[0].selected = 'selected';
		}else if (e.target.value == 'heart js'){
			colorsDisplay('', 'none');
			colors.children[3].selected = 'selected';
		}else{
			colorsDisplay('', '');
		}
	}
});



let activitiesFieldset = document.getElementsByClassName("activities")[0];
activitiesFieldset.addEventListener('change', (e) => {

	function showTotal(num) {
		
		let total = document.querySelector('.totalsParagraph');
		let totalNum = document.querySelector('.totalsNumber');
		let newNum = parseInt(totalNum.innerText);
		newNum += num;
		totalNum.innerText = newNum;

		if (newNum == 0) {
			total.style.display = "none";
		}else{
			total.style.display = "";
		}
	};

	function showConflictMessage(showYesorNo, index) {
		let spanMessage = activitiesFieldset.children[index].lastElementChild;
		console.log(showYesorNo);
		if (showYesorNo) {
			spanMessage.style.display = "";
			console.log(spanMessage);
		}else {
			spanMessage.style.display = 'none';
		}
		
	}
	
	function disableCorrectCheckmarks9to12(
		isDisabled9to12two, isDisabled9to12four, isDisabled9to12six){

		activitiesFieldset.children[2].firstElementChild.disabled = isDisabled9to12two;
		showConflictMessage(isDisabled9to12two, 2);
		
		activitiesFieldset.children[4].firstElementChild.disabled = isDisabled9to12four;
		showConflictMessage(isDisabled9to12four, 4);

		activitiesFieldset.children[6].firstElementChild.disabled = isDisabled9to12six;
		showConflictMessage(isDisabled9to12six, 6);
	}


	function disableCorrectCheckmarks1to4(
		isDisabled1to4three, isDisabled1to4five, isDisabled1to4seven){

		activitiesFieldset.children[3].firstElementChild.disabled = isDisabled1to4three;
		showConflictMessage(isDisabled1to4three, 3);
		
		activitiesFieldset.children[5].firstElementChild.disabled = isDisabled1to4five;
		showConflictMessage(isDisabled1to4five, 5);

		activitiesFieldset.children[7].firstElementChild.disabled = isDisabled1to4seven;
		showConflictMessage(isDisabled1to4seven, 7);
	}

	
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
"js-frameworks", "express", "build-tools"
"js-libs", "node", "npm"
// adds the messages to the activities portion.
function start() {

	let activitiesFieldset = document.getElementsByClassName("activities")[0];
	for (i =1; i < activitiesFieldset.children.length; i+=1) {
		let conflictingTimeMessage = document.createElement('span');
		conflictingTimeMessage.classList.add('conflictMessage');
		conflictingTimeMessage.innerText = "    disabled conflicting time";
		conflictingTimeMessage.style.color = 'red';
		conflictingTimeMessage.style.display = 'none';

		activitiesFieldset.children[i].appendChild(conflictingTimeMessage);
		console.log(i);
	}

	let total = document.createElement('p');
	total.classList.add('totalsParagraph');
	total.innerText = "Total: $"
	let totalNum = document.createElement('span');
	totalNum.classList.add('totalsNumber');
	totalNum.innerText = 0;
	total.appendChild(totalNum);
	total.style.display = 'none';
	activitiesFieldset.appendChild(total);

}

start();