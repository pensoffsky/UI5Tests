// Provides control AnimatedSprite.
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control'],
    function(jQuery, Control) {
        "use strict";

        var AnimatedSprite = Control.extend("view.AnimatedSprite", {
            metadata: {

                properties: {
                    
                    src : {type : "sap.ui.core.URI", group : "Data", defaultValue : null},
               
			        width : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
	
			        height : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
                    
                    repeat: {
                        type: "boolean",
                        defaultValue: true
                    },
                    delayMs: {
                        type: "int",
                        defaultValue: 1000
                    },
                    stepsX: {
                        type: "int",
                        defaultValue: 0
                    },
                    stepsY: {
                        type: "int",
                        defaultValue: 1
                    },
                    startX: {
                        type: "int",
                        defaultValue: 0
                    },
                    startY: {
                        type: "int",
                        defaultValue: 0
                    },
                    stepWidth: {
                        type: "int",
                        defaultValue: 0
                    },
                    stepHeight: {
                        type: "int",
                        defaultValue: 0
                    },
                    animateOnce: {
                        type: "boolean",
                        defaultValue: false
                    },
                },
                events: {
                    /**
        			 * Event is fired when the user clicks on the control.
        			 */
			        press : {}
                }
            }
        });

        AnimatedSprite.prototype.init = function() {
            this._initialAnimationFinished = false;
        };

        AnimatedSprite.prototype.onAfterRendering = function() {
            if (this.getAnimateOnce() && this._initialAnimationFinished === false) {
                this._initialAnimationFinished = true;
                this.stopAnimation();
                this.startAnimation();
            }
        };

        AnimatedSprite.prototype.ontap = function(oEvent) {
    		this.firePress({/* no parameters */});
    	};

        AnimatedSprite.prototype.startAnimation = function() {
            if (this._nIntervId) {
                //animation already running
                return;
            }

            var that = this;
            this._currentStepX = this.getStartX();
            this._currentStepY = this.getStartY();
            this._nIntervId = setInterval(function() {
                that._animateNextStep();
            }, that.getDelayMs());
        };

        AnimatedSprite.prototype._animateNextStep = function() {
            //var width = this.getWidth();
            this._currentStepX++;

            //end of line?
            if (this._currentStepX >= this.getStepsX()) {
                //next line
                this._currentStepY++;
                this._currentStepX = 0;

                //start from 0,0?
                if (this._currentStepY >= this.getStepsY()) {
                    this._currentStepY = 0;
                    if (this.getRepeat() === false) {
                        //stop animation
                        clearInterval(this._nIntervId);
                        this._nIntervId = null;
                    }
                }
            }

            this.$().css("background-position-x", "" + this._currentStepX * this.getStepWidth() + "px");
            this.$().css("background-position-y", "" + this._currentStepY * this.getStepHeight() + "px");
        };

        AnimatedSprite.prototype.stopAnimation = function() {
            if (!this._nIntervId) {
                //animation not running
                return;
            }

            window.clearInterval(this._nIntervId);

            this.$().css("background-position-x", "" + 0 + "px");
            this.$().css("background-position-y", "" + 0 + "px");
        };

        return AnimatedSprite;

    }, /* bExport= */ true);
