let userId, UserCredentials;

exports.setUserCredentials = (credentials = {}) => {
  return UserCredentials = credentials;
};

exports.getUserCredentials = () => {
  return UserCredentials;
};

exports.setUserId = (id) => {
  return userId = id;
};

exports.getUserId = () => {
  return userId;
};