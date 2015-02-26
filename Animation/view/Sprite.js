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
            
            "stepsX" : {
                type : "int",
                defaultValue : 0
            },
            
            "stepsY" : {
                type : "int",
                defaultValue : 1
            },
            
            "startX" : {
                type : "int",
                defaultValue : 0
            },
            
            "startY" : {
                type : "int",
                defaultValue : 0
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
    }

});

view.Sprite.prototype.init = function() {

};


view.Sprite.prototype.onAfterRendering = function() {
    sap.m.Image.prototype.onAfterRendering.call(this);
    this.stopAnimation();
    this.startAnimation();
};

view.Sprite.prototype.startAnimation = function() {
    if(this._nIntervId){
        //animation already running
        return;
    }
    
    var that = this;
    //TODO set start steps
    that._currentStepX = that.getStartX();
    that._currentStepY = that.getStartY();
    that._nIntervId = setInterval(function(){ 
        
        var width = that.getWidth();
        that._currentStepX++;
        
        //end of line?
        if(that._currentStepX >= that.getStepsX()){
            //next line
            that._currentStepY++;
            that._currentStepX = 0;
            
            //start from 0,0?
            if(that._currentStepY >= that.getStepsY()){
                that._currentStepY = 0;
                if(that.getRepeat() === false){
                    //stop animation
                    clearInterval(that._nIntervId);
                    that._nIntervId = null;
                }
            }
        }
        
        that.$().css("background-position-x", "" + that._currentStepX * that.getStepWidth() +"px");    
        that.$().css("background-position-y", "" + that._currentStepY * that.getStepHeight() +"px");   
    }, that.getDelayMs());
};

view.Sprite.prototype.stopAnimation = function() {
    if(!this._nIntervId){
        //animation not running
        return;
    }
    
    window.clearInterval(this._nIntervId);
    
    this.$().css("background-position-x", "" + 0 +"px");    
    this.$().css("background-position-y", "" + 0 +"px");  
};