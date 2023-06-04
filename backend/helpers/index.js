function isNullOrWhiteSpace(str) {
  return (!str || str.length === 0 || /^\s*$/.test(str));
};

module.exports = {
  isNullOrWhiteSpace
}