/**
 * @file functions.js file contains globally usable functions
 */

/**
 * Converts playtime from minutes to hours
 * @param {number} minutes - Minutes
 * @returns {number} - Hours
 */
let playTimeToHours = (minutes) => {
  return (minutes / 60).toFixed(1);
}

/**
 * Tries to parse JSON and returns object or false depending on the outcome
 * @param {string} jsonString - JSON to parse
 * @returns {boolean | object} - Parse result 
 */
let tryParseJSON = (jsonString) => {
  try {
    let o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }

  return false;
}