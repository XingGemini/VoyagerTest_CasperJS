/**
 * Helper methods for navigating through a site.
 *
 * This file is included automagically by the "test" executable.
 */
var utils = require('utils');
var MAXWAITINGTIME = 60000;
var NORMALWAITINGTIME = 5000;
var SHORTWAITINGTIME = 2000;
var NOWAITINGTIME = 10;

casper.init = function (path) {
	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:36.0) Gecko/20100101 Firefox/36.0');
	casper.options.viewportSize = {width: 1280, height: 720};
	casper.on('page.error', function(msg, trace) {
		this.echo('Error: ' + msg, 'ERROR');
		for(var i=0; i<trace.length; i++) {
			var step = trace[i];
			this.echo('  ' + step.file + ' (line ' + step.line + ')', 'ERROR');
		}
	});
};

/**
 * Wrapper for http://docs.casperjs.org/en/latest/modules/casper.html#open
 *
 * Uses url argument from the command line in order to open a URL path.
 */
casper.openPath = function (path) {
	 var cleanPath = path.replace(/^\//, '');
	 return casper.open(casper.cli.get('url') + '/' + cleanPath);
};

/**
 * Wrapper for http://docs.casperjs.org/en/latest/modules/casper.html#thenopen
 *
 * Uses url argument from the command line in order to open a URL path and
 * define a navigation step.
 */
casper.thenOpenPath = function (path, thenCallback) {
  var cleanPath = path.replace(/^\//, '');
  return casper.thenOpen(casper.cli.get('url') + '/' + cleanPath, thenCallback);
};

// Generalized Operations
/*
 * clickDOM:
 *  	verify the existance and click the given elector
 */

casper.clickDOM = function (selector) {
	this.waitForSelector(selector,
		function success() {
			console.log ("\tclick action + " + selector);
			this.click (selector);
		},
		function fail() {
			console.error(selector + "can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}

/*
 * fetchSelectorText:
 *  	verify the existance and fetch the text of the given selector
*/

casper.fetchDOMText = function (myselector, idx, callback) {
	this.waitForSelector (myselector,
		function success () {
			var elements = this.getElementsInfo(myselector)
			var rtn_txt = elements[idx].text;
			callback (rtn_txt);
		},
		function fail () {
			console.error(myselector + " can NOT be found.");
			callback ();
		},
		MAXWAITINGTIME
	);
	return this;
}

/*
 * fetchSelectorText:
 *  	verify the existance and fetch the text of the given selector
*/
casper.inputToSelector = function (myselector, str) {
	this.waitForSelector (myselector,
		function success () {
			console.log ("Input string to selector" + str);
			this.sendKeys(myselector, str);
			this.wait (
				2000);
		},
		function fail () {
			console.error(myselector + " can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}


casper.inputByFill= function (formselector, value, submitflag) {
	this.waitForSelector (formselector,
		function success () {
			var submit = false || submitflag

			console.log ('\tform found ' + formselector) ;
			this.fill (formselector, value, submit);
		},
		function fail () {
			console.error(formselector + "can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}

casper.inputByFillSelectors = function (formselector, value, submitflag) {
	this.waitForSelector (formselector,
		function success () {
			var submit = false || submitflag
			console.log ('form found ' + formselector) ;
			this.fillSelectors (formselector, value, submit);
		},
		function fail () {
			console.error(formselector + "can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}

/* 
	function verifyExistanceDOM: verify the existance of a button
	input
		test: 			test handle
		testInfoString: the string about the test is about
		selector: 		CSS selector of DOM
*/
casper.verifyExistanceDOM = function verifyExistanceDOM (test, testInfoString, selector) {
	this.waitForSelector (selector,
		function success() {
			test.assertExists (selector, testInfoString);
		}, 
		function fail() {
			test.assertExists (selector, testInfoString);
		}
	);
};


/* 
	function verifyNotExistanceDOM: verify the existance of a button
	input
		test: 			test handle
		testInfoString: the string about the test is about
		selector: 		CSS selector of DOM
*/
casper.verifyDoesntExistanceDOM = function verifyNonExistanceDOM (test, testInfoString, selector) {
	this.waitForSelector (selector,
		function success() {
			test.assertDoesntExist (selector, testInfoString);
		}, 
		function fail() {
			test.assertDoesntExist (selector, testInfoString);
		}
	);
};

/* 
	function verifyClickDOM: Click the button and verify the given display text after a successful click
	input
		test: 			test handle
		testInfoString: the string about the test is about
		selector: CSS selector of DOM
		textSelector:	CSS selector of text to verify a successful click
		expectedText: 	expected text for the textSelector

*/
casper.verifyClickDOM = function verifyClickDOM (test, testInfoString, selector, textSelector, expectedText) {
	// 
	//console.log (testInfoString); 
	this.clickDOM (selector);
	this.fetchDOMText(textSelector, 0, function getText (actualText) {
		actualText = actualText.replace (/^\s+/, '');
		actualText = actualText.replace (/\s+$/, '');
		test.assertEquals (actualText, expectedText, testInfoString);
	});
};

/* 
	function verifyClosePopup: Click the button and verify that the popup window is successfully clossed
	input
		test: 			test handle
		testInfoString: the string about the test is about
		selector: CSS selector of DOM
		popupSelector:	CSS selector on pop up windows

*/
casper.verifyClosePopup = function verifyClosePopup (test, testInfoString, selector, popupSelector) {
	// 
	//console.log (testInfoString); 
	this.clickDOM (selector);
	this.wait (
		NORMALWAITINGTIME,

		function then () {
			test.assertDoesntExist (popupSelector, testInfoString);
	});
};


/* 
	function verifyText: Click the button and verify the given display text after a successful click
	input
		test: 			test handle
		testInfoString: the string about the test is about
		textSelector:	CSS selector of text to verify
		expectedText: 	expected text for the textSelector

*/
casper.verifyText = function verifyText (test, testInfoString, textSelector, expectedText) {
	// verify any text
	//console.log (testInfoString); 
	this.fetchDOMText(textSelector, 0, function getText (actualText) {
		actualText = actualText.replace (/^\s+/, '');
		actualText = actualText.replace (/\s+$/, '');
		test.assertEquals (actualText, expectedText,
			testInfoString);
	});
};
