const cron = require('node-cron');
const updateInfo = require('../helpers/update-database')

// cron job to run once every o'clock hour
module.exports = () => cron.schedule("0 0 * * *", updateInfo, {
  timezone: "Australia/Melbourne"
});