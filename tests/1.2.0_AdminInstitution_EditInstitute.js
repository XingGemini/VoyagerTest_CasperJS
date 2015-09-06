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
		- Edit Name
		- Edit Type 
		- Edit Description
		- Edit Name + Type
		- Edit Type + Description
		- Edit Name + Type + Description

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

		console.log(usr.Institution)

		casper.start();
		
		casper.then (function setup () {
			casper.admin ('/login.html', usr, privilege);
		});

		// Get original institution name;
		var oriInstName = '';
		var selectorInstName = S_DETAILTITLE;
		casper.then(function getOriginalDescription () {
			this.fetchDOMText(selectorInstName, 0, function getText (instName) {
				oriInstName = instName;
			});
		});

		// Get original institution type;
		var oriInstType= '';
		var selectorInstType = S_KEYVALUEPAIR;
		casper.then(function getOriginalDescription () {
			this.fetchDOMText (selectorInstType, 0, function getText(instType) {
				oriInstType = instType;
				oriInstType = oriInstType.replace(/\s+/g, "");
				oriInstType = oriInstType.replace(/Type:/g, "");
			});
		});
		

		// Get original institution description
		var oriInstDescription = '';
		var selectorInstDesciption = S_KEYVALUEPAIR;
		casper.then(function getOriginalDescription () {
			this.fetchDOMText (selectorInstDesciption, 1, function getText(instDescription) {
				oriInstDescription = instDescription;
				oriInstDescription = oriInstDescription.replace(/\s+Description:\s+/g, "");
				oriInstDescription = oriInstDescription.replace(/\s+$/g, "");
			});
		});
		
		//validate edit name
		casper.then(function validateEditName () {
			console.log ("Validate Edit Institution Name..."); 

			casper.editInstitution (test);

			var newName = randomName (8, 'T_');
			this.inputByFill ('form.form-horizontal', {'name':newName});

			this.clickDOM (S_SAVEBUTTON);
			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, newName);

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'name':oriInstName});
			this.clickDOM (S_SAVEBUTTON);
			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, oriInstName);
		});
	

		//validate edit type
		casper.then(function validateEditType () {
			console.log ("Validate Edit Institution Type..."); 

			this.editInstitution(test);
			var newInstType = 'LSDB';
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[newInstType] + "']");
			this.clickDOM (S_SAVEBUTTON);
			this.testInstTypeMatch (test, NORMALWAITINGTIME, selectorInstType, newInstType);

			this.editInstitution(test);
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[oriInstType] + "']");
			this.clickDOM (S_SAVEBUTTON);
			this.testInstTypeMatch (test, NORMALWAITINGTIME, selectorInstType, oriInstType);
		});
		
		
		//validate edit description
		casper.then (function validateEditDescription () {
			console.log ("Validate Edit Institution Description ..."); 
			
			this.editInstitution(test);

			var newInstDescription = 'changed description';

			this.inputByFill ('form.form-horizontal', {'description':newInstDescription});
			this.clickDOM (S_SAVEBUTTON);
			this.testInstDescriptionMatch (test, NORMALWAITINGTIME, selectorInstDesciption, newInstDescription);
		

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'description':oriInstDescription});
			this.clickDOM (S_SAVEBUTTON);
			this.testInstDescriptionMatch (test, NORMALWAITINGTIME, selectorInstDesciption, oriInstDescription);
		});

		
		//validate edit name+type+description
		casper.then(function validateEditNameTypeDescription () {
			console.log ("Validate Edit Institution Name + Type + Description..."); 

			this.editInstitution(test);

			var newName = randomName (8, 'T_');
			var newInstType = 'LSDB';
			var newInstDescription = 'changed description';

			this.inputByFill ('form.form-horizontal', {'name':newName});
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[newInstType] + "']");
			this.inputByFill ('form.form-horizontal', {'description':newInstDescription});
			this.clickDOM (S_SAVEBUTTON);

			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, newName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, newInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, newInstDescription);

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'name':oriInstName});
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[oriInstType] + "']");
			this.inputByFill ('form.form-horizontal', {'description':oriInstDescription});
			this.clickDOM (S_SAVEBUTTON);
			
			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, oriInstName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, oriInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, oriInstDescription);
		});

		//validate edit type+description
		casper.then(function validateEditTypeDescription () {
			console.log ("Validate Edit Institution Type + Description..."); 

			this.editInstitution(test);

			var newInstType = 'LSDB';
			var newInstDescription = 'changed description';

			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[newInstType] + "']");
			this.inputByFill ('form.form-horizontal', {'description':newInstDescription});
			this.clickDOM (S_SAVEBUTTON);

			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, oriInstName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, newInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, newInstDescription);

			this.editInstitution(test);
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[oriInstType] + "']");
			this.inputByFill ('form.form-horizontal', {'description':oriInstDescription});
			this.clickDOM (S_SAVEBUTTON);

			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, oriInstName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, oriInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, oriInstDescription);
		});

		//validate edit name+type
		casper.then(function validateEditNameType() {
			console.log ("Validate Edit Institution Name + Type..."); 

			this.editInstitution(test);

			var newName = randomName (8, 'T_');
			var newInstType = 'LSDB';

			this.inputByFill ('form.form-horizontal', {'name':newName});
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[newInstType] + "']");
			this.clickDOM (S_SAVEBUTTON);

			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, newName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, newInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, oriInstDescription);

			this.editInstitution(test);
			this.inputByFill ('form.form-horizontal', {'name':oriInstName});
			this.clickDOM ("a[data-option='" + DATAOPTION_MAP[oriInstType] + "']");
			this.inputByFill ('form.form-horizontal', {'description':oriInstDescription});
			this.clickDOM (S_SAVEBUTTON);

			this.testInstNameMatch (test, NORMALWAITINGTIME, selectorInstName, oriInstName);
			this.testInstTypeMatch (test, NOWAITINGTIME, selectorInstType, oriInstType);
			this.testInstDescriptionMatch (test, NOWAITINGTIME, selectorInstDesciption, oriInstDescription);
		});

		casper.logout();
		
		casper.run(function() {			
			slimer.clearHttpAuth(); 
			test.done();});
	});
});

