/**
 * Generates a random string of ASCII characters of codes 32 to 126.
 *
 * The generated string includes alpha-numeric characters and common
 * miscellaneous characters. Use this method when testing general input where
 * the content is not restricted.
 *
 * Do not use this method when special characters are not possible (e.g., in
 * machine or file names that have already been validated); instead, use
 * casper.randomName().
 *
 * @param Number length
 *   Length of random string to generate.
 *
 * @return String
 *   Randomly generated string.
 */
function randomString (length, prefix) {
	console.log ("length " + length);

	length = length || 8;
	prefix = prefix || '';
	var str = '';
	for (i = 0; i < length; i++) {
		str += String.fromCharCode(32 + Math.floor((Math.random() * 95)));
	}
	return prefix+str;
};

/**
 * Generates a random string containing letters and numbers.
 *
 * The string will always start with a letter. The letters may be upper or
 * lower case. This method is better for restricted inputs that do not accept
 * certain characters. For example, when testing input fields that require
 * machine readable values (i.e. without spaces and non-standard characters)
 * this method is best.
 *
 * Do not use this method when testing unvalidated user input. Instead,
 * use casper.randomString().
 *
 * @param Number length
 *   Length of random string to generate.
 *
 * @return String
 *   Randomly generated string.
 */
function randomName(length, prefix) {
	console.log ("Name length " + length);

	length = length || 8;
	prefix = prefix || '';
	var str = String.fromCharCode(97 + Math.floor((Math.random() * 26)));
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (i = 1; i < length; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return prefix+str;
};

function cleanString (string) {
	string = string.replace (/^\s+/, "");
	string = string.replace (/\s+$/, "");

	return string;
};