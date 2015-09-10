var USR00ALL = new usr (
	'XingXu', 	//'firstName':
	'All',		//'lastName':
	'xxu+00all@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
	[	"MANAGE_INSTITUTION", 
		"MANAGE_USER", 
		"MANAGE_GROUP", 
		"MANAGE_SAMPLES", 
		"MANAGE_REPORT_TEMPLATE", 
		"MANAGE_PROBANDS", 
		"MANAGE_TEST", 
		"MANAGE_FILTER", 
		"MANAGE_IMPORT" ],
	'Dr',		 //salutation
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'address1',		//address1
	'address2',		//address2
	'Palo Alto',	//city
	'CA',			//state
	'94306',			//zip
	'United States',//country
	'6501234567',	//Phone
	'6501234560',	//fax
	false,		//'Admin':
	true,		//'ManageKB':
	true		//'Dashboard':
);


var USR00INSTANCE = new usr (
	'XingXu', 	//'firstName':
	'Instance',		//'lastName':
	'xxu+00instance@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
	[	"MANAGE_INSTITUTION", 
		"MANAGE_USER", 
		"MANAGE_GROUP", 
		"MANAGE_SAMPLES", 
		"MANAGE_REPORT_TEMPLATE", 
		"MANAGE_PROBANDS", 
		"MANAGE_TEST", 
		"MANAGE_FILTER", 
		"MANAGE_IMPORT" ],
	'Dr',		 //salutation
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'address1',		//address1
	'address2',		//address2
	'Palo Alto',	//city
	'CA',			//state
	'94306',			//zip
	'United States',//country
	'6501234567',	//Phone
	'6501234560',	//fax
	true,		//'Admin':
	true,		//'ManageKB':
	true		//'Dashboard':
);

var USR00USER = new usr (
	'XingXu', 	//'firstName':
	'User',		//'lastName':
	'xxu+00user@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
	[	"MANAGE_USER" ],
	'Dr',		 //salutation
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'address1',		//address1
	'address2',		//address2
	'Palo Alto',	//city
	'CA',			//state
	'94306',			//zip
	'United States',//country
	'6501234567',	//Phone
	'6501234560',	//fax
	false,		//'Admin':
	false,		//'ManageKB':
	false		//'Dashboard':
);

var USR00INSTITUTION = new usr (
	'XingXu', 	//'firstName':
	'Institution',		//'lastName':
	'xxu+00institute@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
	[	"MANAGE_INSTITUTION" ],
	'Dr',		 //salutation
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'address1',		//address1
	'address2',		//address2
	'Palo Alto',	//city
	'CA',			//state
	'94306',			//zip
	'United States',//country
	'6501234567',	//Phone
	'6501234560',	//fax
	false,		//'Admin':
	false,		//'ManageKB':
	false		//'Dashboard':
);


var USR00GROUP = new usr (
	'XingXu', 	//'firstName':
	'User',		//'lastName':
	'xxu+00group@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
	[	"MANAGE_GROUP" ],
	'Dr',		 //salutation
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'address1',		//address1
	'address2',		//address2
	'Palo Alto',	//city
	'CA',			//state
	'94306',			//zip
	'United States',//country
	'6501234567',	//Phone
	'6501234560',	//fax
	false,		//'Admin':
	false,		//'ManageKB':
	false		//'Dashboard':
);
/*
var USR00GROUP = {'usrID':"xxu+00group@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Groups"
							]
				};

var USR00FILTER = {'usrID':"xxu+00filter@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Filters"
							]
				};
/*
var USR00SAMPLE = {'usrID':"xxu+00sample@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Samples"
							]
				};

var USR00IMPORT = {'usrID':"xxu+00import@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Imports"
							]
				};

var USR00REPORT = {'usrID':"xxu+00report@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Report Templates"
							]
				};

var USR00TEST = {'usrID':"xxu+00test@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Tests"
							]
				};
var USR00CASE = {'usrID':"xxu+00case@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[]
				};				
*/
