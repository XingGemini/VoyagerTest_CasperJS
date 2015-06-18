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

var inst_nameonly = new institution (casper.randomName (8, 'T_'));
var inst_nameAndType1 = new institution (casper.randomName (8, 'T_'), 'Clinical', 'clinical-lab');
var inst_nameAndType2 = new institution (casper.randomName (8, 'T_'), 'Research', 'research');
var inst_nameAndTypeAndDesc = new institution (casper.randomName (8, 'T_'), 'Research', 'research', casper.randomName (255));

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
			//console.log ("input ");
			this.inputByFill ('form.form-horizontal', {'name':inst.name});
		});
		
		//Input institution type
		casper.then(function () {
			//utils.dump (inst);

			if (inst.type != undefined) {
				console.log (inst.type_dataOption);
				casper.clickSelector ("a[data-option='" + inst.type_dataOption + "']");
			}
		});

		//Input institution description
		casper.then(function () {
			//utils.dump (inst);
			//console.log ("desc" + inst.description);

			if (inst.description != undefined) {
				console.log (inst.description);
				casper.inputByFill ('form.form-horizontal', {'description':inst.description});
				//casper.inputToSelector ('#description', inst.description);
			}
		});


		// Save the institution info.
		casper.then (function createInst() {
			//console.log ("clicksave");
			this.clickSelector (".btn-rounded-inverse.saveButton");
			this.wait(
				5000, 
				function then () {
					var selector = "#detailView > .detailHeading > .detailTitle > .detailTitleText";
					casper.fetchSelectorText(selector, 0, function getText (subPanelTitle) {
					test.assertEquals (subPanelTitle, inst.name,
					'Newly created Institution shows its details');
				});
	
				if (inst.type != undefined) {
					selector = ".keyValuePair";
					casper.fetchSelectorText(selector, 0, function getText (keyValuePair) {
						keyValuePair = keyValuePair.replace(/\s+/g, "");
						test.assertEquals (keyValuePair, "Type:" + inst.type,
							'Institutions type is '+ inst.type + '.');
					});
				} else {
					selector = ".keyValuePair";
					casper.fetchSelectorText(selector, 0, function getText (keyValuePair) {
						keyValuePair = keyValuePair.replace(/\s+/g, "");
						test.assertEquals (keyValuePair, 'Type:Individual',
							'Default Institutions type is Individual.');
					});
				}

				if (inst.description != undefined) {
					selector = ".keyValuePair";
					casper.fetchSelectorText(selector, 1, function getText (keyValuePair) {
						keyValuePair = keyValuePair.replace(/\s+/g, "");
						test.assertEquals (keyValuePair, "Description:" + inst.description,
							'Institutions description matches.');
					});
				}
			});
		});

		casper.run(function() {slimer.clearHttpAuth(); test.done();});

	});
});