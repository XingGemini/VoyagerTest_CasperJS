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
			//USR00INSTITUTION,
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
				
				this.verifyButtonsOnPopUp (test, S_ADDBUTTON, "Create New Bucket");
			});
 			
			casper.then (function createButcketExceptionMissingAddress() {
				console.log ("Verify the exception of missing address when creating a new Bucket only with name..."); 

				this.verifyClickDOM (test, "Click Add button", S_ADDBUTTON, S_POPUPTITLE, "Create New Bucket"); // click add button
				this.inputByFill (S_INPUTTABLE, {'name':myBucket.name});
				this.verifyClickDOM (test, "Only input name will lead to an error message ...", S_SAVEBUTTON,
										".column-16.formErrorMessage", "Name field(s) are required"); // click save button
				this.verifyClickDOM (test, "Validating X close Button", S_XCLOSEBUTTON, S_BLUEHEADER, "Amazon S3 Buckets");
			});	

			// Only Bucket, Error
			/*
			this.inputByFill (S_INPUTTABLE, {'name':""});
			this.inputByFill (S_INPUTTABLE, {'bucket':myBucket.bucketPath});
			this.verifyClickDOM (test, "Only input name will lead to an error message ...", S_SAVEBUTTON,
									".column-16.formErrorMessage", "Name field(s) are required"); // click save button
			this.wait (
				100000);
			*/
		});

		casper.then(function editBucket () {
			console.log ("Verify editing a bucket..."); 			

			casper.then(function checkEditBucketPopup () {
				console.log ("Check Edit Bucket Popup ..."); 
				
				this.verifyClickDOM (test, "Click edit toggle", 
					".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					"Edit Bucket"); // click edit toggle button
	
				this.verifyClickDOM (test, "Click edit option", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					S_POPUPTITLE, 
					"Edit Bucket"); // click edit button
	
				this.verifyExistanceDOM (test, "Verify existance of Save button", S_SAVEBUTTON);
				this.verifyExistanceDOM (test, "Verify existance of Cancel button", S_CANCELBUTTON);
				this.verifyExistanceDOM (test, "Verify existance of X Close button", S_XCLOSEBUTTON);
	
	
				this.verifyClosePopup (test, "Validating Cancel Button", S_CANCELBUTTON, S_POPUPTITLE);
	
				this.verifyClickDOM (test, "Click edit toggle", 
					".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					"Edit Bucket"); // click edit toggle button
	
				this.verifyClickDOM (test, "Click edit option", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					S_POPUPTITLE, 
					"Edit Bucket"); // click edit button
	
				this.verifyClosePopup (test, "Validating X close Button", S_XCLOSEBUTTON, S_POPUPTITLE);
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
	this.clickDOM ("#tabAdminInstitutionBucketDetail");
	this.fetchDOMText(S_BLUEHEADER, 0, function getText (header) {
		test.assertEquals (header, "Amazon S3 Buckets",
				'Reached the Bucket Details Page.');
	});
};

