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

	var usr = {	'usrID':"xxu+00all@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute'};

	casper.login ('/login.html', usr.usrID, usr.pwd, usr.Institution);
	
	casper.waitForSelector(".cgIcon-hamburgerMenu",
		function success() {
			test.assertExists(".cgIcon-hamburgerMenu", "User logged in.");
			this.click(".cgIcon-hamburgerMenu");
			console.log(this.getCurrentUrl());
		},
		function fail() {
			test.assertExists(".cgIcon-hamburgerMenu");
			this.echo(this.getCurrentUrl());
			this.capture("login_fail.png");
		}
	);

	casper.waitForSelector("#adminContainer > .submenuLink.adminCategoryLink:nth-child(1)",
		 function success() {
			test.assertExists("#adminContainer > .submenuLink.adminCategoryLink:nth-child(1)",
							"User is able to select Admin > Institution");
			this.click("#adminContainer > .submenuLink.adminCategoryLink:nth-child(1)");
		 },
		 function fail() {
			test.assertExists("#adminContainer > .submenuLink.adminCategoryLink:nth-child(1)");
			this.capture ("admin_fail.png");
	});

	casper.waitForSelector(x("//div[@id='detailView']/header/div/div"),
		function success() {
			var txt = this.fetchText(x("//div[@id='detailView']/header/div/div"));
			//this.echo (txt);
			test.assertMatch(txt, /Institution Detail/i, 
							 "Institution Detail is displaying");
		},
		function fail() {
			test.assertExists(x("//div[@id='detailView']/header/div/div"), 
				"Institution Detail is NOT displaying");
		}
	);

	casper.waitForSelector(x("//div[@id='detailView']/header/div[2]/span"),
		function success() {
			var txt = this.fetchText(x("//div[@id='detailView']/header/div[2]/span"));
			txt = txt.replace('undefined', '')
			//this.echo (txt);
			test.assertEqual(txt, usr.Institution, 'User\'s Institution matches');
		},
		function fail() {
			test.assertExists(x("//div[@id='detailView']/header/div[2]/span"));
		}
	);

	casper.waitForSelector(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"),
		function success() {
			var button = this.fetchText(x("//div[@id='listView']/div/div/button"));
			test.assertNotEquals(button, 'NEW',
				'User can NOT be able to create new Institutions. The new button is NOT displayed on the UI.');
			var txt = this.fetchText(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"));
			var institution_cnt = txt.split(" ", 1);
			test.assertEqual(institution_cnt, 1, 
							'User with ONLY istitituion privilege should not see other institutions.');

		},
		function fail() {
			test.assertExists(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"));
		}
	);

	casper.run(function() {test.done();});
});
