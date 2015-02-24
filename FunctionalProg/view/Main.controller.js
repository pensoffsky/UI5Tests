jQuery.sap.declare("view.Main");
jQuery.sap.require("view.PensoffskyUtil");

sap.ui.controller("view.Main", {

	_aCities: ["Heidelberg", "Stuttgart", "Basel", "Montreal", "Casablanca", "NYC"],


	onInit: function() {
		//var fHelloWorld = this.outputSomething("Hello World");
		//fHelloWorld();
		//this.curryTest();
		
		
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

	curryTest : function(){
		//create a currified version of thr randomSampleArray function
		//use proxy to set the this to
		var fRandomCity = jQuery.proxy(view.PensoffskyUtil.randomSampleFromArray.curry(this._aCities), view.PensoffskyUtil);
		//call the function to get 3 random cities
		var aRandomCities = fRandomCity(3);
		console.log(aRandomCities);
	},

});