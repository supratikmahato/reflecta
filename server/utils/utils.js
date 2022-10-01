const random = require("random");

const randomId = () => {
  return String(random.int(100000000000000, 999999999999999));
};

module.exports = randomId;
