// Institution.
var DATAOPTION_MAP = {};
DATAOPTION_MAP['Individual'] = 'individual';
DATAOPTION_MAP['Clinical'] = 'clinical-lab';
DATAOPTION_MAP['Research'] = 'research';
DATAOPTION_MAP['Professional Society']='professional-society';
DATAOPTION_MAP['LSDB'] = 'lsdb';
DATAOPTION_MAP['Genomic DB'] = 'genomic-database';


var PRVILEGE_MAP = {};
PRVILEGE_MAP['MANAGE_INSTITUTION']="Manage Institution";
PRVILEGE_MAP['MANAGE_INSTANCE']="Instance Admin";
PRVILEGE_MAP['MANAGE_USER']="Manage Users";
PRVILEGE_MAP['MANAGE_GROUP']="Manage Groups";
PRVILEGE_MAP['MANAGE_FILTER']="Manage Filters";
PRVILEGE_MAP['MANAGE_TEST']="Manage Tests";
PRVILEGE_MAP['MANAGE_CASE']="Manage Cases";
PRVILEGE_MAP['MANAGE_CONTACTS']="Manage Contacts";
PRVILEGE_MAP['MANAGE_KNOWLEDGE_BASE']="Manage Knowledge Base";
PRVILEGE_MAP['MANAGE_REPORT_TEMPLATE']="Manage Report Templates";
PRVILEGE_MAP['MANAGE_IMPORT']="Manage Imports";
PRVILEGE_MAP['MANAGE_DASHBOARD']="Access Dashboard";


function institution (name) {
	this.name = name;
	this.type = 'Individual';
}

function institution (name, type) {
	this.name = name;
	this.type = type;
}

function institution (name, type, description) {
	this.name = name;
	this.type = type;
	this.description = description;
}

// Bucket

function bucket (name, bucketPath, region) {
	this.name = name;
	this.bucketPath = bucketPath;
	this.region = region;
} 

function bucket (name, bucketPath) {
	this.name = name;
	this.bucketPath = bucketPath;
	this.region = "US East (Northern Virginia) Region";
} 

// User
function usr (firstName, lastName, email, password, privilege) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.password = password;
	this.privilege = privilege;
}

// Group
function group (name, description) {
	this.name = name;
	this.description = description;
}


