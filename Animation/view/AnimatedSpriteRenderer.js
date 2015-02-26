// Provides default renderer for control view.AnimatedSpriteRenderer
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";

	var AnimatedSpriteRenderer = {
	};
	
	AnimatedSpriteRenderer.render = function(oRm, oImage){
		oRm.write("<img");
	
		//oRm.writeAttributeEscaped("src", oImage._getDensityAwareSrc());
		oRm.writeAttributeEscaped("src", "view/img_trans.gif");
		oRm.writeControlData(oImage);
		
		oRm.addClass("viewSprite");
		oRm.addClass("sapMImg");
		if (oImage.hasListeners("press") || oImage.hasListeners("tap")) {
			oRm.addClass("sapMPointer");
		}
		
		oRm.writeClasses();
		
		//TODO need further discussion to decide if tooltip is still needed for mobile
		var tooltip = oImage.getTooltip_AsString();
		if (tooltip) {
			oRm.writeAttributeEscaped("title", tooltip);
		}
		
		// Dimensions
		if (oImage.getWidth() && oImage.getWidth() != '') {
			oRm.addStyle("width", oImage.getWidth());
		}
		if (oImage.getHeight() && oImage.getHeight() != '') {
			oRm.addStyle("height", oImage.getHeight());
		}
		
		oRm.addStyle("background-image", "url('" + oImage.getSpriteSrc() + "')");
		oRm.addStyle("");
		oRm.writeStyles();
		
		var sTooltip = oImage.getTooltip_AsString();
		if (sTooltip) {
			oRm.writeAttributeEscaped("title", sTooltip);
		}
		
		oRm.write(" />"); // close the <img> element
	};
	

	return AnimatedSpriteRenderer;

}, /* bExport= */ true);
