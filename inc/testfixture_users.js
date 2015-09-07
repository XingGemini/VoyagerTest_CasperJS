var USR00ALL = new usr (
	'Dr',		 //salutation
	'XingXu', 	//'firstName':
	'All',		//'lastName':
	'00_TI',	//'nickName':
	'Ph.D',		//'qualification':
	'Test',		//'jobTitle'
	'00_TI',	//'organization'
	'00_TestInstitute', // institution
	'Active',	// status
	'xxu+00all@completegenomics.com', //'usrID':
	'Complete1',	//pwd 
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
	true,		//'Dashboard':
	[	"Institutions", 
		"Users", 
		"Groups", 
		"Samples", 
		"Report Templates", 
		//"Probands", 
		"Tests", 
		"Filters", 
		"Imports" ]
);


var USR00INSTANCE = {'usrID':"xxu+00instance@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':true,
				'Privilege':[	"Institutions", 
								"Users", 
								"Groups", 
								"Samples", 
								"Report Templates", 
								//"Probands", 
								"Tests", 
								"Filters", 
								"Imports"]
				};

var USR00USER = {'usrID':"xxu+00user@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Users"
							]
				};
var USR00INSTITUTION = {'usrID':"xxu+00institute@completegenomics.com",
				'pwd':'Complete1',
				'Institution':'00_TestInstitute',
				'Admin':false,
				'ManageKB':false,
				'Dashboard':false,
				'Privilege':[	"Institutions"
							]
				};

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
*/
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