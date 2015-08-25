// Institution.
var DATAOPTION_MAP = {}
DATAOPTION_MAP['Individual'] = 'individual';
DATAOPTION_MAP['Clinical'] = 'clinical-lab';
DATAOPTION_MAP['Research'] = 'research';
DATAOPTION_MAP['Professional Society']='professional-society';
DATAOPTION_MAP['LSDB'] = 'lsdb';
DATAOPTION_MAP['Genomic DB'] = 'genomic-database';

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
