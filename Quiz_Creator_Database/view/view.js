 var View = function(model)
 {
	this.model = model;
	this.controller = null;
	this.contentsDiv = null;
	this.init();
 }
 
 View.prototype = 
 {
	 //Initiate variable(s)
	init :function()
	{
		this.contentsDiv = document.querySelector('#contents');
	},
	
	//Update the view by appending question divs to the main div
	update: function()
	{
		let questionsDivArray = this.model.getQuestionsDiv();
		for(let i = 0; i < questionsDivArray.length; ++i)
		{
			this.contentsDiv.appendChild(questionsDivArray[i]);
		}
	},
	
	//Set controller
	setController: function(controller)
	{
		this.controller = controller;
	},
	
	//Set eventListener for buttons
	setButtonEvent: function(elementId, f)
	{
		document.querySelector(elementId).addEventListener('click', f);
		
		
	},
	
	//Remove every elements in the main div for updating
	removeContents: function()
	{
		while(this.contentsDiv.firstChild)
			this.contentsDiv.removeChild(this.contentsDiv.firstChild);
	},
	
	//ADMIN MODE
	//Enable and disable Add button and Save button depending on Delete mode
	changeButtonState: function(state)
	{
		let addB = document.querySelector('#add');
		let saveB = document.querySelector('#save')
		addB.disabled = state;
		saveB.disabled = state;
		
		if(state === true)
		{
			addB.className = 'btn-lg btn-secondary'
			saveB.className = 'btn-lg btn-secondary'
		}
		else
		{
			addB.className = 'btn-lg btn-primary';
			saveB.className = 'btn-lg btn-success';
		}
	},

	//USER MODE
	//Check if the difficulty of quiz is selected
	//If not return false
	//If true, return true and list of difficulties
	checkDifficulty: function()
	{
		
		let check =  document.querySelector('#hard').checked ||
					document.querySelector('#medium').checked ||
					document.querySelector('#easy').checked;
		let list = [];
		if(document.querySelector('#hard').checked){
			check = true;
			list.push("Hard");
		}
		if(document.querySelector('#medium').checked){
			check = true;
			list.push("Medium");
		}
		if(document.querySelector('#easy').checked){
			check = true;
			list.push("Easy");
		}
		
		if(check){
			//document.querySelector('#difficulty_select').style.display = 'none';
			//document.querySelector('#loading').style.display = 'block';
			this.disableElement('#difficulty_select');
			this.enableElement('#loading');
			return [true, list];
		}
		
		return [false,null];
	},

	//USER MODE
	//Error message that shows up when no difficulty has been selected
	difficulty_select_error: function()
	{
		this.enableElement('#difficulty_select_error');
	},

	//Display element
	enableElement: function(id)
	{
		document.querySelector(id).style.display = 'block';
	},

	//Make an element disappear 
	disableElement: function(id)
	{
		document.querySelector(id).style.display = 'none';
	}
 }


 