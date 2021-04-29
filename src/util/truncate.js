const truncate = (str) => {
  var len = 66;
  if (str) {
    if (str.length >= 66) {
      return str.substring(0, len) + '...';
    }
    return str;
  }
};

export default truncate;
