/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) */
/*==============================================================================*/
var x = require('casper').selectXPath;

casper.init();

casper.test.begin('User with Instance Privilege', function(test) {

	var usr = USR00INSTANCE;  // using USR00INSTANCE
	var privilege = 'MANAGE_INSTITUTION';

	casper.start();

	test.assertEqual (validatePrivilege(usr, privilege), true, 
						"User " + usr.email + "has the admin privilege of " + privilege);

	casper.admin ('/login.html', usr, privilege);

	// validate the institution detail is playing
	casper.then (function validateDetailTitle () {
		var selector = "#detailView > .detailHeading > .subPanelHeading > .subPanelTitle";
		casper.fetchSelectorText(selector, 0, function getText (detailTitle) {
			test.assertMatch (detailTitle, /Institution Detail/i,
				"Institution Detail is displaying");
		});
	});
	
	// validate the institution name match the user's institution
	casper.then (function valideInstitutionName () {
		var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
		casper.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
			test.assertEquals (subPanelTitle, usr.Institution,
				'User\'s Institution matches');
		});
	});

	// validate existance of the "new" button for 
	casper.then(function validateNewButton () {
		var selector = ".addListItemButton";
		casper.fetchSelectorText(selector, 0, function getText (newButton) {
			test.assertEquals (newButton, "NEW",
				'User\'s Institution matches');
		});
	});


	// click new button
	casper.then (function openCreateNewInstitutionPopup() {
		this.click (".addListItemButton");
	});

	// validate buttons on the popup
	casper.waitForSelector (".btn-rounded-inverse.saveButton",
		function success() {
			test.assertExists (".btn-rounded-inverse.saveButton", "Save button prensents");
			test.assertExists (".btn-rounded-inverse.cancelButton", "Cancel button prensents");
			test.assertExists (".cgIcon-panelXButton.handCursored", "X close button prensents");
		}, 
		function fail() {
			test.assertExists (".btn-rounded-inverse.saveButton", "Save button DOES NOT prensents");
		}
	);

	// Validate cancel button
	casper.then (function validateCancelButton () {
		console.log ("Validate cancel button..."); 
		casper.clickSelector (".btn-rounded-inverse.cancelButton");
		casper.fetchSelectorText(".headerSingleText", 0, function getText (workspaceTitle) {
			var expected_title = "Administration > " + privilege;
			test.assertEquals (workspaceTitle, expected_title,
				"Click the Cancel botton, Return to Administration > " + privilege);
		});
	});

	// Validate x close button
	casper.then (function reopen () {
		casper.clickSelector (".addListItemButton");
	});

	casper.then (function validateXCloseButton () {
		console.log ("Validate X Close button..."); 
		casper.clickSelector (".cgIcon-panelXButton.handCursored");

		casper.fetchSelectorText(".headerSingleText", 0, function getText (workspaceTitle) {
			var expected_title = "Administration > " + privilege;
			test.assertEquals (workspaceTitle, expected_title,
				"Click the X Close botton, Return to Administration > " + privilege);
		});
	});

	// Validate error msg for submitting an empty form
	casper.then (function reopen () {
		casper.clickSelector (".addListItemButton");
	});

	casper.then (function validateEmptySubmissionError () {
		console.log ("Validate error msg for submitting an empty form for " + privilege + " ..."); 
		casper.clickSelector (".btn-rounded-inverse.saveButton");
		casper.fetchSelectorText(".column-16.formErrorMessage", 0, function getText (errorMsg) {
			var expected_errorMsg = "Name field(s) are required";
			test.assertEquals (errorMsg, expected_errorMsg,
				"Submit an empty form will lead to an empty msg");
		});
	});

	casper.logout();

	casper.run(function() {slimer.clearHttpAuth(); test.done();});
});
