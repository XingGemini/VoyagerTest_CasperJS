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


/*
	Admin > Institution
	Edit institution 
*/
casper.editInstitution = function editInstitution(test) {
	this.verifyClickDOM (test, "Click Pen button", ".cgIcon-editBtn", "a[data-option=\'edit\']", "Edit Institution"); // click pen button
	this.verifyClickDOM (test, "Click Edit Option", "a[data-option=\'edit\']", S_POPUPTITLE, "Edit Institution"); // click edit option
	
	return this;
}

/*
	Open a popup window
	Check existance of cancel, save and close buttons
	Verify cancel and close buttons.

	test: Test;
	button:  button to open the popup window
	popupTitle: Text of Title on Popupwindows
*/
casper.verifyButtonsOnPopUp = function verifyButtonsOnPopUp (test, button, popupTitle) {
	this.verifyClickDOM (test, "Click Add button", button, S_POPUPTITLE, popupTitle); // click add button
	this.verifyExistanceDOM (test, "Verify existance of Save button", S_SAVEBUTTON);
	this.verifyExistanceDOM (test, "Verify existance of Cancel button", S_CANCELBUTTON);
	this.verifyExistanceDOM (test, "Verify existance of X Close button", S_XCLOSEBUTTON);
	this.verifyClosePopup (test, "Validating Cancel Button", S_CANCELBUTTON, S_POPUPTITLE);
	
	this.wait (
		SHORTWAITINGTIME, 
		function then () {
			this.verifyClickDOM (test, "Click Add button", button, S_POPUPTITLE, popupTitle); // click add button
	});

	this.wait (
		SHORTWAITINGTIME, 
		function then () {
			this.verifyClosePopup (test, "Validating X close Button", S_XCLOSEBUTTON, S_POPUPTITLE);
	});
	
	return this;
}


//.groupAdminDetailDetails>dl>dd:nth-child(4)>dl>dd:nth-child(2)>.contactDisplay
casper.verifyCreatedBy = function verifyCreatedBy (test, testString, creatorText) {
	this.wait (
		NOWAITINGTIME,
		function then () {
			this.fetchDOMText (S_Creator (4), 0, function getText (acturalCreatorText) {
				test.assertEqual (acturalCreatorText, creatorText, testString);
		});		
	});

	return this;
}

casper.verifyUpdatedBy = function verifyCreatedBy (test, testString, updatorText) {
	this.wait (
		NOWAITINGTIME,
		function then () {
			this.fetchDOMText (S_Updator (4), 0, function getText (acturalUpdatorText) {
				test.assertEqual (acturalUpdatorText, updatorText, testString);
		});		
	});

	return this;
}

casper.verifyKeyValuePair = function verifyKeyValuePair (test, testString, myKey, myValue) {
	this.wait (
		NOWAITINGTIME,
		function then () {
			var keys = this.getElementsInfo (S_KEYVALUE_DT (2));
			var values = this.getElementsInfo (S_KEYVALUE_DD (2));
			//utils.dump(keys);
			//utils.dump(values);

			var actualValue = '';
			for (var j = 0; j < keys.length; j++) {
				if (keys[j].text == myKey) {
					actualValue = values[j].text;
					break;
				}
			}

			test.assertEqual (actualValue, myValue, testString);
		}
	)

	return this;
}


