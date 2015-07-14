/*==============================================================================*/
/* Casper generated Thu May 21 2015 11:12:56 GMT-0700 (PDT) 					*/
/*==============================================================================*/
/* 
	User can create institution by 
	- name
	- name, different types 
	- name, type, description

	We validate the name, type, description for newly created institution
*/

var x = require('casper').selectXPath;

casper.init();

var inst_nameonly = new institution (randomName (8, 'T_'));
var inst_nameAndType1 = new institution (randomName (8, 'T_'), 'Clinical');
var inst_nameAndType2 = new institution (randomName (8, 'T_'), 'Research');
var inst_nameAndTypeAndDesc = new institution (randomName (8, 'T_'), 'Research', randomName (255));

var institutions = [
	inst_nameonly,
	inst_nameAndType1,
	inst_nameAndType2,
	inst_nameAndTypeAndDesc
			];

console.log (inst_nameonly.name);
console.log (institutions[0].name);

institutions.forEach(function checkEachUser (inst) {
	casper.test.begin('Create a new institute', function(test) {
		casper.start();

		var usr = USR00INSTANCE;  // using USR00INSTANCE
		var privilege = 'Institutions';

		var typeChoice = '';
		var description = '';

	
		casper.start();
		
		// Admin privilege workspace
		casper.admin ('/login.html', usr, privilege);
	
		// click new button
		casper.clickSelector (".addListItemButton");
		
		// Input institution name
		casper.then(function () {
			this.inputByFill ('form.form-horizontal', {'name':inst.name});
		});
		
		//Input institution type
		casper.then(function () {
			if (inst.type != undefined) {
				this.clickSelector ("a[data-option='" + DATAOPTION_MAP[inst.type] + "']");
			}
		});

		//Input institution description
		casper.then(function () {
			if (inst.description != undefined) {
				console.log (inst.description);
				this.inputByFill ('form.form-horizontal', {'description':inst.description});
			}
		});


		// Save the institution info.
		casper.then (function createInst() {
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				NORMALWAITINGTIME, 
				function then () {
					var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
					this.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
						test.assertEquals (subPanelTitle, inst.name,
						'Newly created Institution shows its details');
					});
	
					if (inst.type != undefined) {
						selector = ".keyValuePair";
						this.fetchSelectorText(selector, 0, function getText (keyValuePair) {
							keyValuePair = keyValuePair.replace(/\s+/g, "");
							test.assertEquals (keyValuePair, "Type:" + inst.type,
								'Institutions type is '+ inst.type + '.');
						});
					} else {
						selector = ".keyValuePair";
						this.fetchSelectorText(selector, 0, function getText (keyValuePair) {
							keyValuePair = keyValuePair.replace(/\s+/g, "");
							test.assertEquals (keyValuePair, 'Type:Individual',
								'Default Institutions type is Individual.');
						});
					}
	
					if (inst.description != undefined) {
						selector = ".keyValuePair";
						this.fetchSelectorText(selector, 1, function getText (keyValuePair) {
							keyValuePair = keyValuePair.replace(/\s+/g, "");
							test.assertEquals (keyValuePair, "Description:" + inst.description,
								'Institutions description matches.');
						});
					}
			});
		});
		
		casper.logout();
		
		casper.run(function() {slimer.clearHttpAuth(); test.done();});

	});
});