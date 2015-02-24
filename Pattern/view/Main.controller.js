jQuery.sap.declare("view.Main");
jQuery.sap.require("view.PensoffskyUtil");

sap.ui.controller("view.Main", {

	_aCities: ["Heidelberg", "Stuttgart", "Basel", "Montreal", "Casablanca", "NYC"],

	onInit: function() {
		
	},


	// implement an event handler in the Controller
	doSomething: function() {
		debugger;
		TogetherJS(this);
	}

});