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
		
		casper.test.begin('Privilege Access Test for user ' + usr.email, function(test) {
	
			var privilege = 'MANAGE_USER';
	
			//console.log(usr.institution)
	
			casper.start();
			
			casper.admin ('/login.html', usr, privilege);
	
			//New button.
			casper.then(function checkNewUserPopupWindow () {
				this.verifyButtonsOnPopUp (test, S_NEWITEMBUTTON, "Create New User");
			});

			casper.logout();
			
			casper.run(function() {			
				slimer.clearHttpAuth(); 
				test.done();});
		});
	
	});
});
