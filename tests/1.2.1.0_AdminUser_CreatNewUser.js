/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User has the user management privilege can create a user	
	User with user management privilege
	- log in
	- Admin > Users

	Verification
	- 

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
	
			casper.then(function createUserActiveFixedPassoword () {
				// create a user
				this.verifyClickDOM (test, "Click the new button ...", S_NEWITEMBUTTON, S_POPUPTITLE, "Create New User");
	
				this.inputByFill (InputFormOnSection(1), {'person.firstName':newUsr.firstName});
				this.inputByFill (InputFormOnSection(1), {'person.lastName':newUsr.lastName});
	
				this.verifyClickDOM (test, "Expand contact information section ...", ToggleButtonOnSection(2), "label[for='email']", "Email *");
	
				this.inputByFill (InputFormOnSection(2), {'person.email':newUsr.email});
	
				this.verifyClickDOM (test, "Expand contact information section ...", ToggleButtonOnSection(3), ".checkList>li>.checkbox>label", "Instance Admin");
	
	
				newUsr.privilege.forEach (function checkbox (privilege) {
					casper.then ( function checkPrivileges() {
						this.verifyClickDOM (test, "check the Privilege ...", "input[data-access-privilege=\""+privilege+"\"\]", ".checkList>li>.checkbox>label", "Instance Admin");
					});
				});
	
				this.verifyClickDOM (test, "Expand password information section ...", ToggleButtonOnSection(4), "label[for='password']", "Password");
				this.inputByFill (InputFormOnSection(4), {'password':newUsr.password});
				this.inputByFill (InputFormOnSection(4), {'confirmPassword':newUsr.password});
	
				this.verifyClosePopup (test, "Click the save button ...", S_SAVEBUTTON, S_POPUPTITLE);
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.verifyText (test, "Name matching", S_DETAILTITLE, newUsr.firstName + " " + newUsr.lastName);
						//verify email
						//verify privilege
				});
			});
			casper.logout();
			
			casper.run(function() {			
				slimer.clearHttpAuth(); 
				test.done();});
		});
	
	});
});


