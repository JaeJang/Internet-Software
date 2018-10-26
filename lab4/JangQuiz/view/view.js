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
	}
	
	
	
	
	
	
	
	
 }
 