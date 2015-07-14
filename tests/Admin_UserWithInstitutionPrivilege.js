/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) */
/*==============================================================================*/
/* 
	User has the institution mananagement privilege 
	
	User with institution management privilege
	- log in
	- Admin > Institution

	validation
	- No new button 
	- Only one record in the list (the user's institution.
*/

var x = require('casper').selectXPath;

casper.init();

casper.test.begin('User with Institution Privilege', function(test) {
	casper.start();

	var usr = USR00ALL;

	casper.login ('/login.html', usr);
	
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
			test.assertEqual(txt, USR00ALL.Institution, 'User\'s Institution matches');
		},
		function fail() {
			test.assertExists("#detailView > .detailHeading > .detailTitle > .detailTitleText");
		}
	);

	casper.waitForSelector(".expandButton",
		function success() {
			//var button = this.fetchText(x("//div[@id='listView']/div/div/button"));
			//this.capture ("newButton_fail.png");
			test.assertNotExists(".addListItemButton",
				'User can NOT be able to create new Institutions. The new button is NOT displayed on the UI.');

			var institution_cnt = this.fetchText(".resultCount");
			//this.echo (txt);
			//var institution_cnt = txt.split(" ", 1);
			test.assertEqual(institution_cnt, "1", 
							'User with ONLY istitituion privilege should not see other institutions.');

		},
		function fail() {
			test.assertExists(".expandButton");
		}
	);

	casper.logout();

	casper.run(function() {slimer.clearHttpAuth(); test.done();});
});
