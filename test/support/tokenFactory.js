let userToken;

exports.setToken = (token) => {
  return userToken = token;
};

exports.getToken = () => {
  return userToken;
};