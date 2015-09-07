/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User has the group management privilege can create a group	
	User with group management privilege
	- log in
	- Admin > Groups

	Verification
	- Create a new group


*/

var x = require('casper').selectXPath;

casper.init();

var usrs = [USR00ALL, 
			//USR00INSTITUTION,
			//USR00INSTANCE,
			//USR00GROUP,
			];

var myGroup = new group (randomName(8, "TG_"), "Description");

var newGroups = [
	myGroup,
];

usrs.forEach(function checkEachUser (usr){ // user to create group

	newGroups.forEach(function checkEachNewGroup (newGroup){
		
		casper.test.begin('Admin Group Test for user ' + usr.usrID, function(test) {
	
			var privilege = 'Groups';
	
			console.log(usr.Institution);
	
			casper.start();
			
			casper.admin ('/login.html', usr, privilege);
	
			casper.then(function createGroup () {
				// create a user
				this.verifyClickDOM (test, "Click the new button ...", S_NEWITEMBUTTON, S_POPUPTITLE, "Create New Group");
	
				this.inputByFill (S_INPUTTABLE, {'name':newGroup.name});
				this.inputByFill (S_INPUTTABLE, {'description':newGroup.description});
				this.verifyClosePopup (test, "Click the save button ...", S_SAVEBUTTON, S_POPUPTITLE);
				this.wait (
					NORMALWAITINGTIME,
					function then () {
						this.verifyText (test, "Group name matching", S_DETAILTITLE, newGroup.name);
				});
			});
			casper.logout();
			
			casper.run(function() {			
				slimer.clearHttpAuth(); 
				test.done();});
		});
	
	});
});

