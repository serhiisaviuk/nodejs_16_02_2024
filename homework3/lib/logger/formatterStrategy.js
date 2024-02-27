import * as constants from './constants.js';
import config from './config.js';
import defaultFormater from './formatters/default.js';
import jsonFormater from './formatters/json.js';
import csvFormater from './formatters/csv.js';

const formatters = {
  [constants.formatter.DEFAULT]: defaultFormater,
  [constants.formatter.JSON]: jsonFormater,
  [constants.formatter.CSV]: csvFormater,
  [undefined]: defaultFormater,
};
function getFormatter() {
  return formatters[config.formater];
}

export { getFormatter };
