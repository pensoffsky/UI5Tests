sap.ui.controller("view.Main", {
	
	onInit: function(){
		var fHelloWorld = this.outputSomething("Hello World");
		fHelloWorld();
	},
	
	// implement an event handler in the Controller
	doSomething: function() {
		alert("example 1");
	},
	
	
	/**
	 * returns a function wich will print sString to console when called
	 */
	outputSomething : function (sString){
		return function(){
			console.log(sString);
		}
	}
});