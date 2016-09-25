var moment = require('moment');

module.exports = function(dt, format) {
    var dateTime = new Date(dt);
    return moment(dateTime).format(format || {});
};