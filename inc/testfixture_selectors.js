//Pop up window buttons
var S_SAVEBUTTON = ".btn-rounded-inverse.saveButton";
var S_CANCELBUTTON = ".btn-rounded-inverse.cancelButton";
var S_XCLOSEBUTTON = ".cgIcon-panelXButton.handCursored";

//Tile of Pop up window
var S_POPUPTITLE = ".adminGrid>.column-10";

// Add button on Details Tab
var S_ADDBUTTON = ".btn-rounded-secondary";

// Detail Title
var S_DETAILTITLE = ".detailTitleText";

// Blueheader  in Admin > Institute > Amazon Detail Tab
var S_BLUEHEADER = ".blueHeader";

// keyValuePair
var S_KEYVALUEPAIR = ".keyValuePair";

// New button above the xxxx list
var S_NEWITEMBUTTON = ".addListItemButton";

// Input Table
var S_INPUTTABLE = 'form.form-horizontal';

// section selector: 1.2.1.0_AdminUser_CreatNewUser
function ToggleSectionSelector (index) {
	return ".column-16.toggleable:nth-child("+index+")";
}

// the toggle button on section: 1.2.1.0_AdminUser_CreatNewUser
function ToggleButtonOnSection (index) {
	return ToggleSectionSelector(index) + ">.sectionToggle>button";
}

// input form on section: 1.2.1.0_AdminUser_CreatNewUser
function InputFormOnSection (index) {
	return ToggleSectionSelector(index) + ">" + S_INPUTTABLE;
}

// Key Value Pair + dt Selector 
// ".groupAdminDetailDetails>dl>dd:nth-child(2)>.keyValuePair>dt

function S_KEYVALUE_DT (sectionIdx) {
	return ".groupAdminDetailDetails>dl>dd:nth-child("+sectionIdx+")>.keyValuePair>dt";
}

// Key Value Pair + dd Selector 
// ".groupAdminDetailDetails>dl>dd:nth-child(2)>.keyValuePair>dd

function S_KEYVALUE_DD (sectionIdx) {
	return ".groupAdminDetailDetails>dl>dd:nth-child("+sectionIdx+")>.keyValuePair>dd";
}

// Creator Selector 
// .groupAdminDetailDetails>dl>dd:nth-child(4)>dl>dd:nth-child(2)>.contactDisplay

function S_Creator (sectionIdx) {
	return ".groupAdminDetailDetails>dl>dd:nth-child("+sectionIdx+")>dl>dd:nth-child(2)>.contactDisplay";
}

// Creator Selector 
// .groupAdminDetailDetails>dl>dd:nth-child(4)>dl>dd:nth-child(2)>.contactDisplay

function S_Updator (sectionIdx) {
	return ".groupAdminDetailDetails>dl>dd:nth-child("+sectionIdx+")>dl>dd:nth-child(4)>.contactDisplay";
}
