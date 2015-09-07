/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User who has the institution privilege can edit institution
	
	User with institution management privilege
	- log in
	- Admin > Institution
	- Institution Detail > Edit

	validation
	- Edit Institution
		- Check Edit Popup window
		- Exception: Remove Name

	- No new button 
	- Only one record in the list (the user's institution).
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

		console.log(usr.institution)

		casper.start();
		
		casper.then (function setup () {
			casper.admin ('/login.html', usr, privilege);
		});

		//Edit button.
		casper.then(function clickEdit () {
			this.verifyClickDOM (test, "Click Pen button", ".cgIcon-editBtn", "a[data-option=\'edit\']", "Edit Institution"); // click pen button
			this.verifyClickDOM (test, "Click Edit Option", "a[data-option=\'edit\']", S_POPUPTITLE, "Edit Institution"); // click edit option
		
			//validate buttons on the popup
			this.verifyExistanceDOM (test, "Verify existance of Save button", S_SAVEBUTTON);
			this.verifyExistanceDOM (test, "Verify existance of Cancel button", S_CANCELBUTTON);
			this.verifyExistanceDOM (test, "Verify existance of X Close button", S_XCLOSEBUTTON);
			this.verifyClosePopup (test, "Validating Cancel Button", S_CANCELBUTTON, S_POPUPTITLE);

			this.wait (SHORTWAITINGTIME);				
			this.verifyClickDOM (test, "Click Pen button", ".cgIcon-editBtn", "a[data-option=\'edit\']", "Edit Institution"); // click pen button
			this.verifyClickDOM (test, "Click Edit Option", "a[data-option=\'edit\']", S_POPUPTITLE, "Edit Institution"); // click edit option
			this.wait (SHORTWAITINGTIME);
			this.verifyClosePopup (test, "Validating X close Button", S_XCLOSEBUTTON, S_POPUPTITLE);

		});
	
		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
	});
});

