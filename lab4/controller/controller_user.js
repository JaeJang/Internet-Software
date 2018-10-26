 var Controller = function(view, model)
 {
	this.view = view;
	this.model = model;
	
	this.init();
 }
 
 Controller.prototype = 
 {
	init: function()
	{
		this.setViewEventListeners();
	},
	
	//Set Views eventListener
	setViewEventListeners: function()
	{
		this.submitHandler = this.submitEvent.bind(this);
		
		this.view.setButtonEvent('#submit', this.submitHandler);
	},
	
	//Submit buttons event
	submitEvent: function()
	{
		this.view.removeContents();
		if(this.model.check())
		{
			this.model.submit();
		}	
		else
		{
			this.model.error("All qustions must be answered");
		}
		
	}
 }