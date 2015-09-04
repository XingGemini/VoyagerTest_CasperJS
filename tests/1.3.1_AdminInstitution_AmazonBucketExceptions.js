/*==============================================================================*/
/* Casper generated Thu Sep 03 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User has the instance privilege can edit institution
	
	User with institution management privilege
	- USR00ALL
	- USR00INSTITUTION
	- USR00INSTANCE

	Set up
	- log in
	- Admin > Institution
	- Amazon Bucket Details

	Validation
	- Create a bucket 
		- Check Create a Bucket popup window
		- Exception: Create a bucket with bucket name only
		- Exception: Create a bucket with ONLY bucket address
	- Edit Bucket 
		- Check Edit Bucket popup window
		- Exception: Remove the name
		- Exception: Remove the path
*/

var x = require('casper').selectXPath;

casper.init();

var myBucket = new bucket ("Test", "voyager.us-east-1.completegenomics.com/sample");

var usrs = [USR00ALL, 
			USR00INSTITUTION,
			USR00INSTANCE,
			//USR00SAMPLE,
			];

usrs.forEach(function checkEachUser (usr){

	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		var privilege = 'Institutions';

		console.log(usr.Institution)

		casper.start();
		
		casper.then(function setup () {
			console.log ("Log in, Admin > Institution, Bucket Details ..."); 

			this.admin ('/login.html', usr, privilege);
			this.clickBucketDetail (test);
		});
		
		casper.then(function createBucket () {
			console.log ("Validate creating a bucket...");

			casper.then(function checkCreateBucketPopup () {
				console.log ("Check Create New Bucket Popup ..."); 
				
				this.validateClickButton (test, "Click Add button", ".btn-rounded-secondary", ".adminGrid>.column-10", "Create New Bucket"); // click add button
				this.validateExistanceButton (test, ".btn-rounded-inverse.saveButton", "Save");
				this.validateExistanceButton (test, ".btn-rounded-inverse.cancelButton", "Cancel");
				this.validateExistanceButton (test, ".cgIcon-panelXButton.handCursored", "X close");
				this.validateClickButton (test, "Validating Cancel Button", ".btn-rounded-inverse.cancelButton", ".blueHeader", "Amazon S3 Buckets");
	
				this.wait (SHORTWAITINGTIME);
				this.validateClickButton (test, "Click Add button", ".btn-rounded-secondary", ".adminGrid>.column-10", "Create New Bucket"); // click add button
				this.wait (SHORTWAITINGTIME);
				this.validateClickButton (test, "Validating X close Button", ".cgIcon-panelXButton.handCursored", ".blueHeader", "Amazon S3 Buckets");
			});
 			
			casper.then (function createButcketExceptionMissingAddress() {
				console.log ("Verify the exception of missing address when creating a new Bucket only with name..."); 

				this.validateClickButton (test, "Click Add button", ".btn-rounded-secondary", ".adminGrid>.column-10", "Create New Bucket"); // click add button
				this.inputByFill ('form.form-horizontal', {'name':myBucket.name});
				this.validateClickButton (test, "Only input name will lead to an error message ...", ".btn-rounded-inverse.saveButton",
										".column-16.formErrorMessage", "Name field(s) are required"); // click save button
				this.validateClickButton (test, "Validating X close Button", ".cgIcon-panelXButton.handCursored", ".blueHeader", "Amazon S3 Buckets");
			});	

			// Only Bucket, Error
			/*
			this.inputByFill ('form.form-horizontal', {'name':""});
			this.inputByFill ('form.form-horizontal', {'bucket':myBucket.bucketPath});
			this.validateClickButton (test, "Only input name will lead to an error message ...", ".btn-rounded-inverse.saveButton",
									".column-16.formErrorMessage", "Name field(s) are required"); // click save button
			this.wait (
				100000);
			*/
		});

		casper.then(function editBucket () {
			console.log ("Verify editing a bucket..."); 			

			casper.then(function checkEditBucketPopup () {
				console.log ("Check Edit Bucket Popup ..."); 
				
				this.validateClickButton (test, "Click edit toggle", 
					".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					"Edit Bucket"); // click edit toggle button
	
				this.validateClickButton (test, "Click edit option", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					".adminGrid>.column-10", 
					"Edit Bucket"); // click edit button
	
				this.validateExistanceButton (test, ".btn-rounded-inverse.saveButton", "Save");
				this.validateExistanceButton (test, ".btn-rounded-inverse.cancelButton", "Cancel");
				this.validateExistanceButton (test, ".cgIcon-panelXButton.handCursored", "X close");
	
	
				this.validateClickButton (test, "Validating Cancel Button", ".btn-rounded-inverse.cancelButton", ".blueHeader", "Amazon S3 Buckets");
	
				this.validateClickButton (test, "Click edit toggle", 
					".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					"Edit Bucket"); // click edit toggle button
	
				this.validateClickButton (test, "Click edit option", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					".adminGrid>.column-10", 
					"Edit Bucket"); // click edit button
	
				this.validateClickButton (test, "Validating X close Button", ".cgIcon-panelXButton.handCursored", ".blueHeader", "Amazon S3 Buckets");
			});

			// Exception of removing Buck Name, then Save
			// Exception of removing Buck Address, then Save
		});

		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
	});
});

casper.clickBucketDetail = function clickBucketDetail (test) {
	this.clickSelector ("#tabAdminInstitutionBucketDetail");
	this.fetchSelectorText(".blueHeader", 0, function getText (header) {
		test.assertEquals (header, "Amazon S3 Buckets",
				'Reached the Bucket Details Page.');
	});
};

