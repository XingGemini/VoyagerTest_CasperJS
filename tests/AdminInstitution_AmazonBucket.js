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

usrs.forEach(function checkEachUser (usr){

	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		var privilege = 'Institutions';

		console.log(usr.Institution)

		casper.start();
		
		casper.admin ('/login.html', usr, privilege);

		//Edit button.
		casper.then(function clickEdit () {
			this.editInstitution(test);
			//validate buttons on the popup
			this.validateExistanceButton (test, ".btn-rounded-inverse.saveButton", "Save");
			this.validateExistanceButton (test, ".btn-rounded-inverse.cancelButton", "Cancel");
			this.validateExistanceButton (test, ".cgIcon-panelXButton.handCursored", "X close");
		});

		// Validate cancel button
		casper.then (function validateCancelButton () {
			console.log ("Validate cancel button..."); 
			this.clickSelector (".btn-rounded-inverse.cancelButton");
			this.fetchSelectorText(".headerSingleText", 0, function getText (workspaceTitle) {
				var expected_title = "Administration > " + privilege;
				test.assertEquals (workspaceTitle, expected_title,
					"Click the Cancel botton, Return to Administration > " + privilege);
			});
		});

		casper.then(function createBucket () {
			console.log ("Validate creating a bucket..."); 
			this.clickBucketDetail (test);

			this.clickSelector (".btn-rounded-secondary"); // click add button
			this.validateExistanceButton (test, ".btn-rounded-inverse.saveButton", "Save");
			this.validateExistanceButton (test, ".btn-rounded-inverse.cancelButton", "Cancel");
			this.validateExistanceButton (test, ".cgIcon-panelXButton.handCursored", "X close");


			this.validateClickButton (test, "Validating Cancel Button", ".btn-rounded-inverse.cancelButton", ".blueHeader", "Amazon S3 Buckets");

			this.clickSelector (".btn-rounded-secondary"); // click add button
			this.validateClickButton (test, "Validating X close Button", ".cgIcon-panelXButton.handCursored", ".blueHeader", "Amazon S3 Buckets");
			
			// Only Name, Error
			/*
			this.clickSelector (".btn-rounded-secondary"); // click add button
			this.inputByFill ('form.form-horizontal', {'name':myBucket.name});
			this.validateClickButton (test, "Only input name will lead to an error message ...", ".btn-rounded-inverse.saveButton",
									".column-16.formErrorMessage", "Name field(s) are required"); // click save button
			this.validateClickButton (test, "Validating X close Button", ".cgIcon-panelXButton.handCursored", ".blueHeader", "Amazon S3 Buckets");
			*/
			
			// Only Bucket, Error
			/*
			this.inputByFill ('form.form-horizontal', {'name':""});
			this.inputByFill ('form.form-horizontal', {'bucket':myBucket.bucketPath});
			this.validateClickButton (test, "Only input name will lead to an error message ...", ".btn-rounded-inverse.saveButton",
									".column-16.formErrorMessage", "Name field(s) are required"); // click save button
			this.wait (
				100000);
			*/

			// Name + Bucket + Save validate new bucket
			this.validateClickButton (test, "Click Add button", ".btn-rounded-secondary", ".adminGrid>.column-10", "Create New Bucket"); // click add button
			this.inputByFill ('form.form-horizontal', {'name':myBucket.name});
			this.inputByFill ('form.form-horizontal', {'bucket':myBucket.bucketPath});
			this.validateClickButton (test, "Click Save Button", ".btn-rounded-inverse.saveButton", ".blueHeader", "Amazon S3 Buckets");
			
			this.wait (
				NORMALWAITINGTIME,
				function then () {
					this.validateText (test, "Bucket name matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", myBucket.name);
					this.validateText (test, "Bucket address matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(2)>.gridColumnContent", myBucket.bucketPath.replace(/\/.*/, ''));
					this.validateText (test, "Bucket region matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(3)>.gridColumnContent", myBucket.region);
					this.validateText (test, "Bucket path matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(4)>.gridColumnContent", myBucket.bucketPath.replace(/^\S+?\//, ''));		

			}); 


			// Edit the bucket name
			this.validateClickButton (test, "Click edit toggle", 
				".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
				"Edit Bucket"); // click edit toggle button

			this.validateClickButton (test, "Click edit option", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
				".adminGrid>.column-10", 
				"Edit Bucket"); // click add button

			this.inputByFill ('form.form-horizontal', {'name':"newBucketName"});
			this.validateClickButton (test, "Click Save Button", ".btn-rounded-inverse.saveButton", ".blueHeader", "Amazon S3 Buckets");
			this.wait (
				NORMALWAITINGTIME,
				function then () {
					this.validateText (test, "Bucket name matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", "newBucketName");

			}); 
			
			// Edit the bucket address

			// Edit the bucket region

			// Edit the bucket path

			// remove the bucket
			this.validateClickButton (test, "Click edit toggle", 
				".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='remove']", 
				"Remove from Institution"); // click edit toggle button

			this.validateClickButton (test, "Click remove option", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='remove']", 
				".btn-rounded-secondary", 
				"Add"); // click add button
			
			this.wait (
				NORMALWAITINGTIME, 
				function then () {
					this.validateText (test, "Bucket name matching", 
					".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", 
					"00Test");
			});

			//this.wait (1000000);

		});
		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
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