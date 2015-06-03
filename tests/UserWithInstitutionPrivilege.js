/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) */
/*==============================================================================*/
//var require = patchRequire(require);

var x = require('casper').selectXPath;
//var ch = require ('./chance');

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.');
casper.options.viewportSize = {width: 1280, height: 720};
casper.on('page.error', function(msg, trace) {
	this.echo('Error: ' + msg, 'ERROR');
	for(var i=0; i<trace.length; i++) {
		var step = trace[i];
			this.echo('  ' + step.file + ' (line ' + step.line + ')', 'ERROR');
	}
});

casper.test.begin('User with Institution Privilege', function(test) {
	casper.start();

	casper.login ('/login.html', 'xxu+00all@completegenomics.com', 'Complete1');
	
	casper.waitForSelector(".cgIcon-hamburgerMenu",
		function success() {
			test.assertExists(".cgIcon-hamburgerMenu");
			this.click(".cgIcon-hamburgerMenu");
			console.log(this.getCurrentUrl());
			this.capture("LoggedIn.png");
		},
		function fail() {
			this.echo(this.getCurrentUrl());
			this.capture("Login_fail.png");
			test.assertExists(".cgIcon-hamburgerMenu");
		}
	);


	casper.waitForSelector(".cgIcon-hamburgerMenu",
		function success() {
			this.click(".cgIcon-hamburgerMenu");
		},
		function fail() {
			test.assertExists(".cgIcon-hamburgerMenu");
		}
	);
	
	casper.waitForSelector(".topLevelLink.submenuActiveLink.submenuEnabled",
		function success() {
			this.click(".topLevelLink.submenuActiveLink.submenuEnabled");
		},
		function fail() {
			test.assertExists(".topLevelLink.submenuActiveLink.submenuEnabled");
			this.capture ("topLevelLink.png")
		}
	);

	casper.waitForSelector(x("//*[contains(text(), \'Institutions\')]"),
		function success() {
			test.assertExists(x("//*[contains(text(), \'Institutions\')]"));
		},
		function fail() {
			test.assertExists(x("//*[contains(text(), \'Institutions\')]"));
		}
	);

	casper.waitForSelector(x("//*[contains(text(), \'Administration > Institutions\')]"),
		function success() {
			test.assertExists(x("//*[contains(text(), \'Administration > Institutions\')]"));
			},
		function fail() {
			test.assertExists(x("//*[contains(text(), \'Administration > Institutions\')]"));
	});

	casper.run(function() {test.done();});
});
