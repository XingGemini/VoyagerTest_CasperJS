function institution (name) {
	this.name = name;
	this.type = 'Individual';
}

function institution (name, type, type_dataOption) {
	this.name = name;
	this.type = type;
	this.type_dataOption = type_dataOption;
}

function institution (name, type, type_dataOption, description) {
	this.name = name;
	this.type = type;
	this.type_dataOption = type_dataOption;
	this.description = description;
}