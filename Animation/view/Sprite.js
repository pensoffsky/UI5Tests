jQuery.sap.declare("view.Sprite");

jQuery.sap.require("sap.m.Image");
jQuery.sap.require("sap.m.ImageRenderer");

sap.m.Image.extend('view.Sprite', {

    metadata : {
        properties : {
            
            /**
            * repeat the animation
            */
            "repeat" : {
                type : "boolean",
                defaultValue : true
            },
            
            /**
            * spriteSrc
            */
            "spriteSrc" : {
                type : "string",
                defaultValue : ""
            },
            
            "delayMs" : {
                type : "int",
                defaultValue : 1000
            },
            
            "steps" : {
                type : "int",
                defaultValue : 4
            },
            
            "stepWidth" : {
                type : "int",
                defaultValue : 0
            },
            
            "stepHeight" : {
                type : "int",
                defaultValue : 0
            },
        },
        events : {

        },
    },
    
    
    renderer : function(oRm, oImage) {
// Open the <img> tag
		oRm.write("<img");
	
		oRm.writeAttributeEscaped("src", oImage._getDensityAwareSrc());
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
    }

});

view.Sprite.prototype.init = function() {

};


view.Sprite.prototype.onAfterRendering = function() {
    sap.m.Image.prototype.onAfterRendering.call(this);
    this.startAnimation();
};

view.Sprite.prototype.startAnimation = function() {
    if(this._nIntervId){
        //animation already running
        return;
    }
    
    var that = this;
    that._currentStep = 0;
    that._nIntervId = setInterval(function(){ 
        var width = that.getWidth();
        that._currentStep++;
        if(that._currentStep >= that.getSteps()){
            //TODO check for repeat
            that._currentStep = 0;
            clearInterval(that._nIntervId);
            that._nIntervId = null;
        }
        that.$().css("background-position-x", "" + that._currentStep * that.getStepWidth() +"px");    
    }, that.getDelayMs());
};