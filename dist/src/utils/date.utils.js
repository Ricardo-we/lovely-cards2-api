"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBiggerDate = exports.compareTwoDates = void 0;
/***
 * Returns 1 if first date is bigger and -1 if second is bigger;
*/
const compareTwoDates = (date1 = new Date(), date2 = new Date()) => {
    return new Date(date1).getTime() > new Date(date2).getTime() ? 1 : -1;
};
exports.compareTwoDates = compareTwoDates;
/***
 * Returns date1 if first is bigger and date2 if second is bigger;
*/
const getBiggerDate = (date1 = new Date(), date2 = new Date()) => {
    return (0, exports.compareTwoDates)(date1, date2) ? new Date(date1) : new Date(date2);
};
exports.getBiggerDate = getBiggerDate;
