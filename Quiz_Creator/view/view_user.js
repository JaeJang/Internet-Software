 var View = function(model)
 {
	this.model = model;
	this.controller = null;
	this.contentsDiv = null;
	this.init();
 }
 
 View.prototype = 
 {
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
	
	//Set model
	setModel: function(model)
	{
		this.model = model;
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
	}
	
	
	
	
	
	
	
	
	
	
	
 }
 