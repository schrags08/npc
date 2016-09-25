var moment = require('moment');
var ordinalizer = require('./ordinalizer');

module.exports = function(first, current) {
    var dtFirst = new Date(first),
        dtCurrent = new Date(current),
        years = Number(moment(dtCurrent).diff(dtFirst, 'years'));

    return ordinalizer(years + 1);
};