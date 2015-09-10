// Institution.
var DATAOPTION_MAP = {};
DATAOPTION_MAP['Individual'] = 'individual';
DATAOPTION_MAP['Clinical'] = 'clinical-lab';
DATAOPTION_MAP['Research'] = 'research';
DATAOPTION_MAP['Professional Society']='professional-society';
DATAOPTION_MAP['LSDB'] = 'lsdb';
DATAOPTION_MAP['Genomic DB'] = 'genomic-database';

// User
var PRVILEGEVALIDATIONTEXT = {};
PRVILEGEVALIDATIONTEXT['MANAGE_INSTITUTION']="Manage Institution";
PRVILEGEVALIDATIONTEXT['MANAGE_INSTANCE']="Instance Admin";
PRVILEGEVALIDATIONTEXT['MANAGE_USER']="Manage Users";
PRVILEGEVALIDATIONTEXT['MANAGE_GROUP']="Manage Groups";
PRVILEGEVALIDATIONTEXT['MANAGE_FILTER']="Manage Filters";
PRVILEGEVALIDATIONTEXT['MANAGE_TEST']="Manage Tests";
PRVILEGEVALIDATIONTEXT['MANAGE_CASE']="Manage Cases";
PRVILEGEVALIDATIONTEXT['MANAGE_CONTACTS']="Manage Contacts";
PRVILEGEVALIDATIONTEXT['MANAGE_KNOWLEDGE_BASE']="Manage Knowledge Base";
PRVILEGEVALIDATIONTEXT['MANAGE_REPORT_TEMPLATE']="Manage Report Templates";
PRVILEGEVALIDATIONTEXT['MANAGE_IMPORT']="Manage Imports";
PRVILEGEVALIDATIONTEXT['MANAGE_DASHBOARD']="Access Dashboard";

// Admin Menu
var PRVILEGE_MENUITEM = {};
PRVILEGE_MENUITEM['MANAGE_INSTITUTION']="Institution";
PRVILEGE_MENUITEM['MANAGE_USER']="Users";
PRVILEGE_MENUITEM['MANAGE_GROUP']="Groups";
PRVILEGE_MENUITEM['MANAGE_FILTER']="Filters";
PRVILEGE_MENUITEM['MANAGE_TEST']="Tests";
PRVILEGE_MENUITEM['MANAGE_CASE']="Cases";
PRVILEGE_MENUITEM['MANAGE_PROBAND']="Probands";
PRVILEGE_MENUITEM['MANAGE_KNOWLEDGE_BASE']="Knowledge Base";
PRVILEGE_MENUITEM['MANAGE_REPORT_TEMPLATE']="Report Templates";
PRVILEGE_MENUITEM['MANAGE_IMPORT']="Imports";


function institution (name, type, description) {
	this.name = name;

	if (type === undefined) {
		this.type = 'Individual';
	} else {
		this.type = type;
	}

	if (description === undefined) {
		this.description = '';
	} else {
		this.description = description;
	}
}

// Bucket

function bucket (name, bucketPath, region) {
	this.name = name;
	this.bucketPath = bucketPath;

	if (region === undefined) {
		this.region = "US East (Northern Virginia) Region";
	} else {
		this.region = region;
	}
} 


// User
function usr (firstName, lastName, email, password, privilege) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.usrID = email;
	this.pwd = password;
	this.privilege = privilege;
}

// User
function usr (firstName, lastName, email, password, privilege,
			  salutation, nickName, qualification, jobTitle, 
			  organization, institution, publicChoice, 
			  address1, address2, 
			  city, state, zip, country, 
			  phone, fax, Admin, ManageKB, Dashboard) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.password = password;
	this.privilege = privilege;
	this.salutation = salutation;
	this.nickName = nickName;
	this.qualification = qualification;
	this.jobTitle= jobTitle;
	this.organization = organization;
	this.institution = institution;
	this.publicChoice = publicChoice;
	this.address1 = address1;
	this.address2 = address2;
	this.city = city;
	this.state = state;
	this.zip = zip;
	this.country = country;
	this.phone = phone;
	this.fax = fax;
	this.Admin = Admin;
	this.ManageKB= ManageKB;
	this.Dashboard = Dashboard;

	this.displayName = function displayName () {
		return 	this.salutation + " " + this.firstName + " " +
			this.lastName + " (" + this.organization + "), " + this.qualification;
	}
}


// Group
function group (name, description) {
	this.name = name;
	this.description = description;
}


