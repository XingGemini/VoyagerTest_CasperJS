/**
 * Helper methods for navigating through a site.
 *
 * This file is included automagically by the "test" executable.
 */
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
casper.login = function (path, usr) {
	var cleanPath = path.replace(/^\//, '');
	var usid = usr.usrID;
	var pwd = usr.pwd;
	
	casper.thenOpen(casper.cli.get('url') + '/' + cleanPath);

	console.log ("Logging in as " + usid + " ...");

	casper.waitForSelector("input[name='userName']",
		function success() {
			this.sendKeys("input[name='userName']", usid);
		},
		function fail() {
			console.log("input[name='userName'] is not found");
		}
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
		}
	);

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
}
