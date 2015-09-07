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
var newBucketName = 'newBucketName';
var usrs = [USR00ALL, 
			//USR00INSTITUTION,
			//USR00INSTANCE,
			//USR00SAMPLE,
			];

usrs.forEach(function checkEachUser (usr){

	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		var privilege = 'Institutions';

		console.log(usr.institution)

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
				
				this.verifyClickDOM (test, "Click Add button", S_ADDBUTTON, S_POPUPTITLE, "Create New Bucket"); // click add button
				this.inputByFill (S_INPUTTABLE, {'name':myBucket.name});
				this.inputByFill (S_INPUTTABLE, {'bucket':myBucket.bucketPath});
				this.verifyClosePopup (test, "Click Save Button", S_SAVEBUTTON, S_POPUPTITLE);
			
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.fetchDOMText(".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", 0, function getText (name) {
							name = cleanString (name);

							if (name == myBucket.name) {
								casper.verifyText (test, "Bucket name matching element1", ".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", myBucket.name);
								casper.verifyText (test, "Bucket address matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(2)>.gridColumnContent", myBucket.bucketPath.replace(/\/.*/, ''));
								casper.verifyText (test, "Bucket region matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(3)>.gridColumnContent", myBucket.region);
								casper.verifyText (test, "Bucket path matching", ".gridRow:nth-child(1)>.gridColumn:nth-child(4)>.gridColumnContent", myBucket.bucketPath.replace(/^\S+?\//, ''));		
							} else {
								casper.verifyText (test, "Bucket name matching element2", ".gridRow:nth-child(2)>.gridColumn:nth-child(1)>.gridColumnContent", myBucket.name);
								casper.verifyText (test, "Bucket address matching", ".gridRow:nth-child(2)>.gridColumn:nth-child(2)>.gridColumnContent", myBucket.bucketPath.replace(/\/.*/, ''));
								casper.verifyText (test, "Bucket region matching", ".gridRow:nth-child(2)>.gridColumn:nth-child(3)>.gridColumnContent", myBucket.region);
								casper.verifyText (test, "Bucket path matching", ".gridRow:nth-child(2)>.gridColumn:nth-child(4)>.gridColumnContent", myBucket.bucketPath.replace(/^\S+?\//, ''));		
							}
						});
				});
			}); 
		});

		casper.then(function editBucket () {
			console.log ("Verify editing a bucket..."); 			

			// Edit the bucket name
			casper.then(function editBucketName () {
				console.log ("Verify editing the name of the bucket ..."); 			
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.fetchDOMText(".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", 0, function getText (name) {
							name = cleanString (name);
							if (name == myBucket.name) {
								casper.verifyClickDOM (test, "Click edit toggle element1", 
													".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
													".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
													"Edit Bucket"); // click edit toggle button
								casper.verifyClickDOM (test, "Click edit option", 
													".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='edit']", 
													S_POPUPTITLE, 
													"Edit Bucket"); // click edit button
							} else {
								casper.verifyClickDOM (test, "Click edit toggle element2", 
													".gridRow:nth-child(2)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
													".gridRow:nth-child(2)>.rowEdit>.editOptions>li>a[data-option='edit']", 
													"Edit Bucket"); // click edit toggle button
								casper.verifyClickDOM (test, "Click edit option", 
													".gridRow:nth-child(2)>.rowEdit>.editOptions>li>a[data-option='edit']", 
													S_POPUPTITLE, 
													"Edit Bucket"); // click edit button
							}
						});
				}); 				


	
				this.inputByFill (S_INPUTTABLE, {'name':newBucketName});
				this.verifyClosePopup (test, "Click Save Button", S_SAVEBUTTON, S_POPUPTITLE);
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.fetchDOMText(".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", 0, function getText (name) {
							name = cleanString (name);
							if (name == newBucketName) {
								casper.verifyText (test, "Bucket name matching1", ".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", newBucketName);
							} else {
								casper.verifyText (test, "Bucket name matching2", ".gridRow:nth-child(2)>.gridColumn:nth-child(1)>.gridColumnContent", newBucketName);
							}
						});
				}); 
			});
			// Edit the bucket address

			// Edit the bucket region

			// Edit the bucket path
		});

		casper.then(function removeBucket () {
			console.log ("Validate removing a bucket..."); 			

			// remove the bucket
			this.verifyClickDOM (test, "Click edit toggle", 
				".gridRow:nth-child(1)>.rowEdit>.dropdown-toggle>.cgIcon-editBtn", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='remove']", 
				"Remove from Institution"); // click edit toggle button

			this.verifyClickDOM (test, "Click remove option", 
				".gridRow:nth-child(1)>.rowEdit>.editOptions>li>a[data-option='remove']", 
				S_ADDBUTTON, 
				"Add"); // click add button
			
			this.wait (
				NORMALWAITINGTIME, 
				function then () {
					this.verifyText (test, "Verify the original bucket", 
					".gridRow:nth-child(1)>.gridColumn:nth-child(1)>.gridColumnContent", "00Test");
			});
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

