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

casper.test.begin('User with Instance Privilege', function(test) {
	casper.start();

	var usr = {	'usrID':"xxu+00instance@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute'};

	casper.login ('/login.html', usr.usrID, usr.pwd, usr.Institution);
	
	casper.waitForSelector(".cgIcon-hamburgerMenu",
		function success() {
			test.assertExists(".cgIcon-hamburgerMenu", "User logged in.");
			this.click(".cgIcon-hamburgerMenu");
			//console.log(this.getCurrentUrl());
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

	casper.waitForSelector(x("//div[@id='listView']/div/div/button"),
		function success() {
			test.assertExists(x("//div[@id='listView']/div/div/button"), 
				'User can create new Institutions.');
			var txt = this.fetchText (x("//div[@id='listView']/div/div/button"));
			test.assertEquals(txt, 'NEW',
				'The new button is displayed on the UI.');
		},
		function fail() {
			test.assertExists(x("//div[@id='listView']/div/div/button"), 
				'User can create new Institutions.');
		}
	);


	casper.waitForSelector(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"),
		function success() {
			var txt = this.fetchText(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"));
			var institution_cnt = txt.split(" ", 1);
			test.assertEqual(((institution_cnt-1) > 0), true, 
							'User with instance privilege can see all institutions.');
		},
		function fail() {
			test.assertExists(x("//div[@id='listView']/div[2]/div/div[2]/div[2]/span"));
		}
	);

	casper.run(function() {test.done();});
});
