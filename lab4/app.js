var path = window.location.pathname;
var PAGE = path.split("/").pop();


var model = new Model();
var view = new View(model);
var controller = new Controller(model, view);
