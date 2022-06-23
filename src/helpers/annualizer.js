var moment = require('moment');
var ordinalizer = require('./ordinalizer');

const YEARS_LOST_TO_COVID = 2;

module.exports = function(first, current) {
    var dtFirst = new Date(first);
    var dtCurrent = new Date(current);
    var years = Number(moment(dtCurrent).diff(dtFirst, 'years')) - YEARS_LOST_TO_COVID;

    return ordinalizer(years + 1);
};