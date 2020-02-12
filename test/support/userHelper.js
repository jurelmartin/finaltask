let userId, UserCredentials, AdminCredentials;

exports.setUserCredentials = (credentials = {}) => {
  return UserCredentials = credentials;
};

exports.getUserCredentials = () => {
  return UserCredentials;
};

exports.setAdminCredentials = (credentials = {}) => {
  return AdminCredentials = credentials;
};

exports.getAdminCredentials = () => {
  return AdminCredentials;
};


exports.setUserId = (id) => {
  return userId = id;
};

exports.getUserId = () => {
  return userId;
};