/**
 * Helper methods for navigating through a site.
 *
 * This file is included automagically by the "test" executable.
 */
var utils = require('utils');
var MAXWAITINGTIME = 60000;

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


/**
 * Wrapper for http://docs.casperjs.org/en/latest/modules/casper.html#thenopen
 *
 * Uses url argument from the command line in order to open a URL path and
 * define a navigation step.
 */
casper.login = function (path, usr) {
	var cleanPath = path.replace(/^\//, '');
	var usid = usr.usrID;
	var pwd = usr.pwd;
	
	console.log ("path " + cleanPath);
	console.log ("URL " + casper.cli.get('url'));
	casper.thenOpen(casper.cli.get('url') + '/' + cleanPath);

	console.log ("Logging in as " + usid + " ...");

	casper.waitForSelector("input[name='userName']",
		function success() {
			this.sendKeys("input[name='userName']", usid);
		},
		function fail() {
			console.log("input[name='userName'] is not found");
		}, 
		MAXWAITINGTIME
	);

	casper.waitForSelector("input[name='password']",
		function success() {
			this.sendKeys("input[name='password']", pwd);
		},
		function fail() {
			console.log("input[name='password'] is not found");
		}
	);

	casper.waitForSelector(".button.login",
		function success() {
			this.click(".button.login");
		},
		function fail() {
			console.log("login button is not found");
		}
	);

	casper.waitForUrl("/index.html", 
		function success() {
			console.log("=> index.html");
		},
		function fail() {
			console.log("index.html can not be loaded.");
			this.capture("waitnewpage.png");
		}
	);

	casper.waitForSelector(".cgIcon-hamburgerMenu",
		function success() {
			console.log("Logged in successfully.");
		},
		function fail() {
			console.log("User " +  usid + " DID NOT log in successfully.");
			this.capture("login_fail.png");
		},
		MAXWAITINGTIME
	);

};

function validatePrivilege (usr, privilege) {
	var validate_privilege = false;

	for (var i = 0; i < usr.Privilege.length; i++) {
		if (usr.Privilege[i] == privilege) {
			validate_privilege = true;
			break;
		}
	}

	return validate_privilege;
}


casper.admin = function (path, usr, privilege) {	
	casper.login (path, usr);

	casper.waitForSelector("#adminContainer > .submenuLink.adminCategoryLink",
		function success() {
			var elements = this.getElementsInfo ("#adminContainer > .submenuLink.adminCategoryLink");
			
			//utils.dump(elements);
			//utils.dump(usr);
			//console.log ("length"  + usr.Privilege.length);
			var matchflag = 0;
			var pvl_idx = 1;
			for (var j = 0; j < elements.length; j++) {
				if (elements[j].text == privilege) {
					matchflag = 1;
					pvl_idx = j+1;
					break;
				}
			}

			console.log ("pvl_idx " + pvl_idx);
			this.click("#adminContainer > .submenuLink.adminCategoryLink:nth-child("+pvl_idx+")");
			
			//test.assertEqual (matchflag, 1, "User have the admin access of " + privilege);
		 },
		 function fail() {
			if (privilege == "Filters") {
				var txt = this.fetchText ("#adminContainer > .secondaryLevelLink");
				txt = txt.replace(/\s/g, '')
				test.assertEqual (txt, "Filters", "User have the admin access of " + usr.Privilege[0]);
			} 
		}
	);

	return this;
};

casper.logout = function () {
	casper.waitForSelector(x("//a[normalize-space(text())='Log Out']"),
		function success() {
			//test.assertExists(x("//a[normalize-space(text())='Log Out']"));
			this.click(x("//a[normalize-space(text())='Log Out']"));
			console.log ("Logging out ...")
		},
		function fail() {
			test.assertExists(x("//a[normalize-space(text())='Log Out']"));
	});

	return this;
}


/*
 * WorkSpace Validation:
 *  	Validate the current
 */

 casper.isWorkSpace = function (selector, privilege_str) {
 	var isWorkSpaceFlag = false;
	var workspace_str = casper.fetchSelectorText (selector);
	console.log ("here" + workspace_str + "vs " + privilege_str)
	if (workspace_str == privilege_str) {
		isWorkSpaceFlag = true;
	}

	return isWorkSpaceFlag;
}


// Generalized Operations
/*
 * clickSelector:
 *  	Validate the existance and click the given elector
 */

casper.clickSelector = function (selector) {
	this.waitForSelector(selector,
		function success() {
			console.log ("click action + " + selector);
			utils.dump (selector);
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
 *  	Validate the existance and fetch the text of the given selector
*/

casper.fetchSelectorText = function (myselector, idx, callback) {
	this.waitForSelector (myselector,
		function success () {
			var elements = this.getElementsInfo(myselector)
			var rtn_txt = elements[idx].text;
			console.log("rtn " + rtn_txt );
			callback (rtn_txt);
		},
		function fail () {
			console.error(myselector + "can NOT be found.");
			callback ();
		},
		MAXWAITINGTIME
	);
	return this;
}

casper.fetchSelectorTextSimple = function (myselector, idx, callback) {
	this.waitForSelector (myselector,
		function success () {
			var elements = this.getElementsInfo(myselector)
			var rtn_txt = elements[idx].text;
			console.log("simple rtn " + rtn_txt );
			callback(rtn_txt);
		},
		function fail () {
			console.error(myselector + "can NOT be found.");
			callback();
		},
		MAXWAITINGTIME
	);
	return this;
}


/*
 * fetchSelectorText:
 *  	Validate the existance and fetch the text of the given selector
*/

casper.inputToSelector = function (myselector, str) {
	this.waitForSelector (myselector,
		function success () {
			console.log ("str" + str);
			this.sendKeys(myselector, str);
			this.wait (
				2000);
		},
		function fail () {
			console.error(myselector + "can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}


casper.inputByFill= function (formselector, value, submitflag) {
	this.waitForSelector (formselector,
		function success () {
			var submit = false || submitflag

			console.log ('form found' + formselector) ;
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
			console.log ('form found' + formselector) ;
			this.fillSelectors (formselector, value, submit);
			//this.wait (
			//	1000);
		},
		function fail () {
			console.error(formselector + "can NOT be found.");
		},
		MAXWAITINGTIME
	);
	return this;
}