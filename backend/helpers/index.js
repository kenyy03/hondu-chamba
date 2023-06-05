function isNullOrWhiteSpace(str) {
  return (!str || str.length === 0 || /^\s*$/.test(str));
};

function isFullObject(obj){
  return Object.keys(obj).length > 0;
}

module.exports = {
  isNullOrWhiteSpace,
  isFullObject
}