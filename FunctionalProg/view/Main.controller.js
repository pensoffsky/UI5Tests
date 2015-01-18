jQuery.sap.declare("view.Main");
jQuery.sap.require("view.PensoffskyUtil");

sap.ui.controller("view.Main", {

	_aCities: ["Heidelberg", "Stuttgart", "Basel", "Montreal", "Casablanca", "NYC"],


	onInit: function() {
		var fHelloWorld = this.outputSomething("Hello World");
		fHelloWorld();
	},

	// implement an event handler in the Controller
	doSomething: function() {
		debugger;
	},

	/**
	 * Closure
	 * returns a function wich will print sString to console when called
	 */
	outputSomething: function(sString) {
		return function() {
			console.log(sString);
		}
	},

});