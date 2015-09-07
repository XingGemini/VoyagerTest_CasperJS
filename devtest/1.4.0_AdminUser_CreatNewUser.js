/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User has the instance privilege can edit institution
	
	User with institution management privilege
	- log in
	- Admin > Institution

	validation
	- No new button 
	- Only one record in the list (the user's institution.
*/

var x = require('casper').selectXPath;

casper.init();

var myBucket = new bucket ("Test", "voyager.us-east-1.completegenomics.com/sample");

var usrs = [USR00ALL, 
			//USR00INSTITUTION,
			//USR00INSTANCE,
			//USR00SAMPLE,
			];

var NEWUSR1 = new usr ('T_firstName', 'T_lastName', randomName(8, 'test-voyager+')+'@completegenomics.com', 'Complete1', ['MANAGE_USER', 'MANAGE_INSTITUTION']);

var newusers = [
	NEWUSR1,
];

usrs.forEach(function checkEachUser (usr){

newusers.forEach(function checkEachNewUser (newUsr){
	
	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		var privilege = 'Users';

		console.log(usr.institution)

		casper.start();
		
		casper.admin ('/login.html', usr, privilege);

		casper.then(function createBucket () {
			// create a user
			this.verifyClickDOM (test, "Click the new button ...", S_NEWITEMBUTTON, S_POPUPTITLE, "Create New User");

			this.inputByFill (S_INPUTTABLE, {'person.firstName':newUsr.firstName});
			this.inputByFill (S_INPUTTABLE, {'person.lastName':newUsr.lastName});

			this.validateClickButton (test, "Expand contact information section ...", ".column-16.toggleable:nth-child(2)>.sectionToggle>button", "label[for='email']", "Email *");

			this.inputByFill ('.column-16.toggleable:nth-child(2)>form.form-horizontal', {'person.email':newUsr.email});

			this.validateClickButton (test, "Expand contact information section ...", ".column-16.toggleable:nth-child(3)>.sectionToggle>button", ".checkList>li>.checkbox>label", "Instance Admin");


			newUsr.privilege.forEach (function checkbox (privilege) {
				casper.then ( function checkPrivileges() {
					this.validateClickButton (test, "check the Privilege ...", "input[data-access-privilege=\""+privilege+"\"\]", ".checkList>li>.checkbox>label", "Instance Admin");
				});
			});

			this.validateClickButton (test, "Expand password information section ...", ".column-16.toggleable:nth-child(4)>.sectionToggle>button", "label[for='password']", "Password");
			this.inputByFill ('.column-16.toggleable:nth-child(4)>form.form-horizontal', {'password':newUsr.password});
			this.inputByFill ('.column-16.toggleable:nth-child(4)>form.form-horizontal', {'confirmPassword':newUsr.password});

			this.validateClickButton (test, "Click the save button ...", ".btn-rounded-inverse.saveButton",
									".headerSingleText", "Administration > " + privilege);
			this.wait (
				NORMALWAITINGTIME,
				function then () {
					this.validateText (test, "Name matching", ".detailTitleText", newUsr.firstName + " " + newUsr.lastName);
			});
		});
		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
	});

});
});

casper.editInstitution = function editInstitution(test) {
	this.clickSelector (".cgIcon-editBtn");

	var editOptionSelector = "a[data-option=\'edit\']";
		
	this.waitForSelector ( editOptionSelector, 
		function success() {
			this.fetchSelectorText(editOptionSelector, 0,
				function validation (returntxt) {
					test.assertEqual (returntxt, 
								 'Edit Institution', 
								 'Edit institution option exists.');
					});
					this.click(editOptionSelector);
				},
				function fail() {
					console.error (editOptionSelector + " can not be found.");
				},
				1000
			);
	return this;
};

casper.testInstNameMatch = function testInstNameMatch (test, waitTime, selectorInstName, nameToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchSelectorText(selectorInstName, 0, function getText (instName) {
			test.assertEquals (instName, nameToCheck,
				'Institution name is changed successfully.');
		});
	});
};


casper.testInstTypeMatch = function testInstTypeMatch (test, waitTime, selectorInstType, typeToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchSelectorText(selectorInstType, 0, function getText (instType) {
			instType = instType.replace(/\s+/g, "");
			instType = instType.replace(/Type:/g, "");
			test.assertEquals (instType, typeToCheck,
				'Institution Type is changed successfully.');
		});
	});
};


casper.testInstDescriptionMatch = function testInstTypeMatch (test, waitTime, selectorInstDesciption, descriptionToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchSelectorText(selectorInstDesciption, 1, function getText (instDescription) {
			instDescription = instDescription.replace(/\s+Description:\s+/g, "");
			instDescription = instDescription.replace(/\s+$/g, "")
			test.assertEquals (instDescription, descriptionToCheck,
				'Institution Description is changed successfully.');
		});
	});
};

casper.clickBucketDetail = function clickBucketDetail (test) {
	this.clickSelector ("#tabAdminInstitutionBucketDetail");
	this.fetchSelectorText(".blueHeader", 0, function getText (header) {
		test.assertEquals (header, "Amazon S3 Buckets",
				'Reached the Bucket Details Page.');
	});
};

casper.validateExistanceButton = function validateExistanceButton (test, buttonSelector, buttonName) {
	this.waitForSelector (buttonSelector,
		function success() {
			test.assertExists (buttonSelector, buttonName + " button prensents");
		}, 
		function fail() {
			test.assertExists (buttonSelector, buttonName + " button DOES NOT prensents");
		}
	);
};

casper.validateClickButton = function validateClickButton (test, testString, buttonSelector, textSelector, expectedText) {
	// Validate any button
	console.log (testString); 
	this.clickSelector (buttonSelector);
	this.fetchSelectorText(textSelector, 0, function getText (actualText) {
		actualText = actualText.replace (/^\s+/, '');
		actualText = actualText.replace (/\s+$/, '');
		test.assertEquals (actualText, expectedText,
			testString + "is successful");
	});
};


casper.validateText = function validateClickButton (test, testString, textSelector, expectedText) {
	// Validate any text
	console.log (testString); 
	this.fetchSelectorText(textSelector, 0, function getText (actualText) {
		actualText = actualText.replace (/^\s+/, '');
		actualText = actualText.replace (/\s+$/, '');
		test.assertEquals (actualText, expectedText,
			testString + " is successful");
	});
};
/*	
		// Validate x close button
		casper.then(function validateXCloseButton () {
			console.log ("Validate X Close button..."); 
			this.editInstitution(test);
			this.clickSelector (".cgIcon-panelXButton.handCursored");
	
			this.fetchSelectorText(".headerSingleText", 0, function getText (workspaceTitle) {
				var expected_title = "Administration > " + privilege;
				test.assertEquals (workspaceTitle, expected_title,
					"Click the X Close botton, Return to Administration > " + privilege);
			});
		});
*/