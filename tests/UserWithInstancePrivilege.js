/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) */
/*==============================================================================*/
var x = require('casper').selectXPath;

casper.init();

casper.test.begin('User with Instance Privilege', function(test) {
	var usr = USR00INSTANCE;  // using USR00INSTANCE

	casper.start();

	casper.login ('/login.html', usr);
	
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

	casper.waitForSelector("#detailView > .detailHeading > .subPanelHeading > .subPanelTitle",
		function success() {
			var txt = this.fetchText("#detailView > .detailHeading > .subPanelHeading > .subPanelTitle");
			//this.echo (txt);
			test.assertMatch(txt, /Institution Detail/i, 
							 "Institution Detail is displaying");
		},
		function fail() {
			test.assertExists("#detailView > .detailHeading > .subPanelHeading > .subPanelTitle", 
				"Institution Detail is NOT displaying");
		}
	);

	casper.waitForSelector("#detailView > .detailHeading > .detailTitle > .detailTitleText",
		function success() {
			var txt = this.fetchText("#detailView > .detailHeading > .detailTitle > .detailTitleText");
			txt = txt.replace('undefined', '')
			//this.echo (txt);
			test.assertEqual(txt, usr.Institution, 'User\'s Institution matches');
		},
		function fail() {
			test.assertExists("#detailView > .detailHeading > .detailTitle > .detailTitleText");
		}
	);

	casper.waitForSelector(".addListItemButton",
		function success() {
			test.assertExists(".addListItemButton", 
				'User can create new Institutions.');
			var txt = this.fetchText (".addListItemButton");
			test.assertEquals(txt, 'NEW',
				'The new button is displayed on the UI.');
		},
		function fail() {
			test.assertExists(".addListItemButton", 
				'User can create new Institutions.');
		}
	);

	casper.logout();

	casper.run(function() {slimer.clearHttpAuth(); test.done();});
});
