/**
 * Helper methods for navigating through a site.
 *
 * This file is included automagically by the "test" executable.
 */

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
casper.login = function (path, usid, pwd) {
	var cleanPath = path.replace(/^\//, '');
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

	casper.waitForSelector(x("//a[normalize-space(text())='Log In']"),
		function success() {
			this.click(x("//a[normalize-space(text())='Log In']"));
		},
		function fail() {
			console.log(x("//a[normalize-space(text())='Log In'] is not found"));
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
