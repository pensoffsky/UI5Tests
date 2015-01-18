jQuery.sap.declare("view.PensoffskyUtil");

view.PensoffskyUtil = {

	/**
	 * returns a shuffled array
	 */
	shuffleArray: function(aArray) {
		var i = 0;
		var aRet = [];
		aArray.forEach(function(vEach) {
			var iRand = Math.floor(Math.random() * i++);
			aRet[i - 1] = aRet[iRand];
			aRet[iRand] = vEach;
		});
		return aRet;
	},

	/**
	 * returns iElements random elements from an array.
	 */
	randomSampleFromArray: function(aArray, iElements) {
		return this.shuffleArray(aArray).splice(0, iElements);
	},

};