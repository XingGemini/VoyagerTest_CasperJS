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
		- Create a bucket with name and address
	- Edit Bucket 
		- Edit bucket name
		- Edit bucket address
		- Edit bucket path
		- Edit bucket region
		- Edit bucket name, address, path, and region
	- Remove a bucket
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
 			
			casper.then (function createButcket_with_NameBucketAddress() {
				console.log ("Verify Create a new Bucket with name and address ..."); 
				
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
			}); 
		});

		casper.then(function editBucket () {
			console.log ("Verify editing a bucket..."); 			

			// Edit the bucket name
			casper.then(function editBucketName () {
				console.log ("Verify editing the name of the bucket ..."); 			
				this.validateClickButton (test, "Click edit toggle", 
					".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					"Edit Bucket"); // click edit toggle button
	
				this.validateClickButton (test, "Click edit option", 
					".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
					".adminGrid>.column-10", 
					"Edit Bucket"); // click edit button
	
				this.inputByFill ('form.form-horizontal', {'name':"newBucketName"});
				this.validateClickButton (test, "Click Save Button", ".btn-rounded-inverse.saveButton", ".blueHeader", "Amazon S3 Buckets");
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.validateText (test, "Bucket name matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", "newBucketName");
	
				}); 
			});
			// Edit the bucket address

			// Edit the bucket region

			// Edit the bucket path
		});

		casper.then(function removeBucket () {
			console.log ("Validate removing a bucket..."); 			
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

