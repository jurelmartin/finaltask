let userToken, adminToken;

exports.setAdminToken = (token) => {
  return adminToken = token;
};

exports.getAdminToken = () => {
  return adminToken;
};

exports.setUserToken = (token) => {
  return userToken = token;
};

exports.getUserToken = () => {
  return userToken;
};