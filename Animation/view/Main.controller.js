sap.ui.controller("view.Main", {
	// implement an event handler in the Controller
	doSomething: function() {
		//alert("Hello World!");
		var oLabel = this.getView().byId("idLabelTest");
		var oLabelDomRef = oLabel.getDomRef();
		var oLableJqueryObject = $([oLabelDomRef]);
		
		if(oLabelDomRef.style.marginLeft === "100px"){
			oLableJqueryObject.animate({marginLeft:"0px"});	
		}else{
			oLableJqueryObject.animate({marginLeft:"100px"});	
		}
		
		//debugger;
	}
	
});