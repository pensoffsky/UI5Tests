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
	},
	

	onBtnRemovePress : function(oEvent) {
		
		var oList = this.getView().byId("idList");
		var aItems = oList.getItems();
		var oLastItem = aItems[aItems.length -1];
		var oLastItemJqueryObject = $([oLastItem.getDomRef()]);
		var oModel = sap.ui.getCore().getModel();
		
		oLastItemJqueryObject.animate({height:"0px"}, "fast", 
			function(){
				var aCities = oModel.getProperty("/cities");
				aCities.splice(aCities.length -1 ,1);
				oModel.setProperty("/cities", aCities);	
			});
	},
	

	onBtnAddPress : function(oEvent) {
		var oModel = sap.ui.getCore().getModel();
		var aCities = oModel.getProperty("/cities");
		aCities.push({name: "Frankfurt"});
		oModel.setProperty("/cities", aCities);	
	},
	
	/**
	 * TODO what does this function do
	 * @public
	 */
	onSpritePress : function(oEvent) {
		var oSprite = this.getView().byId("idAnimatedSprite");
		oSprite.startAnimation();
	},
	
	animationStarted : function(oEvent) {
		console.log("animationStarted");
	},
	
	animationFinished : function(oEvent) {
		console.log("animationFinished");
	},
	
});