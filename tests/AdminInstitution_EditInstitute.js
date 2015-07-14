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

		//Edit button.
		casper.then(function clickEdit () {
			this.editInstitution(test);
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

		// Get original institution name;
		var oriInstName = '';
		var selectorInstName = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
		casper.then(function getOriginalDescription () {
			this.fetchSelectorText(selectorInstName, 0, function getText (instName) {
				oriInstName = instName;
			});
		});

		// Get original institution type;
		var oriInstType= '';
		var selectorInstType = ".keyValuePair";
		casper.then(function getOriginalDescription () {
			this.fetchSelectorTextSimple (selectorInstType, 0, function getText(instType) {
				oriInstType = instType;
				oriInstType = oriInstType.replace(/\s+/g, "");
				oriInstType = oriInstType.replace(/Type:/g, "");
			});
		});
		

		// Get original institution description
		var oriInstDescription = '';
		var selectorInstDesciption = ".keyValuePair";
		casper.then(function getOriginalDescription () {
			this.fetchSelectorTextSimple(selectorInstDesciption, 1, function getText(instDescription) {
				oriInstDescription = instDescription;
				oriInstDescription = oriInstDescription.replace(/\s+Description:\s+/g, "");
				oriInstDescription = oriInstDescription.replace(/\s+$/g, "");
			});
		});
		
		//validate edit name
		casper.then(function validateEditName () {
			console.log ("Validate Edit Institution Name..."); 

			this.editInstitution(test);

			var newName = randomName (8, 'T_');
			this.inputByFill ('form.form-horizontal', {'name':newName});

			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstName, 0, function getText (instName) {
					test.assertEquals (instName, newName,
						'Institution name is changed successfully.');
				});
			});

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'name':oriInstName});
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstName, 0, function getText (instName) {
					test.assertEquals (instName, oriInstName,
						'Institution name is changed successfully.');
				});
			});
		});
	

		//validate edit type
		casper.then(function validateEditType () {
			console.log ("Validate Edit Institution Type..."); 

			this.editInstitution(test);
			var newInstType = 'LSDB';
			this.clickSelector ("a[data-option='" + DATAOPTION_MAP[newInstType] + "']");
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstType, 0, function getText (instType) {
					instType = instType.replace(/\s+/g, "");
					instType = instType.replace(/Type:/g, "");
					test.assertEquals (instType, newInstType,
					'Institution Type is changed successfully.');
				});
			});

			this.editInstitution(test);
			this.clickSelector ("a[data-option='" + DATAOPTION_MAP[oriInstType] + "']");
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstType, 0, function getText (instType) {
					instType = instType.replace(/\s+/g, "");
					instType = instType.replace(/Type:/g, "");
					test.assertEquals (instType, oriInstType,
					'Institution Type is changed successfully.');
				});
			});

		});

		//validate edit description

		casper.then (function validateEditDescription () {
			console.log("ori descript" + oriInstDescription);
			
			this.editInstitution(test);

			var newInstDescription = 'changed description';

			this.inputByFill ('form.form-horizontal', {'description':newInstDescription});

			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstDesciption, 1, function getText (instDescription) {
					instDescription = instDescription.replace(/\s+Description:\s+/g, "");
					instDescription = instDescription.replace(/\s+$/g, "");

					test.assertEquals (instDescription, newInstDescription,
						'Institution Description is changed successfully.');
					});
				});

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'description':oriInstDescription});
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					this.fetchSelectorText(selectorInstDesciption, 1, function getText (instDescription) {
					instDescription = instDescription.replace(/\s+Description:\s+/g, "");
					instDescription = instDescription.replace(/\s+$/g, "");

					test.assertEquals (instDescription, oriInstDescription,
						'Institution Description is changed successfully.');
				});
			});
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
	return this;
};
