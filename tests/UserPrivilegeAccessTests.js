/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	Test user's privilege matches the admin menu display
	- log in
	- Admin menu check 
	- log out
*/

var x = require('casper').selectXPath;

casper.init();


var usrs = [USR00ALL, 
			USR00USER, 
			USR00CASE,
			USR00GROUP,
			USR00INSTITUTION,
			//USR00SAMPLE,
			USR00REPORT,
			USR00TEST,
			USR00FILTER,
			USR00IMPORT
			];

usrs.forEach(function checkEachUser (usr){

	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		casper.start();
		
		casper.login ('/login.html', usr);

		casper.then (function openHamburgerMeun () {
			this.waitForSelector (".cgIcon-hamburgerMenu",
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
		});

		if (usr.Privilege.length == 0 ) {
			casper.waitForSelector(".homelink", 
				function success() {
					test.assertNotExists("#adminContainer",
								"User has no Admin Privilege");
			 	},
			 	function fail() {
					test.assertExists("#adminContainer");
					this.capture ("admin_showup.png");
			});
		} else {
			casper.waitForSelector("#adminContainer > .submenuLink.adminCategoryLink",
				function success() {
					var elements = this.getElementsInfo ("#adminContainer > .submenuLink.adminCategoryLink");
					
					//utils.dump(elements);
					//utils.dump(usr);
					//console.log ("length"  + usr.Privilege.length);

					for (var i = 0; i < usr.Privilege.length; i++) {
						var matchflag = 0;
						console.log ("checking " + usr.Privilege[i]);
						
						if (usr.Privilege[i] == "Filters") {
							var txt = this.fetchText ("#adminContainer > .secondaryLevelLink");
							txt = txt.replace(/\s/g, '')
							test.assertEqual (txt, "Filters", "User have the admin access of " + usr.Privilege[i]);
							continue;
						}
	
						for (var j = 0; j < elements.length; j++) {
							if (elements[j].text == usr.Privilege[i]) {
								matchflag = 1;
								break;
							} 
						}
	
						test.assertEqual (matchflag, 1, "User have the admin access of " + usr.Privilege[i]);
					}
				 },
				 function fail() {
					if (usr.Privilege[0] == "Filters") {
						var txt = this.fetchText ("#adminContainer > .secondaryLevelLink");
						txt = txt.replace(/\s/g, '')
						test.assertEqual (txt, "Filters", "User have the admin access of " + usr.Privilege[0]);
					} else {
						test.assertEqual (usr.Privilege.length, 0, "User does not have any admin privilege.");
					}
			});
		}

		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
	});
});
