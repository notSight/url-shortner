const sessionIdToUserMap = new Map();

function setUser(Id, user) {
  sessionIdToUserMap.set(Id, user);
}

function getUser(Id) {
  return sessionIdToUserMap.get(Id);
}

module.exports = {
  setUser,
  getUser
};