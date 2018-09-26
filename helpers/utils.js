/**
 * Helper for constructing a response
 * @param status
 * @param data
 * @returns {{status: *, data: *}}
 */
module.exports.response = (status, data) => ({
  status,
  data
});