casper.testInstNameMatch = function testInstNameMatch (test, waitTime, selectorInstName, nameToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchDOMText(selectorInstName, 0, function getText (instName) {
			test.assertEquals (instName, nameToCheck,
				'Institution name is changed successfully.');
		});
	});
};


casper.testInstTypeMatch = function testInstTypeMatch (test, waitTime, selectorInstType, typeToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchDOMText(selectorInstType, 0, function getText (instType) {
			instType = instType.replace(/\s+/g, "");
			instType = instType.replace(/Type:/g, "");
			test.assertEquals (instType, typeToCheck,
				'Institution Type is changed successfully.');
		});
	});
};


casper.testInstDescriptionMatch = function testInstTypeMatch (test, waitTime, selectorInstDesciption, descriptionToCheck) {
	this.wait(
		waitTime, 
		function then () {
			this.fetchDOMText(selectorInstDesciption, 1, function getText (instDescription) {
			instDescription = instDescription.replace(/\s+Description:\s+/g, "");
			instDescription = instDescription.replace(/\s+$/g, "")
			test.assertEquals (instDescription, descriptionToCheck,
				'Institution Description is changed successfully.');
		});
	});
};

casper.clickBucketDetail = function clickBucketDetail (test) {
	this.clickDOM ("#tabAdminInstitutionBucketDetail");
	this.fetchDOMText(S_BLUEHEADER, 0, function getText (header) {
		test.assertEquals (header, "Amazon S3 Buckets",
				'Reached the Bucket Details Page.');
	});
};
