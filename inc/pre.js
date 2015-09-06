//Test Common Utility

/**
 * Helper methods for navigating through a site.
 *
 * This file is included automagically by the "test" executable.
 */

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

var utils = require('utils');

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
casper.login = function login (path, usr) {
	var cleanPath = path.replace(/^\//, '');
	var usrid = usr.usrID;
	var pwd = usr.pwd;
	
	//casper.thenOpen(casper.cli.get('url') + '/' + cleanPath);
	console.log ("Logging in as " + usrid + " ...");

	casper.then (function loadpage () {
		casper.waitForUrl(casper.cli.get('url') + '/' + cleanPath, 
			function success() {
				console.log("=> index.html");
			},
			function fail() {
				console.log("index.html can not be loaded.");
				this.capture("waitnewpage.png");
		});
	});

	console.log ("Logging in as " + usrid + " ...");

	casper.then(function enterUserName () {
		this.waitForSelector("input[name='userName']",
			function success() {
				this.sendKeys("input[name='userName']", usrid);
			},
			function fail() {
				console.log("input[name='userName'] is not found");
			}
		);
	});

	casper.then(function enterPassward () {
		casper.waitForSelector("input[name='password']",
			function success() {
				this.sendKeys("input[name='password']", pwd);
			},
			function fail() {
				console.log("input[name='password'] is not found");
			}
		);
	});

	casper.then(function clickLogIn () {
		casper.waitForSelector(x("//a[normalize-space(text())='Log In']"),
			function success() {
				this.click(x("//a[normalize-space(text())='Log In']"));
			},
			function fail() {
				console.log(x("//a[normalize-space(text())='Log In'] is not found"));
			}
		);
	});

	casper.then(function loadLandingPage () {
		casper.waitForUrl("/index.html", 
			function success() {
				console.log("=> index.html");
			},
			function fail() {
				console.log("index.html can not be loaded.");
				this.capture("waitnewpage.png");
			});
	});	

	casper.then (function validateLogin () {
		casper.waitForSelector(".cgIcon-hamburgerMenu",
			function success() {
				console.log("Logged in successfully.");
			},
			function fail() {
				console.log("User " +  usrid + " DID NOT log in successfully.");
				this.capture("login_fail.png");
			},

			10000
		);
	});
};

casper.logout = function () {
	casper.then (function logout () {
		casper.waitForSelector(x("//a[normalize-space(text())='Log Out']"),
			function success() {
				//test.assertExists(x("//a[normalize-space(text())='Log Out']"));
				this.click(x("//a[normalize-space(text())='Log Out']"));
				console.log ("Logging out ...")
			},
			function fail() {
				test.assertExists(x("//a[normalize-space(text())='Log Out']"));
		});
	});	
};
