/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	Test user's privilege matches the admin menu display
	- log in
	- Admin menu check 
	- log out
*/

var x = require('casper').selectXPath;

casper.init();


var usrs = [//USR00ALL, 
			//USR00INSTITUTION,
			USR00INSTANCE,
			//USR00SAMPLE,
			];

usrs.forEach(function checkEachUser (usr){

	casper.test.begin('Privilege Access Test for user ' + usr.usrID, function(test) {

		var privilege = 'Institutions';

		console.log(usr.Institution)

		casper.start();
		
		casper.admin ('/login.html', usr, privilege);

		casper.then (function searchInstitution  () {
			//var searchTerm = {'searchField' : "01_TestInstitute"};
			//this.inputByFillSelectors ("form.searchForm", {'input[\'id\']=\"searchField\"':"01_TestInstitute"}, true);
			this.inputToSelector ("#searchField", usr.Institution);
		});

		//Edit button.
		casper.then(function clickEdit () {
			casper.editInstitution(test);
		});

		//validate buttons on the popup
		casper.waitForSelector (".btn-rounded-inverse.saveButton",
			function success() {
				test.assertExists (".btn-rounded-inverse.saveButton", "Save button prensents");
				test.assertExists (".btn-rounded-inverse.cancelButton", "Cancel button prensents");
				test.assertExists (".cgIcon-panelXButton.handCursored", "X close button prensents");
			}, 
			function fail() {
				test.assertExists (".btn-rounded-inverse.saveButton", "Save button DOES NOT prensents");
			}
		);

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

		//validate edit name
		casper.then(function validateEditName () {
			console.log ("Validate Edit Institution Name..."); 
			var oriName = '';
			var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
			this.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
				oriName = subPanelTitle;
				casper.editInstitution(test);

				var newName = casper.randomName (8, 'T_');
				casper.inputByFill ('form.form-horizontal', {'name':newName});
				//console.log ("clicksave");
				casper.clickSelector (".btn-rounded-inverse.saveButton");
				casper.wait(
					5000, 
					function then () {
						//var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
						this.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
						test.assertEquals (subPanelTitle, newName,
						'Institution name is changed successfully.');
					});
				});

				casper.editInstitution(test);

				casper.inputByFill ('form.form-horizontal', {'name':oriName});

				casper.clickSelector (".btn-rounded-inverse.saveButton");
				casper.wait(
					5000, 
					function then () {
						//var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
						casper.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
						test.assertEquals (subPanelTitle, oriName,
						'Institution name is changed successfully.');
					});
				});
			});
			
			console.log ("oriName" + oriName);
			//utils.dump (this);
			/*var nameValue = this.getElementAttribute ("#name", 'value');
			var element = this.getElementsInfo("#name");
			utils.dump (element);
			
			test.assertEquals (nameValue, oriName, 'Name field shows pre-exisiting institution name.');
			console.log ("nameValue" + nameValue);
			*/

		});


		//validate edit type

		//validate edit name+type

		//validate edit name+type+description

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
};
